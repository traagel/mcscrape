"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Product = {
  Product: string;
  Image: string;
  URL: string;
  Category: string;
  "Energiaväärtus (kJ)": number;
  "Energiaväärtus (kcal)": number;
  "Rasvad (g)": number;
  "Süsivesikud (g)": number;
  "millest suhkrud (g)": number;
  "Kiudained (g)": number;
  "Valgud (g)": number;
  "Sool (g)": number;
};

type RawProduct = {
  Product: string;
  Image: string;
  URL: string;
  Category: string;
  "Energiaväärtus (kJ)": string | number;
  "Energiaväärtus (kcal)": string | number;
  "Rasvad (g)": string | number;
  "Süsivesikud (g)": string | number;
  "millest suhkrud (g)": string | number;
  "Kiudained (g)": string | number;
  "Valgud (g)": string | number;
  "Sool (g)": string | number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meal, setMeal] = useState<{ product: Product; qty: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMealDetails, setShowMealDetails] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'protein' | 'carbs' | 'protein-ratio'>('default');

  useEffect(() => {
    // Load products from public/data/products.json
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data: RawProduct[]) => {
        const cleaned = data.map((item: RawProduct) => ({
          ...item,
          "Energiaväärtus (kJ)": Number(item["Energiaväärtus (kJ)"]) || 0,
          "Energiaväärtus (kcal)": Number(item["Energiaväärtus (kcal)"]) || 0,
          "Rasvad (g)": Number(item["Rasvad (g)"]) || 0,
          "Süsivesikud (g)": Number(item["Süsivesikud (g)"]) || 0,
          "millest suhkrud (g)": Number(item["millest suhkrud (g)"]) || 0,
          "Kiudained (g)": Number(item["Kiudained (g)"]) || 0,
          "Valgud (g)": Number(item["Valgud (g)"]) || 0,
          "Sool (g)": Number(item["Sool (g)"]) || 0,
        }));
        setProducts(cleaned);
      });
  }, []);

  const handleAdd = (product: Product) => {
    setMeal((prev) => {
      const existing = prev.find((item) => item.product.Product === product.Product);
      if (existing) {
        return prev.map((item) =>
          item.product.Product === product.Product
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { product, qty: 1 }];
      }
    });
  };

  const handleRemove = (productName: string) => {
    setMeal((prev) => {
      const existing = prev.find((item) => item.product.Product === productName);
      if (existing && existing.qty > 1) {
        return prev.map((item) =>
          item.product.Product === productName
            ? { ...item, qty: item.qty - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item.product.Product !== productName);
      }
    });
  };

  const handleDelete = (productName: string) => {
    setMeal((prev) => prev.filter((item) => item.product.Product !== productName));
  };

  const getProductQuantity = (productName: string) => {
    const item = meal.find((item) => item.product.Product === productName);
    return item ? item.qty : 0;
  };

  const totals = meal.reduce(
    (acc, item) => {
      acc.kcal += item.qty * item.product["Energiaväärtus (kcal)"];
      acc.fat += item.qty * item.product["Rasvad (g)"];
      acc.carbs += item.qty * item.product["Süsivesikud (g)"];
      acc.sugar += item.qty * item.product["millest suhkrud (g)"];
      acc.fiber += item.qty * item.product["Kiudained (g)"];
      acc.protein += item.qty * item.product["Valgud (g)"];
      acc.salt += item.qty * item.product["Sool (g)"];
      return acc;
    },
    { kcal: 0, fat: 0, carbs: 0, sugar: 0, fiber: 0, protein: 0, salt: 0 }
  );

  const categories = Array.from(new Set(products.map((p) => p.Category))).sort();
  const displayCategories = selectedCategory ? [selectedCategory] : categories;

  // Helper function to calculate protein/kcal ratio
  const getProteinRatio = (product: Product) => {
    const kcal = product["Energiaväärtus (kcal)"];
    const protein = product["Valgud (g)"];
    return kcal > 0 ? (protein / kcal * 100) : 0; // protein grams per 100 kcal
  };

  // Sorting function
  const getSortedProducts = (categoryProducts: Product[]) => {
    if (sortBy === 'default') return categoryProducts;
    
    return [...categoryProducts].sort((a, b) => {
      switch (sortBy) {
        case 'protein':
          return b["Valgud (g)"] - a["Valgud (g)"];
        case 'carbs':
          return a["Süsivesikud (g)"] - b["Süsivesikud (g)"]; // Low to high for keto
        case 'protein-ratio':
          return getProteinRatio(b) - getProteinRatio(a);
        default:
          return 0;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              McDonald&apos;s Macro Tracker
            </h1>
            <button
              onClick={() => setShowMealDetails(!showMealDetails)}
              className="relative bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                View Meal
                {meal.length > 0 && (
                  <span className="bg-yellow-400 text-red-700 text-sm font-bold rounded-full px-2 py-0.5">
                    {meal.reduce((sum, item) => sum + item.qty, 0)}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                !selectedCategory
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sorting Options */}
      <div className="bg-white/60 backdrop-blur-sm sticky top-28 z-20 shadow-sm border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
            <button
              onClick={() => setSortBy('default')}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                sortBy === 'default'
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setSortBy('protein')}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                sortBy === 'protein'
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🥩 High Protein
            </button>
            <button
              onClick={() => setSortBy('protein-ratio')}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                sortBy === 'protein-ratio'
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              💪 Protein/Cal Ratio
            </button>
            <button
              onClick={() => setSortBy('carbs')}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                sortBy === 'carbs'
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🥑 Keto Friendly
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Menu Grid */}
        {displayCategories.map((cat) => (
          <div key={cat} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="bg-red-600 w-1 h-6 rounded-full"></span>
              {cat}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {getSortedProducts(products.filter((p) => p.Category === cat))
                .map((product, index) => {
                  const qty = getProductQuantity(product.Product);
                  return (
                    <div
                      key={`${product.Product}-${index}`}
                      className="relative group"
                    >
                      <div
                        onClick={() => handleAdd(product)}
                        className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden ${
                          qty > 0 ? "ring-2 ring-red-600" : ""
                        }`}
                      >
                        {/* Selection Badge */}
                        {qty > 0 && (
                          <div className="absolute top-2 right-2 z-10 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg animate-pulse">
                            {qty}
                          </div>
                        )}

                        {/* Product Image */}
                        <div className="aspect-square p-4 bg-gradient-to-br from-yellow-50 to-red-50">
                          {product.Image ? (
                            <Image
                              src={product.Image}
                              alt={product.Product}
                              width={200}
                              height={200}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-3">
                          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                            {product.Product}
                          </h3>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span className="font-bold text-red-600">
                                {product["Energiaväärtus (kcal)"]} kcal
                              </span>
                              <span>{product["Valgud (g)"]}g protein</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-purple-600 font-medium">
                                {getProteinRatio(product).toFixed(1)}g/100kcal
                              </span>
                              <span className="text-orange-600">
                                {product["Süsivesikud (g)"]}g carbs
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </main>

      {/* Meal Details Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        showMealDetails ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="bg-red-600 text-white p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Your Meal</h2>
            <button
              onClick={() => setShowMealDetails(false)}
              className="p-1 hover:bg-red-700 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Meal Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {meal.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p>Your meal is empty</p>
                <p className="text-sm mt-2">Add items from the menu</p>
              </div>
            ) : (
              <div className="space-y-3">
                {meal.map((item, index) => (
                  <div key={`meal-${item.product.Product}-${index}`} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      {item.product.Image && (
                        <Image
                          src={item.product.Image}
                          alt={item.product.Product}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain rounded-lg bg-white p-1"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900">{item.product.Product}</h4>
                        <p className="text-xs text-gray-700 font-medium">
                          {item.qty * item.product["Energiaväärtus (kcal)"]} kcal
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleRemove(item.product.Product)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-bold">{item.qty}</span>
                        <button
                          onClick={() => handleAdd(item.product)}
                          className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.product.Product)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-red-200 transition-colors flex items-center justify-center ml-2"
                        >
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Totals */}
          {meal.length > 0 && (
            <div className="bg-gradient-to-t from-gray-100 to-white border-t p-4">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Nutritional Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">{totals.kcal}</div>
                  <div className="text-sm text-gray-800 font-medium">Calories</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{totals.protein.toFixed(1)}g</div>
                  <div className="text-sm text-gray-800 font-medium">Protein</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-orange-600">{totals.carbs.toFixed(1)}g</div>
                  <div className="text-sm text-gray-800 font-medium">Carbs</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-yellow-600">{totals.fat.toFixed(1)}g</div>
                  <div className="text-sm text-gray-800 font-medium">Fat</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{totals.fiber.toFixed(1)}g</div>
                  <div className="text-sm text-gray-800 font-medium">Fiber</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-600">{totals.sugar.toFixed(1)}g</div>
                  <div className="text-sm text-gray-800 font-medium">Sugar</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Totals Bar (Mobile) */}
      {meal.length > 0 && !showMealDetails && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 sm:hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-red-600">{totals.kcal} kcal</div>
              <div className="text-sm text-gray-600">
                {meal.reduce((sum, item) => sum + item.qty, 0)} items
              </div>
            </div>
            <button
              onClick={() => setShowMealDetails(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors shadow-lg"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}

