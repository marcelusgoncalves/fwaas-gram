import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell, { PageIntro } from "@/components/Shell";
import {
  CheckItem,
  primaryButtonClass,
  ghostButtonClass,
} from "@/components/ui";
import { getModulo, modulos } from "@/lib/modulos";

export function generateStaticParams() {
  return modulos.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  props: PageProps<"/modulos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const modulo = getModulo(slug);
  if (!modulo) return {};
  return { title: modulo.titulo, description: modulo.oQueE };
}

export default async function ModuloPage(props: PageProps<"/modulos/[slug]">) {
  const { slug } = await props.params;
  const modulo = getModulo(slug);
  if (!modulo) notFound();

  const indice = modulos.findIndex((m) => m.slug === slug);
  const proximo = modulos[(indice + 1) % modulos.length];

  return (
    <Shell>
      <PageIntro
        accent="cyan"
        eyebrow={`Módulo ${String(modulo.numero).padStart(2, "0")} · ${modulo.area}`}
        title={modulo.titulo}
      >
        <p>{modulo.oQueE}</p>
      </PageIntro>

      <section className="bg-slate-900/30 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              Dor que resolve
            </h2>
            <p className="font-heading mt-4 text-2xl font-semibold leading-snug text-white">
              {modulo.dor}
            </p>

            <h2 className="mt-12 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              Diferenciais
            </h2>
            <ul className="mt-5 flex flex-col gap-4">
              {modulo.diferenciais.map((d) => (
                <CheckItem key={d}>{d}</CheckItem>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              Como funciona
            </h2>
            <ul className="mt-5 space-y-4 text-[17px] leading-relaxed text-slate-300">
              {modulo.como.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
            <h2 className="font-heading text-2xl font-bold text-white">
              Requisitos e limites
            </h2>
            <ul className="mt-5 space-y-3 text-slate-200">
              {modulo.requisitos.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="font-heading mt-16 text-2xl font-bold text-white">
            Perguntas típicas
          </h2>
          <dl className="mt-6 grid gap-5 md:grid-cols-2">
            {modulo.perguntas.map((p) => (
              <div
                key={p.pergunta}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <dt className="font-semibold text-white">{p.pergunta}</dt>
                <dd className="mt-2 text-slate-300">{p.resposta}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex flex-wrap gap-4">
            <Link href="/contato" className={primaryButtonClass}>
              Solicitar proposta
            </Link>
            <Link
              href={`/modulos/${proximo.slug}`}
              className={ghostButtonClass}
            >
              Próximo: {proximo.titulo}
            </Link>
            <Link href="/modulos" className={ghostButtonClass}>
              Todos os módulos
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
