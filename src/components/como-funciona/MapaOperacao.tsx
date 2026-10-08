"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { CheckIcon } from "../icons";
import {
  hubInfo,
  mapNodes,
  modeLabel,
  type MapNodeId,
  type Mode,
} from "./data";
import SectionShell from "./SectionShell";
import Txt from "./Txt";

type Selection = MapNodeId | "hub" | null;

const HUB = { cx: 400, cy: 230, w: 180, h: 84 };
const NODE = { w: 240, h: 88 };

const modeStyle: Record<Mode, { stroke: string; text: string; fill: string }> = {
  auto: {
    stroke: "stroke-cyan-400",
    text: "fill-cyan-400",
    fill: "fill-cyan-500/10",
  },
  human: {
    stroke: "stroke-amber-400",
    text: "fill-amber-400",
    fill: "fill-amber-500/10",
  },
};

function ModeBadge({ mode }: { mode: Mode }) {
  const auto = mode === "auto";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        auto
          ? "border-cyan-500/40 text-cyan-400"
          : "border-amber-500/40 text-amber-400"
      }`}
    >
      {modeLabel[mode]}
    </span>
  );
}

export default function MapaOperacao() {
  const [selected, setSelected] = useState<Selection>(null);
  const [active, setActive] = useState<Record<MapNodeId, boolean>>({
    firewall: true,
    links: true,
    alertas: true,
    vpn: true,
    wifi: true,
    noc: true,
  });

  const svgRef = useRef<SVGSVGElement>(null);
  const boxes = useRef<Record<string, SVGRectElement | null>>({});
  const lines = useRef<Record<string, SVGLineElement | null>>({});

  // Mede as caixas no DOM e prende cada linha na borda externa delas.
  const measure = () => {
    const svg = svgRef.current;
    const hub = boxes.current.hub;
    if (!svg || !hub) return;
    const sb = svg.getBoundingClientRect();
    if (!sb.width) return;
    const k = svg.viewBox.baseVal.width / sb.width; // px -> unidades do viewBox
    const read = (el: SVGRectElement) => {
      const r = el.getBoundingClientRect();
      return {
        cx: (r.left + r.width / 2 - sb.left) * k,
        cy: (r.top + r.height / 2 - sb.top) * k,
        hw: (r.width / 2) * k,
        hh: (r.height / 2) * k,
      };
    };
    // Fração da reta centro a centro em que ela cruza a borda do retângulo.
    const exit = (b: { hw: number; hh: number }, dx: number, dy: number) =>
      Math.min(
        dx === 0 ? Infinity : b.hw / Math.abs(dx),
        dy === 0 ? Infinity : b.hh / Math.abs(dy),
      );
    const h = read(hub);
    for (const n of mapNodes) {
      const el = boxes.current[n.id];
      const line = lines.current[n.id];
      if (!el || !line) continue;
      const b = read(el);
      const dx = b.cx - h.cx;
      const dy = b.cy - h.cy;
      const th = exit(h, dx, dy);
      const tb = exit(b, dx, dy);
      line.setAttribute("x1", String(h.cx + dx * th));
      line.setAttribute("y1", String(h.cy + dy * th));
      line.setAttribute("x2", String(b.cx - dx * tb));
      line.setAttribute("y2", String(b.cy - dy * tb));
    }
  };

  useLayoutEffect(() => {
    measure();
    const svg = svgRef.current;
    if (!svg) return;
    const ro = new ResizeObserver(measure);
    ro.observe(svg);
    return () => ro.disconnect();
  });

  const toggle = (id: MapNodeId) => {
    setActive((prev) => ({ ...prev, [id]: !prev[id] }));
    setSelected((cur) => (cur === id ? null : cur));
  };

  const select = (id: Selection) =>
    setSelected((cur) => (cur === id ? null : id));

  const node = mapNodes.find((n) => n.id === selected);
  const info =
    selected === "hub"
      ? { title: hubInfo.label, summary: hubInfo.summary, points: hubInfo.points, mode: null, note: undefined }
      : node
        ? { title: node.label, summary: node.summary, points: node.points, mode: node.mode, note: node.note }
        : null;

  return (
    <SectionShell
      id="mapa"
      eyebrow="Mapa da operação"
      accent="cyan"
      tone="soft"
      title="Tudo conectado ao FWaaS, do firewall ao NOC e SOC."
      intro="Selecione um elemento para ver como ele participa da operação. Use os filtros para ligar e desligar áreas."
    >
      {/* Filtros */}
      <div
        role="group"
        aria-label="Filtrar áreas do mapa"
        className="mb-6 flex flex-wrap gap-3"
      >
        {mapNodes.map((n) => (
          <button
            key={n.id}
            type="button"
            aria-pressed={active[n.id]}
            aria-current={selected === n.id ? "true" : undefined}
            onClick={() => toggle(n.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
              active[n.id]
                ? "border-cyan-500/50 text-cyan-400"
                : "border-slate-700 text-slate-500 line-through"
            } ${selected === n.id ? "bg-cyan-500/15 ring-1 ring-cyan-400" : ""}`}
          >
            <span
              aria-hidden
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                active[n.id] ? "border-cyan-500/60" : "border-slate-700"
              }`}
            >
              {active[n.id] && <CheckIcon className="h-2.5 w-2.5" />}
            </span>
            {n.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* SVG */}
        <div
          role="region"
          aria-label="Mapa da operação, role horizontalmente no celular"
          tabIndex={0}
          className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40 focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          <svg
            ref={svgRef}
            viewBox="0 0 800 460"
            className="block h-auto w-full min-w-[720px] overflow-hidden"
            role="group"
            aria-label="Diagrama: FWaaS ao centro, ligado a Firewall MikroTik, Links e redundância, Alertas no WhatsApp, VPN e filiais, Wi-Fi de visitantes e NOC e SOC"
          >
            {/* Ligações */}
            {mapNodes.map(
              (n) =>
                active[n.id] && (
                  <line
                    key={n.id}
                    ref={(el) => {
                      lines.current[n.id] = el;
                    }}
                    strokeWidth={selected === n.id ? 3 : 2}
                    className={`pointer-events-none ${
                      n.mode === "auto"
                        ? "edge-auto stroke-cyan-400"
                        : "edge-human stroke-amber-400"
                    } ${selected && selected !== n.id ? "opacity-40" : ""}`}
                    strokeLinecap="round"
                  />
                ),
            )}

            {/* Nó central */}
            <g
              role="button"
              tabIndex={0}
              aria-pressed={selected === "hub"}
              aria-label="FWaaS, nó central"
              className="map-node cursor-pointer"
              onClick={() => select("hub")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select("hub");
                }
              }}
            >
              <rect
                className="map-ring fill-none stroke-white"
                strokeWidth={2}
                rx={22}
                x={HUB.cx - HUB.w / 2 - 6}
                y={HUB.cy - HUB.h / 2 - 6}
                width={HUB.w + 12}
                height={HUB.h + 12}
              />
              <rect
                ref={(el) => {
                  boxes.current.hub = el;
                }}
                x={HUB.cx - HUB.w / 2}
                y={HUB.cy - HUB.h / 2}
                width={HUB.w}
                height={HUB.h}
                rx={18}
                strokeWidth={selected === "hub" ? 3 : 1.5}
                className="fill-slate-950 stroke-white"
              />
              <text
                x={HUB.cx}
                y={HUB.cy - 2}
                textAnchor="middle"
                className="fill-white font-heading text-[26px] font-extrabold"
              >
                FWaaS
              </text>
              <text
                x={HUB.cx}
                y={HUB.cy + 22}
                textAnchor="middle"
                className="fill-slate-400 text-[12px]"
              >
                Grupo RAM
              </text>
            </g>

            {/* Nós */}
            {mapNodes.map((n) => {
              if (!active[n.id]) return null;
              const s = modeStyle[n.mode];
              const x = n.cx - NODE.w / 2;
              const y = n.cy - NODE.h / 2;
              const isSel = selected === n.id;
              return (
                <g
                  key={n.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSel}
                  aria-label={`${n.label}, ${modeLabel[n.mode]}`}
                  className="map-node cursor-pointer"
                  onClick={() => select(n.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(n.id);
                    }
                  }}
                >
                  <rect
                    className="map-ring fill-none stroke-white"
                    strokeWidth={2}
                    rx={20}
                    x={x - 6}
                    y={y - 6}
                    width={NODE.w + 12}
                    height={NODE.h + 12}
                  />
                  <rect
                    ref={(el) => {
                      boxes.current[n.id] = el;
                    }}
                    x={x}
                    y={y}
                    width={NODE.w}
                    height={NODE.h}
                    rx={16}
                    strokeWidth={isSel ? 3 : 1.5}
                    strokeDasharray={n.mode === "human" ? "6 5" : undefined}
                    className={`${s.stroke} fill-slate-900`}
                  />
                  {isSel && (
                    <rect
                      x={x}
                      y={y}
                      width={NODE.w}
                      height={NODE.h}
                      rx={16}
                      className={`pointer-events-none stroke-none ${s.fill}`}
                    />
                  )}
                  <text
                    x={n.cx}
                    y={n.cy - 4}
                    textAnchor="middle"
                    className="fill-white text-[16px] font-bold"
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.cx}
                    y={n.cy + 22}
                    textAnchor="middle"
                    className={`${s.text} text-[12px] font-semibold uppercase`}
                    letterSpacing={1.5}
                  >
                    {modeLabel[n.mode]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Painel lateral */}
        <aside
          aria-live="polite"
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
        >
          {info ? (
            <div key={selected} className="slide-in">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold text-white">{info.title}</h3>
                {info.mode && <ModeBadge mode={info.mode} />}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {info.summary}
              </p>
              {info.points.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-200">
                  {info.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              {info.note && (
                <p className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm leading-relaxed text-slate-300">
                  <Txt>{info.note}</Txt>
                </p>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-5 text-sm font-semibold text-slate-400 transition hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                Limpar seleção
              </button>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-slate-400">
              Selecione um elemento do mapa para ver a explicação aqui.
            </p>
          )}
        </aside>
      </div>

      {/* Legenda */}
      <ul
        aria-label="Legenda"
        className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300"
      >
        <li className="flex items-center gap-3">
          <svg width="40" height="8" aria-hidden>
            <line
              x1="2"
              y1="4"
              x2="38"
              y2="4"
              strokeWidth="2"
              strokeLinecap="round"
              className="edge-auto stroke-cyan-400"
            />
          </svg>
          Automático
        </li>
        <li className="flex items-center gap-3">
          <svg width="40" height="8" aria-hidden>
            <line
              x1="2"
              y1="4"
              x2="38"
              y2="4"
              strokeWidth="2"
              strokeLinecap="round"
              className="edge-human stroke-amber-400"
            />
          </svg>
          Validação humana
        </li>
      </ul>
    </SectionShell>
  );
}
