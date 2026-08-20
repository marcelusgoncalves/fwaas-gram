import { CheckIcon, ShieldIcon, TruckIcon, ZapIcon } from "./icons";
import { Card, Eyebrow } from "./ui";

const items = [
  {
    icon: ZapIcon,
    accent: "amber" as const,
    title: "Atendimento Ágil",
    description:
      "Respostas rápidas e eficientes para cada demanda técnica, sempre que a empresa precisar.",
  },
  {
    icon: ShieldIcon,
    accent: "cyan" as const,
    title: "Equipe Especializada",
    description:
      "Profissionais certificados, com expertise consolidada em segurança da informação.",
  },
  {
    icon: CheckIcon,
    accent: "amber" as const,
    title: "Parceria Vivo Empresas",
    description:
      "A solidez de uma das maiores operadoras do país, aliada à nossa especialização técnica.",
  },
  {
    icon: TruckIcon,
    accent: "cyan" as const,
    title: "Suporte Pós-venda Contínuo",
    description:
      "Acompanhamento dedicado do primeiro contato até a operação em produção.",
  },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-20 bg-slate-900/30 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Eyebrow accent="cyan">Nossos diferenciais</Eyebrow>
        <h2 className="font-heading max-w-3xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Por que empresas confiam no Grupo RAM.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <Card key={item.title} {...item} />
          ))}
        </div>

        <p className="mt-14 text-center text-2xl font-bold text-white">
          Compromisso e{" "}
          <span className="text-amber-400">Excelência.</span>
        </p>
      </div>
    </section>
  );
}
