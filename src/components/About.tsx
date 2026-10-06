const pillars = [
  {
    title: "Missão",
    description:
      "Entregar soluções de segurança digital que antecipam ameaças e garantem a continuidade operacional dos nossos clientes.",
  },
  {
    title: "Visão",
    description:
      "Ser referência em cibersegurança e infraestrutura gerenciada, reconhecida pela qualidade técnica e confiabilidade.",
  },
  {
    title: "Valores",
    description:
      "Compromisso, transparência, excelência técnica e inovação contínua em cada projeto entregue.",
  },
];

export default function About() {
  return (
    <section id="quem-somos" className="scroll-mt-20 bg-slate-900/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading max-w-[28ch] text-[length:clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white">
          Conectar empresas à tecnologia certa para crescer com segurança,
          eficiência e previsibilidade.
        </h2>

        <div className="mt-8 max-w-[60ch] space-y-4 text-[17px] leading-[1.65] text-slate-300">
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

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="border-t border-slate-700/40 pt-6">
              <h3 className="text-base font-semibold text-white">
                {pillar.title}
              </h3>
              <p className="mt-3 max-w-[60ch] text-[17px] leading-[1.65] text-slate-300">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
