import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google"; // Import Playfair
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// Royal/Premium Font
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

// Clean/Minimal Font
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "GoCar Rentals | Premium Chauffeur Service",
  description: "Experience luxury travel in West Bengal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} bg-[#050505] text-white antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}