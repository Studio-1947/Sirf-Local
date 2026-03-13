import type { Metadata } from "next";
import { Inter, Fragment_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sirf Local",
  description: "Studio 1947 combines local wisdom with global impact. We are a digital agency providing design, technology, and strategy solutions for social change-makers.",
  openGraph: {
    title: "Sirf Local",
    description: "World-Class Design for Your Local Business",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fragmentMono.variable}`}>
      <head>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased noise">
        <ClientProviders>
          {children}
          <CartDrawer />
        </ClientProviders>
      </body>
    </html>
  );
}
