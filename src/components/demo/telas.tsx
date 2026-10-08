"use client";

import { useState, type ReactNode } from "react";

export type Modo = "empresa" | "provedor";

function Painel({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {titulo}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Selo({
  tom,
  children,
}: {
  tom: "ok" | "alerta" | "erro" | "neutro";
  children: ReactNode;
}) {
  const classes = {
    ok: "bg-emerald-500/15 text-emerald-300",
    alerta: "bg-amber-400/15 text-amber-300",
    erro: "bg-red-500/15 text-red-300",
    neutro: "bg-slate-700/40 text-slate-300",
  }[tom];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${classes}`}
    >
      {children}
    </span>
  );
}

function Numero({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500">
        {rotulo}
      </p>
      <p className="font-heading mt-2 text-2xl font-bold text-white">{valor}</p>
    </div>
  );
}

export function TelaDashboard({ modo }: { modo: Modo }) {
  if (modo === "provedor") {
    const frota = [
      ["Loja Centro", "Online", "ok", "Fibra"],
      ["Escritório Norte", "Online", "ok", "Rádio (reserva em uso)"],
      ["Clínica Sul", "Online", "ok", "Fibra"],
      ["Filial 07", "Atenção", "alerta", "Link degradado"],
      ["Loja Oeste", "Offline", "erro", "Sem resposta"],
    ] as const;
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Numero rotulo="Firewalls" valor="5" />
          <Numero rotulo="Online" valor="3" />
          <Numero rotulo="Precisam de atenção" valor="2" />
        </div>
        <Painel titulo="Frota de clientes">
          <ul className="divide-y divide-slate-800 text-sm">
            {frota.map(([nome, estado, tom, detalhe]) => (
              <li
                key={nome}
                className="flex flex-wrap items-center justify-between gap-2 py-2.5"
              >
                <span className="font-medium text-white">{nome}</span>
                <span className="text-slate-400">{detalhe}</span>
                <Selo tom={tom}>{estado}</Selo>
              </li>
            ))}
          </ul>
        </Painel>
      </div>
    );
  }

  const barras = [18, 22, 20, 30, 45, 70, 90, 60, 40, 28, 24, 20];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Numero rotulo="Internet" valor="2 links" />
        <Numero rotulo="Aparelhos" valor="18" />
        <Numero rotulo="Bloqueios" valor="138" />
        <Numero rotulo="VPN conectadas" valor="2" />
      </div>
      <Painel titulo="Navegação por hora">
        <div className="flex h-28 items-end gap-1.5" aria-hidden>
          {barras.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-t bg-cyan-400/70"
            />
          ))}
        </div>
      </Painel>
    </div>
  );
}

export function TelaLinks() {
  const [principal, setPrincipal] = useState<"fibra" | "radio">("fibra");
  const links = [
    { id: "fibra" as const, nome: "Fibra", latencia: "8 ms", perda: "0%" },
    { id: "radio" as const, nome: "Rádio", latencia: "21 ms", perda: "0%" },
  ];
  return (
    <div className="space-y-4">
      <Painel titulo="Links de internet">
        <ul className="space-y-3">
          {links.map((l) => (
            <li
              key={l.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 p-3"
            >
              <div>
                <p className="font-semibold text-white">{l.nome}</p>
                <p className="text-xs text-slate-400">
                  Latência {l.latencia} · Perda {l.perda}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Selo tom="ok">Bom</Selo>
                {principal === l.id ? (
                  <Selo tom="alerta">Principal, em uso</Selo>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPrincipal(l.id)}
                    className="rounded-full border border-cyan-500/50 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
                  >
                    Tornar principal
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Painel>
      <p className="text-xs text-slate-500">
        Clique em “Tornar principal” para testar a troca nesta tela simulada.
      </p>
    </div>
  );
}

export function TelaAlerta() {
  return (
    <div className="mx-auto max-w-sm space-y-3 rounded-3xl border border-slate-700 bg-slate-950 p-4">
      <p className="text-center text-xs text-slate-500">WhatsApp, hoje</p>
      <div className="rounded-2xl rounded-tl-sm bg-slate-800 p-3 text-sm text-slate-100">
        <p className="font-semibold text-red-300">Link caiu</p>
        <p className="mt-1">
          Cliente: Loja Centro
          <br />
          Link: Fibra
          <br />
          Troca para o link reserva (Rádio)
          <br />
          14:32 (Brasília)
        </p>
        <p className="mt-2 text-xs text-cyan-300">Abrir no painel</p>
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-slate-800 p-3 text-sm text-slate-100">
        <p className="font-semibold text-emerald-300">Link voltou</p>
        <p className="mt-1">
          Cliente: Loja Centro
          <br />
          Link: Fibra normalizado
          <br />
          14:41 (Brasília)
        </p>
      </div>
    </div>
  );
}

export function TelaNavegacao() {
  const [cats, setCats] = useState({
    "Redes sociais": true,
    Adulto: true,
    Apostas: true,
    Jogos: false,
  });
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Painel titulo="Categorias bloqueadas">
        <ul className="space-y-2">
          {(Object.keys(cats) as (keyof typeof cats)[]).map((nome) => (
            <li key={nome}>
              <button
                type="button"
                role="switch"
                aria-checked={cats[nome]}
                onClick={() => setCats((c) => ({ ...c, [nome]: !c[nome] }))}
                className="flex w-full items-center justify-between rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-200"
              >
                {nome}
                <span
                  className={`h-5 w-9 rounded-full p-0.5 transition ${cats[nome] ? "bg-emerald-500" : "bg-slate-700"}`}
                >
                  <span
                    className={`block h-4 w-4 rounded-full bg-white transition ${cats[nome] ? "translate-x-4" : ""}`}
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Painel>
      <Painel titulo="Relatório de acesso por computador (hoje)">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-slate-500">
            <tr>
              <th className="pb-2 font-medium">Computador</th>
              <th className="pb-2 font-medium">Acessos</th>
              <th className="pb-2 font-medium">Bloqueados</th>
            </tr>
          </thead>
          <tbody className="text-slate-200">
            <tr>
              <td className="py-1.5">Caixa 01</td>
              <td>1.204</td>
              <td>12</td>
            </tr>
            <tr>
              <td className="py-1.5">Recepção</td>
              <td>3.480</td>
              <td>96</td>
            </tr>
            <tr>
              <td className="py-1.5">Financeiro</td>
              <td>2.150</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </Painel>
    </div>
  );
}

export function TelaVpn() {
  const celulas = Array.from({ length: 81 }, (_, i) => (i * 7 + (i % 5) * 3) % 3 !== 0);
  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr]">
      <Painel titulo="Novo acesso: Ana (home office)">
        <div
          className="grid h-36 w-36 grid-cols-9 gap-0.5 rounded-lg bg-white p-2"
          role="img"
          aria-label="QR code ilustrativo de acesso à VPN"
        >
          {celulas.map((on, i) => (
            <span key={i} className={on ? "bg-slate-950" : "bg-white"} />
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">Leia no WireGuard do celular</p>
      </Painel>
      <Painel titulo="Histórico de conexões">
        <ul className="divide-y divide-slate-800 text-sm text-slate-200">
          <li className="flex justify-between py-2">
            <span>Ana</span>
            <span className="text-slate-400">hoje, 08:12 · 2 h 40 min</span>
          </li>
          <li className="flex justify-between py-2">
            <span>Carlos</span>
            <span className="text-slate-400">ontem, 17:05 · 45 min</span>
          </li>
          <li className="flex justify-between py-2">
            <span>Marta</span>
            <Selo tom="neutro">Acesso desligado</Selo>
          </li>
        </ul>
      </Painel>
    </div>
  );
}

export function TelaFiliais() {
  const lojas = [
    ["Matriz", "Online", "ok", "-"],
    ["Loja 01", "Online", "ok", "12 ms"],
    ["Loja 02", "Online", "ok", "18 ms"],
    ["Loja 03", "Reconectando", "alerta", "-"],
    ["Loja 04", "Online", "ok", "15 ms"],
  ] as const;
  return (
    <Painel titulo="Interligações: rede de lojas (dados fictícios)">
      <ul className="divide-y divide-slate-800 text-sm">
        {lojas.map(([nome, estado, tom, lat]) => (
          <li key={nome} className="flex items-center justify-between py-2.5">
            <span className="font-medium text-white">{nome}</span>
            <span className="text-slate-400">{lat}</span>
            <Selo tom={tom}>{estado}</Selo>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-500">
        O vigia mede cada filial a cada minuto e reconecta sozinho.
      </p>
    </Painel>
  );
}

export function TelaWifi() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center">
        <p className="font-heading text-lg font-bold text-white">
          Bem-vindo à Loja Demo
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Entre com o seu WhatsApp para navegar
        </p>
        <div className="mt-4 rounded-lg border border-slate-700 px-3 py-2 text-left text-sm text-slate-500">
          (61) 90000-0000
        </div>
        <div className="mt-3 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-2 text-sm font-bold text-slate-950">
          Conectar
        </div>
        <p className="mt-3 text-[11px] text-slate-500">
          Ao conectar você aceita os termos (LGPD).
        </p>
      </div>
      <Painel titulo="Relatório de visitantes (fictício)">
        <div className="grid grid-cols-2 gap-3">
          <Numero rotulo="Novos" valor="128" />
          <Numero rotulo="Recorrentes" valor="64" />
        </div>
        <p className="mt-3 text-sm text-slate-300">
          Número confirmado, pronto para a Lista WhatsApp.
        </p>
      </Painel>
    </div>
  );
}

export function TelaParceiro() {
  const marcas = [
    { nome: "Provedor Alfa", cor: "bg-cyan-500", clientes: ["Loja Centro", "Clínica Sul"] },
    { nome: "Provedor Beta", cor: "bg-amber-400", clientes: ["Escritório Norte"] },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {marcas.map((m) => (
        <div
          key={m.nome}
          className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70"
        >
          <div className={`${m.cor} px-4 py-2 text-sm font-bold text-slate-950`}>
            {m.nome}
          </div>
          <div className="p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-slate-500">
              Clientes deste parceiro
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              {m.clientes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Cada cliente vê só a própria rede.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
