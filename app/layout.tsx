
import { CartProvider } from "@/cart/CartContext";
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
  title: "徐媽媽冰鑽滷味｜古早味滷味・餐桌美食",
  description:
    "徐媽媽冰鑽滷味，嚴選食材製作的古早味滷味，提供線上購物與冷凍宅配，讓您在家也能輕鬆享受經典美食。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="...">

  <CartProvider>
  {children}
</CartProvider>

</body>


    </html>
  );
}
