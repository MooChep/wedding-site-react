import type { Metadata } from "next"
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Camille & Ilan - 19.09.2026",
  description: "Site officiel du mariage de Camille et Ilan le 19 septembre 2026. Retrouvez toutes les informations, la galerie photos, et gérez votre RSVP pour célébrer ce jour spécial avec nous !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"kids-font"}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
