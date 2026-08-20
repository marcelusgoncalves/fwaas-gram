import Image from "next/image";
import { Eyebrow } from "./ui";

function BrowserFrame({
  src,
  alt,
  path,
}: {
  src: string;
  alt: string;
  path: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-4 text-xs text-slate-500">{path}</span>
      </div>
      <div className="relative aspect-video w-full">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section className="bg-slate-950 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Eyebrow accent="amber">Painel de gestão</Eyebrow>
        <h2 className="font-heading max-w-3xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Visibilidade total da sua rede, em um único painel.
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-slate-400">
          Acompanhe tráfego, bloqueios, dispositivos conectados e a saúde do
          seu firewall em tempo real — de forma simples, visual e acessível
          de qualquer lugar.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <BrowserFrame
            src="/images/dashboard-04.jpeg"
            alt="Visão geral do painel de gestão do firewall, com status de internet, dispositivos conectados, bloqueios e tráfego em tempo real"
            path="painel.gruporam.com.br/firewall"
          />
          <BrowserFrame
            src="/images/dashboard-03.jpeg"
            alt="Métricas de banda mostrando o tráfego de upload e download da interface WAN1"
            path="painel.gruporam.com.br/metricas"
          />
        </div>
      </div>
    </section>
  );
}
