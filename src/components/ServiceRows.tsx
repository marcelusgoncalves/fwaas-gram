"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Tone = "cyan" | "amber";

const services: {
  where: string;
  name: string;
  description: string;
  tone: Tone;
}[] = [
  {
    where: "No perímetro",
    name: "Firewall Físico e Cloud",
    description:
      "Appliance dedicado ou solução hospedada em nuvem, conforme a necessidade da operação.",
    tone: "cyan",
  },
  {
    where: "Em estações, servidores e dispositivos móveis",
    name: "Proteção de Endpoints",
    description:
      "Camada adicional de defesa para estações de trabalho, servidores e dispositivos móveis.",
    tone: "cyan",
  },
  {
    where: "Depois de um incidente",
    name: "Disaster Recovery",
    description:
      "Continuidade de negócio garantida com planos de contingência e recuperação após incidentes.",
    tone: "cyan",
  },
  {
    where: "24 horas por dia, 7 dias por semana",
    name: "Monitoramento NOC e SOC",
    description:
      "Equipe especializada acompanhando a rede 24 horas por dia, 7 dias por semana.",
    tone: "amber",
  },
];

const toneClass: Record<Tone, { name: string; bar: string; focus: string }> = {
  cyan: {
    name: "group-hover:text-cyan-400 group-focus-visible:text-cyan-400",
    bar: "bg-cyan-400",
    focus: "focus-visible:outline-cyan-400",
  },
  amber: {
    name: "group-hover:text-amber-400 group-focus-visible:text-amber-400",
    bar: "bg-amber-400",
    focus: "focus-visible:outline-amber-400",
  },
};

export default function ServiceRows() {
  const list = useRef<HTMLUListElement>(null);
  // Com prefers-reduced-motion, o CSS mostra os fios prontos, sem transição.
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={list} className="border-b border-slate-700/40">
      {services.map((item, i) => {
        const t = toneClass[item.tone];
        return (
          <li
            key={item.name}
            tabIndex={0}
            className={`group relative grid gap-3 py-8 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 md:grid-cols-[14rem_1fr_1fr] md:gap-10 md:py-10 ${t.focus}`}
          >
            <span
              aria-hidden
              data-on={on}
              style={{ "--i": i } as CSSProperties}
              className="line-draw absolute inset-x-0 top-0 h-px bg-slate-700/40"
            />
            <span
              aria-hidden
              className={`absolute -left-4 inset-y-0 w-0.5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 ${t.bar}`}
            />
            <p className="text-sm text-slate-400 md:pt-3">{item.where}</p>
            <h3
              className={`font-heading text-[length:clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white transition-colors duration-150 ${t.name}`}
            >
              {item.name}
            </h3>
            <p className="max-w-[60ch] text-[17px] leading-[1.65] text-slate-300 md:pt-2">
              {item.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
