import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // <--- IMPORT THIS

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space" 
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoCar Rentals | Chauffeur Driven Service",
  description: "Premium car rentals with professional drivers in West Bengal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${spaceGrotesk.variable} bg-[#050505] text-white antialiased`}>
        {/* WRAP CHILDREN WITH AUTH PROVIDER */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}