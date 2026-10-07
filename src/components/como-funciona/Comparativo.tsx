import type { CSSProperties } from "react";
import { CheckIcon } from "../icons";
import {
  aloneBullets,
  aloneFlow,
  managedBullets,
  managedFlow,
} from "./data";
import SectionShell from "./SectionShell";

export default function Comparativo() {
  return (
    <SectionShell
      id="comparativo"
      eyebrow="Comparativo"
      accent="amber"
      title="Firewall sozinho x FWaaS gerenciado."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Firewall sozinho */}
        <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
          <span className="w-fit rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Regra fixa
          </span>
          <h3 className="mt-5 text-xl font-bold text-white">
            Firewall sozinho
          </h3>

          <div
            role="img"
            aria-label="Fluxo: tráfego, regra fixa, permite ou bloqueia"
            className="relative mt-6 flex items-stretch gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4 pb-5"
          >
            {aloneFlow.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div className="flex h-full flex-1 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 px-2 py-3 text-center text-xs font-semibold text-slate-300">
                  {label}
                </div>
                {i < aloneFlow.length - 1 && (
                  <span aria-hidden className="text-slate-600">
                    →
                  </span>
                )}
              </div>
            ))}
            <span
              aria-hidden
              className="flow-dot absolute bottom-2 left-4 h-1 w-2 rounded-full bg-slate-500"
            />
          </div>

          <ul className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-slate-400">
            {aloneBullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600"
                />
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* FWaaS gerenciado */}
        <article className="flex flex-col rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-8 shadow-2xl shadow-cyan-500/5">
          <span className="w-fit rounded-full border border-cyan-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Detecta, classifica, age, escala
          </span>
          <h3 className="mt-5 text-xl font-bold text-white">
            FWaaS gerenciado
          </h3>

          <ol
            aria-label="Fluxo: detecta, classifica, age, escala"
            className="mt-6 grid grid-cols-2 items-stretch gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 xl:grid-cols-4"
          >
            {managedFlow.map((step, i) => (
              <li
                key={step.label}
                style={{ "--i": i } as CSSProperties}
                className="flow-step flex min-w-0 flex-col items-start justify-start gap-1 rounded-lg border border-slate-800 bg-slate-900/40 p-3"
              >
                <span className="text-[10px] font-semibold leading-none text-slate-500">
                  {i + 1}
                </span>
                <span className="whitespace-nowrap text-[clamp(0.625rem,0.9vw,0.75rem)] font-bold uppercase leading-tight tracking-[0.04em] text-cyan-400 max-xl:text-xs">
                  {step.label}
                </span>
                <span className="text-xs leading-snug text-slate-400">
                  {step.detail}
                </span>
              </li>
            ))}
          </ol>

          <ul className="mt-6 flex flex-col gap-3 text-sm text-slate-200">
            {managedBullets.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 text-cyan-400">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </SectionShell>
  );
}
