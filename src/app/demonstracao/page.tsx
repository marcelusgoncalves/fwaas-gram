import type { Metadata } from "next";
import Link from "next/link";
import Shell, { PageIntro } from "@/components/Shell";
import DemoView from "@/components/demo/DemoView";

export const metadata: Metadata = {
  title: "Demonstração",
  description:
    "Passe pelas 8 etapas da plataforma, do dashboard ao Wi-Fi de visitantes, na visão de empresa ou de provedor. Demonstração ilustrativa.",
};

export default function DemonstracaoPage() {
  return (
    <Shell>
      <PageIntro
        accent="cyan"
        eyebrow="Demonstração guiada"
        title="Veja a plataforma em 8 etapas."
      >
        <p>
          Escolha se você quer ver como empresa ou como provedor e avance
          etapa por etapa. A ordem e a ênfase mudam conforme a visão.
        </p>
      </PageIntro>
      <DemoView />
      <p className="bg-slate-900/30 px-6 pb-12 text-center text-sm text-slate-400">
        Quer ver a operação por trás do painel?{" "}
        <Link
          href="/como-funciona"
          className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
        >
          Veja como funciona
        </Link>
        .
      </p>
    </Shell>
  );
}
