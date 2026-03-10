import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import CartDrawer from "@/components/CartDrawer";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fragment+Mono&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
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
