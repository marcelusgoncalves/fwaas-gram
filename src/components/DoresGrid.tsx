import Link from "next/link";
import { dores, getModulo } from "@/lib/modulos";
import { Eyebrow } from "./ui";

export default function DoresGrid() {
  return (
    <section id="dores" className="scroll-mt-20 bg-slate-900/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Eyebrow accent="cyan">Dores que resolvemos</Eyebrow>
        <h2 className="font-heading max-w-3xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Comece pela dor. Cada uma tem um módulo que resolve.
        </h2>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dores.map((dor) => {
            const modulo = getModulo(dor.modulo);
            return (
              <li
                key={dor.cliente}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-7 transition hover:border-slate-700 hover:bg-slate-900/70"
              >
                <p className="font-heading text-lg font-semibold text-white">
                  {dor.cliente}
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-300">
                  {dor.plataforma}
                </p>
                {modulo && (
                  <Link
                    href={`/modulos/${modulo.slug}`}
                    className="mt-5 text-sm font-semibold text-cyan-400 underline-offset-4 transition hover:text-cyan-300 hover:underline"
                  >
                    Módulo: {modulo.titulo}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
