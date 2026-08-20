import Image from "next/image";
import { ArrowRightIcon, PhoneIcon } from "./icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden bg-slate-950"
    >
      {/* Dashboard cover visual */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] lg:block">
        <Image
          src="/images/dashboard-capa.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Warm glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* Corner bracket */}
      <div className="pointer-events-none absolute left-6 top-8 hidden h-24 w-40 border-l border-t border-amber-500/30 sm:block" />

      {/* Concentric rings */}
      <svg
        className="pointer-events-none absolute bottom-16 right-10 hidden h-40 w-40 text-amber-500/30 md:block"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-20 sm:pt-28">
        <div className="flex justify-end">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Desde 1997
          </span>
        </div>

        <div className="mt-16 max-w-2xl sm:mt-24">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Cybersecurity &amp; Network Protection
            </span>
          </div>

          <h1 className="font-heading text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl">
            Firewall
            <br />
            <span className="text-cyan-400">as a Service</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Segurança perimetral inteligente, sob demanda e sem complexidade
            para a continuidade da sua operação.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="h-px w-10 bg-gradient-to-r from-amber-400 to-cyan-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110"
            >
              Solicitar orçamento
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href="tel:+556130365656"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-7 py-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-400"
            >
              <PhoneIcon className="h-4 w-4" />
              (61) 3036-5656
            </a>
          </div>
        </div>

        <p className="mt-24 max-w-md text-sm text-slate-500 sm:mt-32">
          Mais de 28 anos entregando tecnologia, segurança e infraestrutura
          para empresas em todo o Brasil.
        </p>
      </div>
    </section>
  );
}
