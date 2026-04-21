import "./globals.css";
import Navbar from "../components/Navbar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VastraAI | AI Fashion Stylist and Style Quiz",
    template: "%s | VastraAI",
  },
  description:
    "VastraAI helps you discover outfits, define your style, and generate fashion recommendations with an AI-powered styling experience.",
  keywords: [
    "VastraAI",
    "AI fashion stylist",
    "style quiz",
    "virtual styling",
    "fashion recommendations",
    "outfit suggestions",
  ],
  openGraph: {
    title: "VastraAI | AI Fashion Stylist and Style Quiz",
    description:
      "Discover better outfits, define your personal style, and generate fashion recommendations with VastraAI.",
    url: "/",
    siteName: "VastraAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VastraAI | AI Fashion Stylist and Style Quiz",
    description:
      "Discover better outfits, define your personal style, and generate fashion recommendations with VastraAI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-700">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
