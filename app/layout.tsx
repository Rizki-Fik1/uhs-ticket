import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UHS Ticket - Hiking Event Ticketing",
  description:
    "Book your hiking adventure tickets. Group booking, QR e-tickets, and seamless event management.",
  keywords: ["hiking", "event", "ticket", "adventure", "outdoor", "booking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
