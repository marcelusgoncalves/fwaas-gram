import type { Metadata } from "next";
import Link from "next/link";
import Shell, { PageIntro } from "@/components/Shell";
import { primaryButtonClass, ghostButtonClass } from "@/components/ui";

export const metadata: Metadata = {
  title: "Para provedores e integradores",
  description:
    "Ofereça firewall gerenciado com a sua marca, no seu endereço, com cada cliente vendo só a própria rede. Adoção de redes existentes sem derrubar.",
};

const itens = [
  {
    titulo: "Marca própria",
    texto:
      "Nome, logo, favicon, cores, e-mail e telefone de suporte. O Wi-Fi de visitantes também sai com a sua marca.",
  },
  {
    titulo: "Endereço próprio",
    texto:
      "Subdomínio automático ou o domínio do parceiro, com certificado automático.",
  },
  {
    titulo: "Hierarquia de acesso",
    texto:
      "O parceiro vê todos os seus clientes. Cada cliente vê só o dele. Permissões por usuário e por módulo.",
  },
  {
    titulo: "Adoção de redes existentes",
    texto:
      "Inventário do que já está configurado e adoção aos poucos, sem derrubar a rede e sem trocar o equipamento.",
  },
  {
    titulo: "Contrato digital",
    texto: "Aceite do contrato dentro da plataforma, com versão, data e IP.",
  },
  {
    titulo: "Planos e fatura estimada",
    texto:
      "Planos e módulos com fatura estimada pelo uso real de cada cliente.",
  },
  {
    titulo: "MikroTik novo e antigo",
    texto:
      "Roteadores com RouterOS v7 e v6 entram na plataforma. Alguns módulos exigem v7, e cada página de módulo mostra os limites.",
  },
  {
    titulo: "Nada para instalar",
    texto:
      "SaaS puro: a plataforma inteira já está pronta para você oferecer ao seu cliente.",
  },
];

export default function ProvedoresPage() {
  return (
    <Shell>
      <PageIntro
        accent="cyan"
        eyebrow="Para provedores e integradores"
        title="Firewall gerenciado com a sua marca, sem desenvolver nada."
      >
        <p>
          Você cuida da rede de vários clientes (farmácias, escritórios,
          clínicas, redes de lojas) em um painel só, e cada cliente acompanha
          apenas a rede dele.
        </p>
      </PageIntro>

      <section className="bg-slate-900/30 px-6 py-20">
        <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {itens.map((item) => (
            <li
              key={item.titulo}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7"
            >
              <h2 className="font-heading text-lg font-bold text-white">
                {item.titulo}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {item.texto}
              </p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-6xl text-sm text-slate-400">
          Veja os detalhes em{" "}
          <Link
            href="/modulos/para-o-parceiro-que-revende"
            className="text-cyan-400 underline underline-offset-4"
          >
            Para o parceiro que revende
          </Link>{" "}
          e{" "}
          <Link
            href="/modulos/adocao-e-implantacao"
            className="text-cyan-400 underline underline-offset-4"
          >
            Adoção e implantação
          </Link>
          .
        </p>
      </section>

      <section className="bg-slate-950 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Vamos montar a proposta para a sua carteira de clientes?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contato?perfil=provedor"
              className={primaryButtonClass}
            >
              Solicitar proposta para provedores
            </Link>
            <Link href="/demonstracao" className={ghostButtonClass}>
              Ver a demonstração
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
