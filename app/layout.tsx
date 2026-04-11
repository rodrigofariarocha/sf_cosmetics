import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { FavoritesProvider } from "@/contexts/favorites-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SF Cosmetics | Beleza de Luxo",
  description: "Cosmética premium para uma beleza radiante.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${poppins.variable} font-sans antialiased bg-white text-black overflow-x-hidden`}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              {children}
              <Toaster />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
