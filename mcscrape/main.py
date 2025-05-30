import re
import requests
from bs4 import BeautifulSoup
import polars as pl
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

# CONFIG
BASE_URL = "https://mcdonalds.ee"
MENU_URL = f"{BASE_URL}/meie-menuu/"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
MAX_WORKERS = 8  # Adjust based on your connection


# STEP 1: Get all product URLs


def get_product_urls():
    resp = requests.get(MENU_URL, headers=HEADERS)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    product_links = []

    for article in soup.select("article.ee-post"):
        a_tag = article.find("a", href=True)
        if not a_tag:
            continue

        url = a_tag["href"]

        # Extract category from article class
        class_list = article.get("class", [])
        category_class = next(
            (cls for cls in class_list if cls.startswith("product_category-")), None
        )
        category = (
            re.sub(r"^product_category-", "", category_class).replace("-", " ").title()
            if category_class
            else "Unknown"
        )

        product_links.append({"url": url, "category": category})

    return product_links


# STEP 2: Extract nutritional info + image from a product page
def extract_nutrition(product_url):
    try:
        resp = requests.get(product_url, headers=HEADERS, timeout=10)
        resp.raise_for_status()
    except Exception as e:
        print(f"ERROR fetching {product_url}: {e}")
        return None

    soup = BeautifulSoup(resp.text, "html.parser")

    # Product name
    name_tag = soup.select_one("h1.elementor-heading-title, h2.ee-post__title__heading")
    product_name = name_tag.text.strip() if name_tag else "UNKNOWN"

    # Image URL - look for the main product image with attachment-full class
    img_tag = soup.select_one("img.attachment-full")
    
    # Fallback: try the elementor widget image
    if not img_tag:
        img_tag = soup.select_one(".elementor-widget-image img")
    
    # Last fallback: find any suitable image not in related section
    if not img_tag:
        all_imgs = soup.select("img")
        for img in all_imgs:
            # Check if this image is NOT inside the related products section
            parent_section = img.find_parent("section", {"id": "related"})
            if not parent_section and img.has_attr("src") and "wp-content/uploads" in img["src"]:
                # Skip generic McDonald's logo images
                if "GoldenArches" not in img["src"]:
                    img_tag = img
                    break
    
    image_url = img_tag["src"] if img_tag and img_tag.has_attr("src") else ""
    
    # Debug: Print product name and image URL to verify correct extraction
    if image_url:
        print(f"  -> Image: {image_url.split('/')[-1]}")
    else:
        print(f"  -> No image found")

    # Nutrition
    nutrition_section = soup.select_one("#product-nutritional-information .detailed")
    if not nutrition_section:
        print(f"[SKIP] No nutrition data for {product_name}")
        return None

    rows = nutrition_section.select(".detailed-row.values")
    nutrition_data = {
        "Product": product_name,
        "Image": image_url,
        "URL": product_url,
    }

    for row in rows:
        cols = row.find_all("div")
        if len(cols) >= 3:
            label = cols[0].text.strip()
            value_per_portion = cols[2].text.strip()
            col_name = label.replace("\n", " ").replace("  ", " ").strip()
            nutrition_data[col_name] = value_per_portion

    return nutrition_data


# MAIN FUNCTION
def main():
    product_urls = get_product_urls()
    print(f"Found {len(product_urls)} products.")

    all_data = []

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_meta = {
            executor.submit(extract_nutrition, item["url"]): item
            for item in product_urls
        }

        for idx, future in enumerate(as_completed(future_to_meta), 1):
            meta = future_to_meta[future]
            url = meta["url"]
            category = meta["category"]

            try:
                data = future.result()
                if data:
                    data["Category"] = category  # Add category to data!
                    all_data.append(data)
                    print(
                        f"[{idx}/{len(product_urls)}] OK: {data['Product']} ({category})"
                    )
                else:
                    print(f"[{idx}/{len(product_urls)}] SKIP: {url}")
            except Exception as e:
                print(f"[{idx}/{len(product_urls)}] ERROR processing {url}: {e}")

    if not all_data:
        print("No data collected.")
        return

    # Convert to Polars DataFrame
    df = pl.DataFrame(all_data)
    print(df)

    # Save CSV
    df.write_csv("mcdonalds_ee_menu_nutrition.csv")
    print("Saved to mcdonalds_ee_menu_nutrition.csv")

    # Save JSON (Polars >= 1.x correct API)
    df.write_json("mcdonalds_ee_menu_nutrition.json", format="row")
    print("Saved to mcdonalds_ee_menu_nutrition.json")


if __name__ == "__main__":
    main()
