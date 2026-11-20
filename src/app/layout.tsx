import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Christ Family Church | Take a Step Toward the Light",
  description:
    "An immersive, cinematic web application for Christ Family Church featuring worship experiences, sermons, community life, and spiritual connection.",
  openGraph: {
    title: "Christ Family Church | Take a Step Toward the Light",
    description:
      "An immersive, cinematic web application for Christ Family Church featuring worship experiences, sermons, community life, and spiritual connection.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christ Family Church | Take a Step Toward the Light",
    description:
      "An immersive, cinematic web application for Christ Family Church featuring worship experiences, sermons, community life, and spiritual connection.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className="bg-[#121110] text-[#EDE8E3] antialiased selection:bg-[#E8C48E]/30 selection:text-[#FFF8EE]"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
