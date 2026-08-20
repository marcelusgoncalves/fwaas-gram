import { ClockIcon, CompassIcon, EyeIcon, ShieldIcon } from "./icons";
import { Card, Eyebrow } from "./ui";

const pillars = [
  {
    icon: ClockIcon,
    accent: "amber" as const,
    title: "Missão",
    description:
      "Entregar soluções de segurança digital que antecipam ameaças e garantem a continuidade operacional dos nossos clientes.",
  },
  {
    icon: EyeIcon,
    accent: "cyan" as const,
    title: "Visão",
    description:
      "Ser referência em cibersegurança e infraestrutura gerenciada, reconhecida pela qualidade técnica e confiabilidade.",
  },
  {
    icon: ShieldIcon,
    accent: "amber" as const,
    title: "Valores",
    description:
      "Compromisso, transparência, excelência técnica e inovação contínua em cada projeto entregue.",
  },
  {
    icon: CompassIcon,
    accent: "cyan" as const,
    title: "Propósito",
    description:
      "Conectar empresas à tecnologia certa para crescer com segurança, eficiência e previsibilidade.",
  },
];

export default function About() {
  return (
    <section id="quem-somos" className="scroll-mt-20 bg-slate-950 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Eyebrow accent="cyan">Quem somos</Eyebrow>
        <h2 className="font-heading max-w-3xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Tecnologia que protege, parceria que entrega resultado.
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-lg text-slate-400">
          <p>
            O Grupo RAM é uma empresa de tecnologia com mais de 28 anos
            de atuação, especializada na implementação, gestão e sustentação
            de ambientes críticos de TI para empresas de médio e grande
            porte nos setores de saúde, varejo, serviços e ambientes
            corporativos de alta demanda.
          </p>
          <p>
            Combinamos tecnologia de ponta, parcerias estratégicas com
            fabricantes líderes de mercado e uma abordagem orientada a
            resultados — atuando como parceiro estratégico na transformação
            e sustentação do ambiente tecnológico dos nossos clientes, com
            continuidade operacional, redução de riscos e ganho de
            eficiência.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <Card key={pillar.title} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
