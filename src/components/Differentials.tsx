import Link from "next/link";
import type { ReactNode } from "react";

/* Mesmo destaque de [CONFIRMAR] usado no simulador. */
const confirmar = (texto: string) => (
  <>
    {" "}
    <span className="rounded bg-amber-400/20 px-1 font-semibold text-amber-300">
      [CONFIRMAR]
    </span>{" "}
    {texto}
  </>
);

const rows: { term: string; value: ReactNode }[] = [
  { term: "No mercado", value: "Desde 1997" },
  {
    term: "Operação",
    value: "Monitoramento NOC e SOC, 24 horas por dia, 7 dias por semana",
  },
  {
    term: "Prioridade",
    value: (
      <>
        Chamados classificados por severidade, de P1 a P4.{" "}
        <Link
          href="/como-funciona#sla"
          className="text-base text-cyan-400 underline underline-offset-4 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          Ver tempos de resposta
        </Link>
      </>
    ),
  },
  {
    term: "Equipe",
    value: (
      <>
        Profissionais certificados em segurança da informação
        {confirmar("quais certificações")}
      </>
    ),
  },
  {
    term: "Pós-venda",
    value:
      "Acompanhamento dedicado do primeiro contato até a operação em produção",
  },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-20 bg-slate-950 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <h2 className="font-heading max-w-[18ch] self-start text-[length:clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white lg:sticky lg:top-28">
          Por que empresas confiam no Grupo RAM.
        </h2>

        <dl className="border-b border-slate-700/40">
          {rows.map((row) => (
            <div
              key={row.term}
              className="grid gap-2 border-t border-slate-700/40 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <dt className="text-[0.9375rem] text-slate-400 sm:pt-1">
                {row.term}
              </dt>
              <dd className="text-xl leading-snug text-white">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
