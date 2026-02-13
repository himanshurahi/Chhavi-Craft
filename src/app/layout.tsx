import type { Metadata } from "next";
import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chhavi Craft | Personalized & Corporate Gifts",
  description:
    "Chhavi Craft provides the best range of Acrylic QR Scan Stand, Dog Tag, QR Code Stand, Photo Album, QR Menu Stand, Wooden Scrap Book, Corporate Gifts & more. Personalized gifts crafted in Sonipat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSerif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
