import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "McDonald's Macro Tracker | Track Nutrition & Build Healthy Meals",
  description: "Track McDonald's nutrition information and build custom meals. Perfect for fitness, keto, and macro counting. Monitor calories, protein, carbs, and more with our interactive meal builder.",
  keywords: [
    "McDonald's nutrition",
    "macro tracker",
    "calorie counter",
    "protein tracker",
    "keto McDonald's",
    "fitness nutrition",
    "meal builder",
    "McDonald's calories",
    "nutrition facts",
    "macro counting"
  ],
  authors: [{ name: "McDonald's Macro Tracker" }],
  creator: "Claude-4-Sonnet AI",
  publisher: "McDonald's Macro Tracker",
  robots: "index, follow",
  openGraph: {
    title: "McDonald's Macro Tracker - Track Nutrition & Build Healthy Meals",
    description: "Interactive nutrition tracker for McDonald's menu items. Perfect for fitness enthusiasts, keto dieters, and macro counting. Build custom meals and track calories, protein, carbs, and more.",
    type: "website",
    locale: "en_US",
    url: "https://mcdonalds-macro-tracker.com",
    siteName: "McDonald's Macro Tracker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "McDonald's Macro Tracker - Nutrition tracking for McDonald's menu",
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 1080,
        height: 1080,
        alt: "McDonald's Macro Tracker",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@macrotracker",
    creator: "@macrotracker",
    title: "McDonald's Macro Tracker - Track Nutrition & Build Healthy Meals",
    description: "Interactive nutrition tracker for McDonald's menu items. Perfect for fitness, keto, and macro counting.",
    images: ["/twitter-image.png"],
  },
  facebook: {
    appId: "your_facebook_app_id",
  },
  verification: {
    google: "your_google_verification_code",
    yandex: "your_yandex_verification_code",
    yahoo: "your_yahoo_verification_code",
  },
  alternates: {
    canonical: "https://mcdonalds-macro-tracker.com",
    languages: {
      "en-US": "https://mcdonalds-macro-tracker.com",
      "en-GB": "https://mcdonalds-macro-tracker.com/en-gb",
    },
  },
  category: "Food & Nutrition",
  classification: "Health & Fitness",
  referrer: "origin-when-cross-origin",
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DC2626" },
    { media: "(prefers-color-scheme: dark)", color: "#EF4444" },
  ],
  colorScheme: "light dark",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "McDonald's Macro Tracker",
    statusBarStyle: "default",
    startupImage: [
      {
        url: "/apple-touch-startup-image-768x1004.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  other: {
    "msapplication-TileColor": "#DC2626",
    "msapplication-TileImage": "/mstile-144x144.png",
    "msapplication-config": "/browserconfig.xml",
    "application-name": "McDonald's Macro Tracker",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "McDonald's Macro Tracker",
    "theme-color": "#DC2626",
    "msvalidate.01": "your_bing_verification_code",
    "pinterest-rich-pin": "true",
    "og:see_also": "https://mcdonalds-macro-tracker.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* LinkedIn specific tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="linkedin:owner" content="your_linkedin_company_id" />
        
        {/* WhatsApp specific */}
        <meta property="og:image:type" content="image/png" />
        
        {/* Telegram specific */}
        <meta name="telegram:channel" content="@your_telegram_channel" />
        
        {/* Discord specific */}
        <meta name="theme-color" content="#DC2626" />
        
        {/* Pinterest specific */}
        <meta name="pinterest-rich-pin" content="true" />
        <meta property="og:rich_attachment" content="true" />
        
        {/* Reddit specific */}
        <meta property="og:video" content="" />
        
        {/* Slack specific */}
        <meta property="og:image:secure_url" content="https://mcdonalds-macro-tracker.com/og-image.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
