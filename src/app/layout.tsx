import type { Metadata } from "next";
import { Inter, Syncopate } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TargetCursor from "@/components/TargetCursor";
import ClickSpark from "@/components/ClickSpark";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yantrik - Mechanical & Multidisciplinary Engineering Club",
  description: "The official mechanical and multidisciplinary engineering student club of the Science and Technology Council at IIT Mandi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syncopate.variable} scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black text-white antialiased font-inter">
        <TargetCursor />
        <Navbar />
        <ClickSpark
          sparkColor="#dc2626"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={12}
          duration={500}
        >
          <main className="flex-1 w-full h-full">
            {children}
          </main>
        </ClickSpark>
        <Footer />
      </body>
    </html>
  );
}
