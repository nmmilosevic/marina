import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/context/TransitionContext";
import Nav from "@/components/Nav";
import CustomCursor from "@/components/CustomCursor";
import TransitionOverlay from "@/components/TransitionOverlay";
import LenisProvider from "@/components/LenisProvider";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marina Vanni, Interior Designer",
  description:
    "Marina Vanni is a Marbella-based interior designer and architect specialising in refined residential and hospitality spaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable}`}
    >
      <body>
        <TransitionProvider>
          <LenisProvider>
            <CustomCursor />
            <TransitionOverlay />
            <Nav />
            {children}
          </LenisProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
