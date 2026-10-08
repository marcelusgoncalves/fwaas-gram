import type { Metadata } from "next";
import Link from "next/link";
import Shell, { PageIntro } from "@/components/Shell";
import Dashboard from "@/components/Dashboard";
import { primaryButtonClass, ghostButtonClass } from "@/components/ui";
import { getModulo } from "@/lib/modulos";

export const metadata: Metadata = {
  title: "Para empresas",
  description:
    "Internet que não cai, alertas no WhatsApp, controle de navegação, VPN, filiais e Wi-Fi de visitantes, em um painel que você acompanha pelo celular.",
};

const areas = [
  {
    titulo: "Internet que não cai",
    dores: [
      "“A internet cai e a loja para”",
      "“O sistema do banco só funciona num link”",
    ],
    texto:
      "Até 4 links no mesmo firewall, com troca automática em segundos quando um cai e volta sozinha quando ele normaliza.",
    modulos: ["redundancia-de-links-e-sd-wan"],
  },
  {
    titulo: "Monitoramento e alertas",
    dores: [
      "“Só descubro que caiu quando o cliente reclama”",
      "“A operadora diz que o link está ótimo”",
    ],
    texto:
      "Uma tela com a rede inteira e alertas no WhatsApp quando o firewall, um link ou uma filial cai, e quando volta.",
    modulos: ["painel-e-monitoramento", "alertas-no-whatsapp"],
  },
  {
    titulo: "Controle de navegação",
    dores: [
      "“Funcionário fica em rede social e site impróprio”",
      "“Tenho medo de vírus e invasão”",
    ],
    texto:
      "Bloqueio por categoria e por aplicativo, relatório de acesso por computador e bloqueio automático de endereços maliciosos.",
    modulos: [
      "filtro-de-conteudo",
      "relatorio-de-acesso",
      "firewall-gerenciado-e-seguranca",
    ],
  },
  {
    titulo: "VPN e filiais",
    dores: [
      "“Preciso que as filiais acessem o sistema da matriz”",
      "“Quero trabalhar de casa com segurança”",
    ],
    texto:
      "Interligação matriz-filial criada pelo painel, com vigia que reconecta sozinha, e VPN por usuário com QR code no celular.",
    modulos: ["interligacao-de-filiais", "vpn-de-trabalho-remoto"],
  },
  {
    titulo: "Wi-Fi de visitantes",
    dores: [
      "“Quero Wi-Fi para clientes sem expor minha rede”",
      "“Quero ganhar dinheiro com o Wi-Fi”",
    ],
    texto:
      "Portal com a marca da loja, cadastro com WhatsApp confirmado, LGPD, relatórios de visitantes e venda de acesso por Pix direto na sua conta.",
    modulos: ["wi-fi-de-visitantes"],
  },
];

export default function EmpresasPage() {
  return (
    <Shell>
      <PageIntro
        eyebrow="Para sua empresa"
        title="Uma rede que você acompanha sem depender de ninguém."
      >
        <p>
          O roteador MikroTik da sua empresa vira um firewall gerenciado,
          administrado por um painel web. Sem trocar equipamento e sem visita
          técnica.
        </p>
      </PageIntro>

      <section className="bg-slate-900/30 px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          {areas.map((area) => (
            <article
              key={area.titulo}
              className="grid gap-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 lg:grid-cols-[1fr_1.2fr]"
            >
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  {area.titulo}
                </h2>
                <ul className="mt-4 space-y-2 text-slate-400">
                  {area.dores.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[17px] leading-relaxed text-slate-300">
                  {area.texto}
                </p>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {area.modulos.map((slug) => {
                    const m = getModulo(slug);
                    return (
                      m && (
                        <li key={slug}>
                          <Link
                            href={`/modulos/${slug}`}
                            className="inline-block rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:border-cyan-500/50 hover:text-cyan-300"
                          >
                            {m.titulo}
                          </Link>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Dashboard />

      <section className="bg-slate-900/30 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Investimento sob consulta
          </p>
          <h2 className="font-heading mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Conte como é a sua rede e receba uma proposta.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contato?perfil=empresa" className={primaryButtonClass}>
              Solicitar proposta
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
