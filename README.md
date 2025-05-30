# 🍟 McDonald's Macro Tracker

A modern web application for tracking McDonald's menu items and calculating nutritional macros for meal planning. Perfect for fitness enthusiasts, keto dieters, and anyone who wants to make informed food choices at McDonald's.

*Created using Claude-4-Sonnet AI assistant*

## 🛠️ Tech Stack

- **React 19** - Modern UI library
- **Next.js 15** - Full-stack React framework
- **Bun** - Fast JavaScript runtime & package manager
- **Docker** - Containerization for deployment

## ✨ Features

- **Complete McDonald's Menu**: Browse all menu items with detailed nutritional information
- **Smart Meal Builder**: Add items to create custom meals and track totals
- **Macro Tracking**: Monitor calories, protein, carbs, fat, fiber, sugar, and salt
- **Protein Efficiency**: Calculate protein-to-calorie ratios for optimal protein intake
- **Keto-Friendly Sorting**: Find low-carb options easily
- **High Protein Sorting**: Identify protein-rich menu items
- **Category Filtering**: Browse by menu categories (burgers, sides, drinks, etc.)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Calculations**: Instant nutritional summaries as you build your meal

## 🎯 Perfect For

- **Fitness & Bodybuilding**: Track protein intake and optimize macros
- **Keto Diet**: Find low-carb, high-fat options
- **Weight Management**: Monitor calorie intake
- **General Health**: Make informed nutritional choices

## 🚀 Getting Started

### Development

```bash
# Install dependencies
bun install

# Run the development server
bun dev

# Open http://localhost:3000 in your browser
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t mcdonalds-macro-tracker .

# Run the container
docker run -p 3000:3000 mcdonalds-macro-tracker
```

## 🏗️ Built With

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - Latest React features
- **Docker** - Containerization for easy deployment

## 📊 Nutritional Data

The app includes comprehensive nutritional information for McDonald's menu items:
- Energy (kJ and kcal)
- Protein (g)
- Total Carbohydrates (g)
- Sugar (g)
- Fat (g)
- Fiber (g)
- Salt (g)

## 🔧 Configuration

The app is configured for production deployment with:
- Standalone output for optimal Docker builds
- Package import optimizations
- Production-ready security settings

## 📝 License

This project is open source and available under the MIT License.

---

*Note: This is an unofficial tool for educational and personal use. Nutritional information is based on publicly available McDonald's data and should be verified with official sources for dietary decisions.*
