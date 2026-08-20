import { BriefcaseIcon, BuildingIcon, FileTextIcon, HomeIcon } from "./icons";
import { Eyebrow, IconCircle } from "./ui";

const areas = [
  { icon: HomeIcon, accent: "amber" as const, label: "Empresas de todos os portes" },
  { icon: BriefcaseIcon, accent: "cyan" as const, label: "Indústrias" },
  { icon: FileTextIcon, accent: "amber" as const, label: "Órgãos e entidades" },
  { icon: BuildingIcon, accent: "cyan" as const, label: "Condomínios corporativos" },
];

export default function Coverage() {
  return (
    <section className="bg-slate-950 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Eyebrow accent="amber">Onde atendemos</Eyebrow>
        <h2 className="font-heading max-w-3xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Atuação nacional, presença consolidada em Brasília-DF.
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-slate-400">
          Sediado em Brasília-DF há mais de 28 anos, o Grupo RAM atende
          empresas de todos os portes em todo o território nacional, com
          suporte remoto especializado e atendimento técnico presencial na
          região Centro-Oeste.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <div
              key={area.label}
              className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center"
            >
              <IconCircle icon={area.icon} accent={area.accent} />
              <p className="font-medium text-slate-200">{area.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
