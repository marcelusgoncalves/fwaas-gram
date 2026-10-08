import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComoFuncionaView from "@/components/como-funciona/ComoFuncionaView";

export const metadata: Metadata = {
  title: "Como funciona",
  description:
    "Veja como o Firewall Grupo RAM detecta, classifica, age e escala: mapa da operação, jornada do incidente, governança e SLA.",
  alternates: { canonical: "/como-funciona" },
};

export default function ComoFuncionaPage() {
  return (
    <>
      <Header />
      <main>
        <ComoFuncionaView />
      </main>
      <Footer />
    </>
  );
}
