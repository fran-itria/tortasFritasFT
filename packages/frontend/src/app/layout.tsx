import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/providers";
import Header from "@/components/Header";
import { Metadata } from "next";
import HeaderComponent from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tortas Fritas Ft",
  description: "Aplicación de venta de tortas fritas en línea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="h-25 max-xs:h-16">
            <Header />
          </div>
          <HeaderComponent />
          {children}
        </Providers>
      </body>
    </html>
  );
}
