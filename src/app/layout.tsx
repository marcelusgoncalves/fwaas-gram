import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fwaas-gram.vercel.app"),
  title: "FWAAS | Firewall as a Service — Grupo RAM",
  description:
    "Segurança perimetral inteligente, sob demanda e sem complexidade. Experiência que evolui, soluções que entregam.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${poppins.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
