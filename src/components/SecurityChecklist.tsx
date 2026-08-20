import Image from "next/image";
import { CheckItem, Eyebrow } from "./ui";

const items = [
  "Inspeção de tráfego em tempo real",
  "Bloqueio automatizado de ameaças",
  "Gestão centralizada de políticas",
  "Escalabilidade sob demanda",
  "Conectividade segura para filiais e home office",
  "Relatórios de uso e conformidade",
];

export default function SecurityChecklist() {
  return (
    <section className="bg-slate-900/30 py-24 px-6">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Eyebrow accent="cyan">Segurança avançada</Eyebrow>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Inteligência para o que realmente importa: a continuidade do seu
            negócio.
          </h2>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl shadow-black/40">
          <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-cyan-500/5" />
          <div className="relative aspect-video w-full">
            <Image
              src="/images/dashboard-02.jpeg"
              alt="Relatório de acesso do firewall com consultas DNS, bloqueios, conteúdo bloqueado e domínios mais acessados"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
