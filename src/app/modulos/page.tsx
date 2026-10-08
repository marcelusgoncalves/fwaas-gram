import type { Metadata } from "next";
import Link from "next/link";
import Shell, { PageIntro } from "@/components/Shell";
import { modulos } from "@/lib/modulos";

export const metadata: Metadata = {
  title: "Módulos",
  description:
    "Os 12 módulos da plataforma de firewall gerenciado: painel, alertas, redundância de links, segurança, filtro, VPN, filiais, Wi-Fi de visitantes e mais.",
};

export default function ModulosPage() {
  return (
    <Shell>
      <PageIntro eyebrow="Módulos" title="Doze módulos, um painel só.">
        <p>
          Cada módulo mostra o que é, a dor que resolve, como funciona e os
          requisitos e limites, sem letra miúda.
        </p>
      </PageIntro>

      <section className="bg-slate-900/30 px-6 py-20">
        <ol className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modulos.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/modulos/${m.slug}`}
                className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-7 transition hover:border-cyan-500/40 hover:bg-slate-900/70"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                  {String(m.numero).padStart(2, "0")} · {m.area}
                </span>
                <h2 className="font-heading mt-3 text-xl font-bold text-white">
                  {m.titulo}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                  {m.oQueE}
                </p>
                <span className="mt-5 text-sm font-semibold text-cyan-400">
                  Ver módulo
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </Shell>
  );
}
