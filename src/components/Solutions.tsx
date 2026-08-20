import { RadarIcon, RefreshIcon, ServerIcon, SmartphoneIcon } from "./icons";
import { Card, Eyebrow } from "./ui";

const solutions = [
  {
    icon: ServerIcon,
    accent: "amber" as const,
    title: "Firewall Físico e Cloud",
    description:
      "Appliance dedicado ou solução hospedada em nuvem, conforme a necessidade da operação.",
  },
  {
    icon: SmartphoneIcon,
    accent: "cyan" as const,
    title: "Proteção de Endpoints",
    description:
      "Camada adicional de defesa para estações de trabalho, servidores e dispositivos móveis.",
  },
  {
    icon: RefreshIcon,
    accent: "amber" as const,
    title: "Disaster Recovery",
    description:
      "Continuidade de negócio garantida com planos de contingência e recuperação após incidentes.",
  },
  {
    icon: RadarIcon,
    accent: "cyan" as const,
    title: "Monitoramento NOC e SOC",
    description:
      "Equipe especializada acompanhando a rede 24 horas por dia, 7 dias por semana.",
  },
];

export default function Solutions() {
  return (
    <section id="solucao" className="scroll-mt-20 bg-slate-900/30 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Eyebrow accent="amber">O que é o FWaaS</Eyebrow>
        <h2 className="font-heading max-w-3xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Proteção perimetral completa, para qualquer cenário.
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-slate-400">
          O Firewall as a Service do Grupo RAM entrega segurança avançada com
          flexibilidade entre nuvem e ambiente físico, adaptando-se ao porte
          e à necessidade de cada operação.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {solutions.map((item) => (
            <Card key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
