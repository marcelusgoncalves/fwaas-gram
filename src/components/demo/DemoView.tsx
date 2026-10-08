"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { primaryButtonClass } from "@/components/ui";
import {
  TelaAlerta,
  TelaDashboard,
  TelaFiliais,
  TelaLinks,
  TelaNavegacao,
  TelaParceiro,
  TelaVpn,
  TelaWifi,
  type Modo,
} from "./telas";

type Etapa = {
  id: string;
  titulo: string;
  frase: Record<Modo, string>;
  tela: (modo: Modo) => ReactNode;
};

const etapas: Record<string, Etapa> = {
  dashboard: {
    id: "dashboard",
    titulo: "Dashboard",
    frase: {
      empresa: "Isso é a sua rede inteira, agora, em uma tela.",
      provedor:
        "Isso é a rede de todos os seus clientes, agora, em uma tela, com o que precisa de atenção em destaque.",
    },
    tela: (modo) => <TelaDashboard modo={modo} />,
  },
  links: {
    id: "links",
    titulo: "Firewall e links",
    frase: {
      empresa:
        "Dois ou mais links com troca automática em segundos, sem ninguém mexer.",
      provedor:
        "Qualidade medida de cada link do cliente: prova para cobrar a operadora, sem depender de ligação de cliente.",
    },
    tela: () => <TelaLinks />,
  },
  alerta: {
    id: "alerta",
    titulo: "Alerta no WhatsApp",
    frase: {
      empresa: "Você fica sabendo antes do seu cliente ligar.",
      provedor:
        "O alerta chega para a sua equipe, e também pode chegar para o próprio cliente final.",
    },
    tela: () => <TelaAlerta />,
  },
  navegacao: {
    id: "navegacao",
    titulo: "Controle de navegação",
    frase: {
      empresa:
        "Bloqueio por categoria com um clique e relatório de acesso por computador.",
      provedor:
        "Cada cliente tem a própria conta de filtro, isolada, aplicada pelo painel.",
    },
    tela: () => <TelaNavegacao />,
  },
  vpn: {
    id: "vpn",
    titulo: "VPN",
    frase: {
      empresa:
        "VPN por usuário em minutos, com QR code no celular e histórico de quem conectou.",
      provedor:
        "Você define o limite de acessos de VPN por cliente e acompanha o histórico.",
    },
    tela: () => <TelaVpn />,
  },
  filiais: {
    id: "filiais",
    titulo: "Filiais",
    frase: {
      empresa:
        "As lojas acessam o sistema da matriz como se estivessem no mesmo prédio.",
      provedor:
        "Ligue uma loja nova cadastrando a filial e colando um script no roteador, sem visita técnica.",
    },
    tela: () => <TelaFiliais />,
  },
  wifi: {
    id: "wifi",
    titulo: "Wi-Fi de visitantes",
    frase: {
      empresa:
        "Wi-Fi para clientes sem expor a sua rede, com cadastro de WhatsApp confirmado.",
      provedor:
        "O portal de visitantes sai com a marca da loja do seu cliente, em uma rede separada.",
    },
    tela: () => <TelaWifi />,
  },
  parceiro: {
    id: "parceiro",
    titulo: "Para o parceiro",
    frase: {
      empresa: "",
      provedor:
        "O painel com a sua marca, cada cliente vendo só o dele, e contrato digital.",
    },
    tela: () => <TelaParceiro />,
  },
};

const ordem: Record<Modo, string[]> = {
  empresa: [
    "dashboard",
    "links",
    "alerta",
    "navegacao",
    "vpn",
    "filiais",
    "wifi",
  ],
  provedor: [
    "dashboard",
    "parceiro",
    "links",
    "alerta",
    "filiais",
    "vpn",
    "navegacao",
    "wifi",
  ],
};

export default function DemoView() {
  const [modo, setModo] = useState<Modo>("empresa");
  const [indice, setIndice] = useState(0);

  const lista = ordem[modo].map((id) => etapas[id]);
  const atual = lista[indice];

  function trocarModo(novo: Modo) {
    setModo(novo);
    setIndice(0);
  }

  return (
    <section className="bg-slate-900/30 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Visão da demonstração"
            className="inline-flex rounded-full border border-slate-700 p-1"
          >
            {(["empresa", "provedor"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={modo === m}
                onClick={() => trocarModo(m)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  modo === m
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {m === "empresa" ? "Empresa" : "Provedor"}
              </button>
            ))}
          </div>
          <p className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
            Demonstração ilustrativa
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr]">
          <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {lista.map((etapa, i) => (
              <li key={etapa.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndice(i)}
                  aria-current={i === indice ? "step" : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                    i === indice
                      ? "border-cyan-500/60 bg-cyan-500/10 text-white"
                      : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      i === indice
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="whitespace-nowrap font-medium lg:whitespace-normal">
                    {etapa.titulo}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div
            key={`${modo}-${atual.id}`}
            className="slide-in overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-4 text-xs text-slate-500">
                Etapa {indice + 1} de {lista.length} · {atual.titulo}
              </span>
            </div>
            <div className="p-5 sm:p-6">{atual.tela(modo)}</div>
            <div className="border-t border-slate-800 bg-slate-950/60 px-6 py-5">
              <p className="font-heading text-lg font-semibold text-white">
                {atual.frase[modo]}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIndice((i) => Math.max(0, i - 1))}
              disabled={indice === 0}
              className="rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 disabled:opacity-40"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() =>
                setIndice((i) => Math.min(lista.length - 1, i + 1))
              }
              disabled={indice === lista.length - 1}
              className="rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
          <Link
            href={`/contato?perfil=${modo}`}
            className={primaryButtonClass}
          >
            {modo === "provedor"
              ? "Solicitar proposta para provedores"
              : "Solicitar proposta"}
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Telas simuladas com dados fictícios, só para ilustrar o fluxo. Os
          nomes, números e horários não são de clientes reais.
        </p>
      </div>
    </section>
  );
}
