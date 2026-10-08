import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";

const doors = [
  {
    href: "/empresas",
    kicker: "Para sua empresa",
    text: "Internet que não cai, navegação sob controle, VPN, filiais e Wi-Fi de visitantes, tudo acompanhado pelo celular.",
    tone: "hover:border-cyan-500/50",
    kickerClass: "text-cyan-400",
  },
  {
    href: "/provedores",
    kicker: "Para provedores e integradores",
    text: "A plataforma inteira com a sua marca, no seu endereço, e cada cliente vendo só a própria rede.",
    tone: "hover:border-amber-500/50",
    kickerClass: "text-amber-400",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden bg-slate-950"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] lg:block">
        <Image
          src="/images/dashboard-capa.jpeg"
          alt="Painel de gestão do firewall com métricas de banda, relatórios de acesso e filtro de conteúdo"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="pointer-events-none absolute left-6 top-8 hidden h-24 w-40 border-l border-t border-amber-500/30 sm:block" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-28">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Firewall gerenciado sobre MikroTik
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Sua internet não cai, seus dados ficam protegidos, suas filiais
            conversam entre si e{" "}
            <span className="text-cyan-400">
              você vê tudo em uma tela só.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            O roteador MikroTik do cliente vira um firewall gerenciado,
            administrado inteiro por um painel web, sem Winbox e sem visita
            técnica.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {doors.map((door) => (
            <Link
              key={door.href}
              href={door.href}
              className={`group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md transition hover:bg-slate-900/80 ${door.tone}`}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${door.kickerClass}`}
              >
                Entrar
              </span>
              <h2 className="font-heading mt-3 text-2xl font-bold text-white sm:text-3xl">
                {door.kicker}
              </h2>
              <p className="mt-3 text-slate-300">{door.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:gap-3">
                Ver como funciona
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-400">
          Quer entender a operação por trás do painel?{" "}
          <Link
            href="/como-funciona"
            className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
          >
            Veja como funciona
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
