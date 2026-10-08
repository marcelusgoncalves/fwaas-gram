"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CENARIOS,
  DURACAO,
  ETAPAS,
  NODES,
  type Cenario,
  type NodeId,
} from "../../lib/scenarios";

/* Cores alinhadas aos tokens do site (slate/cyan/amber). */
const COR = {
  auto: "#22d3ee",
  humano: "#fbbf24",
  ameaca: "#f87171",
  ok: "#34d399",
  legitimo: "#7dd3fc",
  borda: "#334155",
  fundoNo: "#0f172a",
  texto: "#e2e8f0",
  textoFraco: "#94a3b8",
} as const;

type Pt = [number, number];
type Estado = "normal" | "falha" | "alerta" | "ok";

interface Flow {
  key: string;
  route: NodeId[];
  cor: string;
  count: number;
  /** Fração da rota em que o ponto some (bloqueio). */
  stop?: number;
}

export interface SimuladorHandle {
  /** Avança uma etapa. Retorna false quando já está na última (o pai pode ir para a próxima seção). */
  avancar: () => boolean;
  /** Volta uma etapa. Retorna false quando já está no início. */
  voltar: () => boolean;
}

const ARESTAS: [NodeId, NodeId][] = [
  ["internet", "linkP"],
  ["linkP", "fwaas"],
  ["internet", "linkC"],
  ["linkC", "fwaas"],
  ["fwaas", "servidores"],
  ["fwaas", "estacoes"],
  ["fwaas", "filial"],
];

const VELOCIDADE_PX = 60;

const centro = (id: NodeId): Pt => [NODES[id].x, NODES[id].y];

function comprimento(pts: Pt[]): number {
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  return total;
}

function pontoNaRota(pts: Pt[], distancia: number): Pt {
  let restante = distancia;
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(
      pts[i][0] - pts[i - 1][0],
      pts[i][1] - pts[i - 1][1],
    );
    if (restante <= seg || i === pts.length - 1) {
      const f = seg === 0 ? 0 : Math.min(1, restante / seg);
      return [
        pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f,
        pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f,
      ];
    }
    restante -= seg;
  }
  return pts[pts.length - 1];
}

function flowsPara(c: Cenario["id"], e: number): Flow[] {
  const f: Flow[] = [];
  const viaP = (to: NodeId, key: string, count: number): Flow => ({
    key,
    route: ["internet", "linkP", "fwaas", to],
    cor: COR.legitimo,
    count,
  });
  const viaC = (to: NodeId, key: string, count: number): Flow => ({
    key,
    route: ["internet", "linkC", "fwaas", to],
    cor: COR.legitimo,
    count,
  });

  if (c === "queda-link") {
    if (e < 0) f.push(viaP("estacoes", "l1", 3), viaP("servidores", "l2", 2));
    else if (e >= 1)
      f.push(viaC("estacoes", "l1", 3), viaC("servidores", "l2", 2));
  } else {
    f.push(viaP("estacoes", "l1", 3), viaP("servidores", "l2", 2));
  }

  if (c === "filial") {
    if (e < 0)
      f.push({ key: "filial", route: ["fwaas", "filial"], cor: COR.legitimo, count: 1 });
    else if (e >= 1)
      f.push({ key: "filial", route: ["fwaas", "filial"], cor: COR.ok, count: 2 });
  } else {
    f.push({ key: "filial", route: ["fwaas", "filial"], cor: COR.legitimo, count: 1 });
  }

  if (c === "origem-maliciosa") {
    if (e <= 0)
      f.push({
        key: "ameaca",
        route: ["internet", "linkP", "fwaas", "servidores"],
        cor: COR.ameaca,
        count: 1,
      });
    else
      f.push({
        key: "ameaca",
        route: ["internet", "linkP", "fwaas"],
        cor: COR.ameaca,
        count: 1,
        stop: 0.95,
      });
  }

  return f;
}

function estadoNo(c: Cenario["id"], e: number, id: NodeId): Estado {
  if (c === "queda-link" && id === "linkP" && e >= 0) return "falha";
  if (c === "lista-negra" && id === "linkP" && e >= 0) return "alerta";
  if (c === "filial" && id === "filial") {
    if (e === 0) return "falha";
    if (e >= 1) return "ok";
  }
  return "normal";
}

