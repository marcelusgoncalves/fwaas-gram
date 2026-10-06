"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { ArrowRightIcon, CloseIcon } from "../icons";
import { Eyebrow, ghostButtonClass, primaryButtonClass } from "../ui";
import Comparativo from "./Comparativo";
import Controle from "./Controle";
import type { SimuladorHandle } from "./IncidentSimulator";
import Jornada from "./Jornada";
import MapaOperacao from "./MapaOperacao";
import SlaTable from "./SlaTable";

const slides: {
  id: string;
  label: string;
  render: (simRef: Ref<SimuladorHandle>) => ReactNode;
}[] = [
  { id: "comparativo", label: "Comparativo", render: () => <Comparativo /> },
  { id: "mapa", label: "Mapa da operação", render: () => <MapaOperacao /> },
  { id: "jornada", label: "Jornada", render: (simRef) => <Jornada simRef={simRef} /> },
  { id: "controle", label: "Controle", render: () => <Controle /> },
  { id: "sla", label: "SLA", render: () => <SlaTable /> },
];

const FOCUSABLE =
  'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea';

export default function ComoFuncionaView() {
  const [presenting, setPresenting] = useState(false);
  const [current, setCurrent] = useState(0);
  const overlay = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const simRef = useRef<SimuladorHandle>(null);
  const currentRef = useRef(0);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const start = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setCurrent(0);
    setPresenting(true);
    // Tela cheia é melhor esforço: se o navegador recusar, o modo segue em overlay.
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    setPresenting(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!presenting) {
      opener.current?.focus?.();
      return;
    }

    overlay.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const last = slides.length - 1;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        stop();
        return;
      }

      if (e.key === "Tab" && overlay.current) {
        const items = Array.from(
          overlay.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null);
        if (items.length === 0) return;
        const first = items[0];
        const end = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === overlay.current)) {
          e.preventDefault();
          end.focus();
        } else if (!e.shiftKey && active === end) {
          e.preventDefault();
          first.focus();
        }
        return;
      }

      const noSimulador = slides[currentRef.current].id === "jornada";

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        // Na jornada, as setas avançam as etapas do simulador antes de trocar de seção.
        if (noSimulador && simRef.current?.avancar()) return;
        setCurrent((c) => Math.min(c + 1, last));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        if (noSimulador && simRef.current?.voltar()) return;
        setCurrent((c) => Math.max(c - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setCurrent(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setCurrent(last);
      }
    };

    // Sair da tela cheia pelo ESC do navegador também encerra a apresentação.
    const onFullscreen = () => {
      if (!document.fullscreenElement) setPresenting(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, [presenting, stop]);

  if (presenting) {
    const last = slides.length - 1;
    return (
      <div
        ref={overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Modo apresentação"
        tabIndex={-1}
        className="fixed inset-0 z-[100] flex flex-col bg-slate-950 outline-none"
      >
        {/* Progresso */}
        <div className="flex items-center gap-4 border-b border-white/5 px-6 py-4">
          <ol aria-label="Progresso da apresentação" className="flex flex-1 gap-2">
            {slides.map((s, i) => (
              <li key={s.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir para ${s.label}`}
                  aria-current={i === current ? "step" : undefined}
                  className="group block w-full py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  <span
                    className={`block h-1 rounded-full transition ${
                      i <= current ? "bg-cyan-400" : "bg-slate-800 group-hover:bg-slate-700"
                    }`}
                  />
                  <span
                    className={`mt-2 hidden text-xs font-semibold sm:block ${
                      i === current ? "text-cyan-400" : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <span className="text-sm font-semibold tabular-nums text-slate-400" aria-live="polite">
            {current + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={stop}
            className={`${ghostButtonClass} !px-4 !py-2`}
          >
            <CloseIcon className="h-4 w-4" />
            <span>Sair (ESC)</span>
          </button>
        </div>

        {/* Slide */}
        <div className="flex-1 overflow-y-auto">
          <div
            key={slides[current].id}
            className="slide-in flex min-h-full items-center [&_section]:w-full [&_section]:!py-10"
          >
            {slides[current].render(simRef)}
          </div>
        </div>

        {/* Navegação */}
        <div className="flex items-center justify-between gap-4 border-t border-white/5 px-6 py-3">
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            className={`${ghostButtonClass} !px-5 !py-2 disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Anterior
          </button>
          <p className="hidden text-xs text-slate-500 sm:block">
            Use as setas ← → para navegar e ESC para sair
          </p>
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.min(c + 1, last))}
            disabled={current === last}
            className={`${primaryButtonClass} !px-5 !py-2 disabled:cursor-not-allowed disabled:opacity-40`}
          >
            Próxima
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        id="topo"
        className="bg-slate-950 px-6 pb-16 pt-20"
        aria-labelledby="como-funciona-titulo"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow accent="cyan">Como funciona</Eyebrow>
          <h1
            id="como-funciona-titulo"
            className="font-heading max-w-4xl text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            Como funciona o FWaaS do Grupo RAM.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-400">
            Segurança perimetral inteligente, sob demanda e sem complexidade.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button type="button" onClick={start} className={primaryButtonClass}>
              Iniciar apresentação
              <ArrowRightIcon className="h-4 w-4" />
            </button>
            <Link href="/#contato" className={ghostButtonClass}>
              Solicitar orçamento
            </Link>
          </div>

          <nav aria-label="Seções desta página" className="mt-12">
            <ul className="flex flex-wrap gap-3 text-sm font-medium text-slate-300">
              {slides.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="rounded-full border border-slate-800 px-4 py-2 transition hover:border-cyan-500/50 hover:text-cyan-400"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {slides.map((s) => (
        <div key={s.id}>{s.render(simRef)}</div>
      ))}
    </>
  );
}
