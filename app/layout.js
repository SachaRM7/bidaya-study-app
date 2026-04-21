import { Amiri, Source_Serif_4, Outfit } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "بِدَايَةُ المُتَفَقِّه — Bidāyat al-Mutafaqqih",
  description:
    "Application de révision du Bidāyat al-Mutafaqqih — Fiches, flashcards et quiz pour étudier les ḍawābiṭ de fiqh shāfi'ī",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" dir="ltr">
      <body className={`${amiri.variable} ${sourceSerif.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