function rotuloEstado(id: NodeId, estado: Estado): string {
  if (estado === "ok") return "Reconectada";
  if (estado === "alerta") return "IP em lista negra";
  if (estado === "falha") {
    if (id === "linkP") return "Indisponível";
    return "Desconectada";
  }
  return "";
}

function renderTexto(texto: string) {
  return texto.split(/(\[CONFIRMAR\])/).map((parte, i) =>
    parte === "[CONFIRMAR]" ? (
      <span
        key={i}
        className="rounded bg-amber-400/20 px-1 font-semibold text-amber-300"
      >
        {parte}
      </span>
    ) : (
      parte
    ),
  );
}

const tempoFmt = (t: number) => `T+00:${String(t).padStart(2, "0")}`;

const botao =
  "rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";

export const IncidentSimulator = forwardRef<SimuladorHandle>(
  function IncidentSimulator(_props, ref) {
    const [idx, setIdx] = useState(0);
    const [tempo, setTempo] = useState(0);
    const [clock, setClock] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [vel, setVel] = useState<1 | 2>(1);
    const [reduzido, setReduzido] = useState(false);

    const raiz = useRef<HTMLElement>(null);
    const tempoRef = useRef(0);
    const pausadoPeloUsuario = useRef(false);

    const cenario = CENARIOS[idx];

    useEffect(() => {
      tempoRef.current = tempo;
    }, [tempo]);

    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduzido(mq.matches);
      const h = (ev: MediaQueryListEvent) => setReduzido(ev.matches);
      mq.addEventListener("change", h);
      return () => mq.removeEventListener("change", h);
    }, []);

    useEffect(() => {
      if (!playing || reduzido) return;
      let last = performance.now();
      let raf = 0;
      const loop = (now: number) => {
        const dt = (now - last) / 1000;
        last = now;
        setClock((c) => c + dt * vel);
        setTempo((t) => Math.min(DURACAO, t + dt * vel));
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, [playing, vel, reduzido]);

    useEffect(() => {
      if (playing && tempo >= DURACAO) setPlaying(false);
    }, [playing, tempo]);

    useEffect(() => {
      const el = raiz.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([entrada]) => {
          if (entrada.isIntersecting) {
            if (
              !pausadoPeloUsuario.current &&
              tempoRef.current < DURACAO &&
              !reduzido
            )
              setPlaying(true);
          } else {
            setPlaying(false);
          }
        },
        { threshold: 0.35 },
      );
      io.observe(el);
      return () => io.disconnect();
    }, [reduzido]);

    const temposEventos = useMemo(
      () => cenario.eventos.map((ev) => ev.t),
      [cenario],
    );

    const irPara = useCallback((t: number) => {
      tempoRef.current = t;
      setTempo(t);
      setPlaying(false);
      pausadoPeloUsuario.current = true;
    }, []);

    const avancar = useCallback((): boolean => {
      const prox = temposEventos.find((t) => t > tempoRef.current + 0.001);
      if (prox === undefined) return false;
      irPara(prox);
      return true;
    }, [temposEventos, irPara]);

    const voltar = useCallback((): boolean => {
      const prev = [...temposEventos]
        .reverse()
        .find((t) => t < tempoRef.current - 0.001);
      if (prev === undefined) {
        if (tempoRef.current > 0.001) {
          irPara(0);
          return true;
        }
        return false;
      }
      irPara(prev);
      return true;
    }, [temposEventos, irPara]);

    useImperativeHandle(ref, () => ({ avancar, voltar }), [avancar, voltar]);

    const reiniciar = useCallback(
      (novoIdx: number) => {
        setIdx(novoIdx);
        tempoRef.current = 0;
        setTempo(0);
        setClock(0);
        pausadoPeloUsuario.current = false;
        setPlaying(!reduzido);
      },
      [reduzido],
    );

    const alternar = () => {
      if (tempo >= DURACAO) {
        reiniciar(idx);
        return;
      }
      pausadoPeloUsuario.current = playing;
      setPlaying(!playing);
    };

    const visiveis = cenario.eventos.filter((ev) => ev.t <= tempo);
    const e: number = visiveis.length
      ? visiveis[visiveis.length - 1].etapa
      : -1;
    const bloqueado =
      cenario.id === "origem-maliciosa" && e >= 1;
    const flows = flowsPara(cenario.id, e);

    const estiloAresta = (a: NodeId, b: NodeId) => {
      const usaP = a === "linkP" || b === "linkP";
      const usaC = a === "linkC" || b === "linkC";
      if (cenario.id === "queda-link") {
        if (usaP && e >= 0) return { stroke: COR.ameaca, dash: "4 4" };
        if (usaC && e >= 1) return { stroke: COR.auto, dash: undefined };
      }
      return { stroke: COR.borda, dash: undefined };
    };

    const resumoCena =
      e < 0
        ? "Operação normal."
        : `Etapa ${e + 1} de 4: ${ETAPAS[e].titulo}.`;

    const pulso = reduzido ? 0 : (clock * 40) % 28;

    return (
      <section
        ref={raiz}
        aria-label="Simulador de incidente"
        className="w-full"
      >
        <style>{`@keyframes sim-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.sim-in{animation:sim-in .35s ease both}@media (prefers-reduced-motion:reduce){.sim-in{animation:none}}`}</style>

        <div role="tablist" aria-label="Cenários" className="flex flex-wrap gap-3">
          {CENARIOS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === idx}
              onClick={() => reiniciar(i)}
              className={`${botao} ${
                i === idx
                  ? "border-transparent bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 hover:border-transparent"
                  : ""
              }`}
            >
              {c.nome}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
            <svg
              viewBox="0 0 640 320"
              role="img"
              aria-label={`Cena da rede, cenário ${cenario.nome}. ${resumoCena}`}
              className="h-auto w-full"
            >
              {ARESTAS.map(([a, b]) => {
                const [x1, y1] = centro(a);
                const [x2, y2] = centro(b);
                const s = estiloAresta(a, b);
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={s.stroke}
                    strokeWidth={2}
                    strokeDasharray={s.dash}
                  />
                );
              })}

              {bloqueado && (
                <circle
                  cx={NODES.fwaas.x}
                  cy={NODES.fwaas.y}
                  r={40 + pulso}
                  fill="none"
                  stroke={COR.ameaca}
                  strokeWidth={2}
                  opacity={reduzido ? 0.6 : 1 - pulso / 28}
                />
              )}

              {(Object.keys(NODES) as NodeId[]).map((id) => {
                const n = NODES[id];
                const estado = estadoNo(cenario.id, e, id);
                const stroke =
                  estado === "falha"
                    ? COR.ameaca
                    : estado === "alerta"
                      ? COR.humano
                      : estado === "ok"
                        ? COR.ok
                        : id === "fwaas"
                          ? COR.auto
                          : COR.borda;
                const rotulo = rotuloEstado(id, estado);
                return (
                  <g key={id}>
                    <rect
                      x={n.x - n.w / 2}
                      y={n.y - n.h / 2}
                      width={n.w}
                      height={n.h}
                      rx={10}
                      fill={COR.fundoNo}
                      stroke={stroke}
                      strokeWidth={id === "fwaas" ? 2.5 : 1.5}
                                          />
                    <text
                      x={n.x}
                      y={id === "fwaas" ? n.y - 2 : n.y + 4}
                      textAnchor="middle"
                      fontSize={id === "fwaas" ? 15 : 12}
                      fontWeight={id === "fwaas" ? 700 : 500}
                      fill={COR.texto}
                    >
                      {n.label}
                    </text>
                    {id === "fwaas" && (
                      <text
                        x={n.x}
                        y={n.y + 15}
                        textAnchor="middle"
                        fontSize={9}
                        fill={COR.textoFraco}
                      >
                        firewall gerenciado
                      </text>
                    )}
                    {rotulo && (
                      <text
                        x={n.x}
                        y={n.y + n.h / 2 + 14}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight={600}
                        fill={
                          estado === "ok"
                            ? COR.ok
                            : estado === "alerta"
                              ? COR.humano
                              : COR.ameaca
                        }
                      >
                        {rotulo}
                      </text>
                    )}
                  </g>
                );
              })}

              {!reduzido &&
                flows.flatMap((fl) => {
                  const pts = fl.route.map(centro);
                  const total = comprimento(pts);
                  return Array.from({ length: fl.count }, (_, i) => {
                    const p = ((clock * VELOCIDADE_PX) / total + i / fl.count) % 1;
                    if (fl.stop !== undefined && p > fl.stop) return null;
                    const [x, y] = pontoNaRota(pts, p * total);
                    return (
                      <circle
                        key={`${fl.key}-${i}`}
                        cx={x}
                        cy={y}
                        r={4.5}
                        fill={fl.cor}
                      />
                    );
                  });
                })}

              <g fontSize={10} fill={COR.textoFraco}>
                <circle cx={20} cy={298} r={4} fill={COR.legitimo} />
                <text x={30} y={302}>Tráfego legítimo</text>
                <circle cx={140} cy={298} r={4} fill={COR.ameaca} />
                <text x={150} y={302}>Ameaça</text>
              </g>
            </svg>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button type="button" onClick={alternar} className={botao}>
                {playing ? "Pausar" : tempo >= DURACAO ? "Repetir" : "Reproduzir"}
              </button>
              <button
                type="button"
                onClick={() => reiniciar(idx)}
                className={botao}
              >
                Reiniciar
              </button>
              <button type="button" onClick={() => avancar()} className={botao}>
                Próxima etapa
              </button>
              <button
                type="button"
                onClick={() => setVel(vel === 1 ? 2 : 1)}
                aria-label={`Velocidade ${vel}x. Alternar velocidade`}
                className={botao}
              >
                {vel}x
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: playing ? COR.ok : COR.textoFraco }}
                />
                Painel Grupo RAM
              </div>
              <ol
                role="log"
                aria-live="polite"
                className="min-h-[180px] space-y-3 text-sm"
              >
                {visiveis.length === 0 && (
                  <li className="text-slate-500">Aguardando evento…</li>
                )}
                {visiveis.map((ev) => (
                  <li key={`${cenario.id}-${ev.t}`} className="sim-in">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-slate-500">
                        {tempoFmt(ev.t)}
                      </span>
                      <span
                        className="rounded px-1.5 py-0.5 font-bold"
                        style={{
                          color: ev.ator === "auto" ? COR.auto : COR.humano,
                          background:
                            ev.ator === "auto"
                              ? "rgba(34,211,238,.12)"
                              : "rgba(251,191,36,.12)",
                        }}
                      >
                        {ev.ator === "auto" ? "AUTO" : "HUMANO"}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-300">{renderTexto(ev.texto)}</p>
                  </li>
                ))}
              </ol>
            </div>

            {e >= 2 && (
              <div className="sim-in rounded-2xl border border-amber-400/40 bg-slate-900/40 p-4">
                {/* VALIDAR: confirmar com a diretoria que o NOC/SOC 24x7 é entregue como serviço antes de ir para produção */}
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/60 text-xs font-bold text-amber-300"
                  >
                    NOC
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      Analista NOC/SOC
                    </p>
                    <p className="text-xs text-slate-400">
                      Chamado aberto, severidade de P1 a P4
                    </p>
                  </div>
                </div>
              </div>
            )}

            {e >= 3 && (
              <div className="sim-in rounded-2xl border border-amber-400/40 bg-slate-900/40 p-4">
                <p className="text-sm font-semibold text-slate-100">
                  O que o cliente recebe
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  <li>Relatórios de uso e conformidade</li>
                  <li>Suporte técnico especializado</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <ol className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ETAPAS.map((et, i) => {
            const ligada = e >= i;
            const atual = e === i;
            const cor = et.tipo === "Automático" ? COR.auto : COR.humano;
            return (
              <li
                key={et.titulo}
                aria-current={atual ? "step" : undefined}
                className="rounded-xl border bg-slate-900/40 p-3 transition"
                style={{
                  borderColor: ligada ? cor : "#1e293b",
                  opacity: ligada ? 1 : 0.55,
                  boxShadow: atual ? `0 0 0 1px ${cor}` : undefined,
                }}
              >
                <p className="text-xs text-slate-500">{i + 1} / 4</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">
                  {et.titulo}
                </p>
                <p
                  className="mt-0.5 text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: cor }}
                >
                  {et.tipo}
                </p>
              </li>
            );
          })}
        </ol>

        <p className="mt-4 text-xs text-slate-400">
          Simulação ilustrativa. Os tempos não representam o SLA contratado.
        </p>
      </section>
    );
  },
);

export default IncidentSimulator;
