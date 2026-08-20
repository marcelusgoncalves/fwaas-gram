import ContactForm from "./ContactForm";
import Logo from "./Logo";
import { MailIcon, PhoneIcon } from "./icons";

export default function CTA() {
  return (
    <section
      id="contato"
      className="relative scroll-mt-20 overflow-hidden bg-slate-950 py-28 px-6"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center opacity-80">
          <Logo />
        </div>

        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-5xl">
          Vamos proteger a sua operação?
        </h2>
        <p className="mt-6 text-lg text-slate-400">
          Fale com nossa equipe comercial e receba uma proposta de Firewall
          as a Service sob medida para a sua empresa.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8">
          <ContactForm />
        </div>

        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-slate-500">
          Ou fale direto com a gente
        </p>

        <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="tel:+556130365656"
            className="flex flex-1 items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-left transition hover:border-amber-500/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-500/40 text-amber-400">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-widest text-slate-500">
                Telefone
              </span>
              <span className="block font-bold text-white">
                (61) 3036-5656
              </span>
            </span>
          </a>

          <a
            href="mailto:comercial@gruporam.com.br"
            className="flex flex-1 items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-left transition hover:border-cyan-500/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 text-cyan-400">
              <MailIcon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-widest text-slate-500">
                E-mail
              </span>
              <span className="block font-bold text-white">
                comercial@gruporam.com.br
              </span>
            </span>
          </a>
        </div>

        <p className="mt-14 text-sm font-semibold text-white">
          Experiência que evolui,{" "}
          <span className="text-cyan-400">soluções que entregam.</span>
        </p>
      </div>
    </section>
  );
}
