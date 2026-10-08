import type { Metadata } from "next";
import Shell from "@/components/Shell";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Solicite uma proposta de firewall gerenciado para a sua empresa ou para a sua carteira de clientes de provedor.",
};

export default function ContatoPage() {
  return (
    <Shell>
      <CTA />
    </Shell>
  );
}
