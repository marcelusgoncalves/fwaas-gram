import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-slate-500">
              Desde 1997 entregando tecnologia, segurança e infraestrutura
              em Brasília-DF.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Plataforma</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/empresas" className="transition hover:text-cyan-400">
                  Para empresas
                </Link>
              </li>
              <li>
                <Link href="/provedores" className="transition hover:text-cyan-400">
                  Para provedores
                </Link>
              </li>
              <li>
                <Link href="/modulos" className="transition hover:text-cyan-400">
                  Módulos
                </Link>
              </li>
              <li>
                <Link href="/demonstracao" className="transition hover:text-cyan-400">
                  Demonstração
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Contato</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:comercial@gruporam.com.br"
                  className="transition hover:text-cyan-400"
                >
                  comercial@gruporam.com.br
                </a>
              </li>
              <li>
                <a href="tel:+556130365656" className="transition hover:text-cyan-400">
                  (61) 3036-5656
                </a>
              </li>
              <li>
                <Link href="/contato" className="transition hover:text-cyan-400">
                  Solicitar proposta
                </Link>
              </li>
              <li>Brasília, DF - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Grupo RAM. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
