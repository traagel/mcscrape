import polars as pl
import json

# CONFIG
CSV_PATH = "mcdonalds_ee_menu_nutrition.csv"
JSON_PATH = "mcdonalds_ee_menu_nutrition.json"


def main():
    print(f"Reading CSV: {CSV_PATH}")
    df = pl.read_csv(CSV_PATH)
    print(f"Loaded {df.shape[0]} rows, {df.shape[1]} columns.")

    # Convert to list of dicts (row-oriented)
    data = df.to_dicts()

    print(f"Saving JSON: {JSON_PATH}")
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("Done.")


if __name__ == "__main__":
    main()
