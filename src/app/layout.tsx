import type { Metadata } from "next";
import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import FullScreenLoader from "@/components/FullScreenLoader";
import Providers from "@/components/Providers";

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
    <html lang="en" className={`${outfit.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('chhavi-theme');
                if (t === 'dark') document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <FullScreenLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
