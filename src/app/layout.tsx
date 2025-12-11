import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import CartProvider from "@/components/providers/CartProvider";
import CartDrawer from "@/components/site/CartDrawer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amo mi casa | Home & Deco",
  description: "Tienda online de deco y hogar.",
  icons: {
    // favicon & PWA-friendly sizes (served from Cloudinary with on-the-fly resizing to PNG)
    icon: [
      {
        url: "https://res.cloudinary.com/dzoupwn0e/image/upload/c_fill,w_16,h_16,f_png/v1765465731/portada_wodgac.webp?v=2",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/dzoupwn0e/image/upload/c_fill,w_32,h_32,f_png/v1765465731/portada_wodgac.webp?v=2",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/dzoupwn0e/image/upload/c_fill,w_48,h_48,f_png/v1765465731/portada_wodgac.webp?v=2",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/dzoupwn0e/image/upload/c_fill,w_192,h_192,f_png/v1765465731/portada_wodgac.webp?v=2",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/dzoupwn0e/image/upload/c_fill,w_512,h_512,f_png/v1765465731/portada_wodgac.webp?v=2",
        sizes: "512x512",
        type: "image/png",
      }
    ],
    apple: [
      {
        url: "https://res.cloudinary.com/dzoupwn0e/image/upload/c_fill,w_180,h_180,f_png/v1765465731/portada_wodgac.webp?v=2",
        sizes: "180x180",
        type: "image/png",
      }
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          {children}
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
