// VALIDAR com jurídico antes de considerar definitivo
import type { Metadata } from "next";
import Shell, { PageIntro } from "@/components/Shell";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Grupo RAM trata os dados pessoais coletados neste site, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).",
};

const direitos = [
  "Confirmação de que tratamos os seus dados.",
  "Acesso aos dados.",
  "Correção de dados incompletos, inexatos ou desatualizados.",
  "Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei.",
  "Portabilidade dos dados, nos termos da regulamentação.",
  "Eliminação dos dados tratados com base no seu consentimento.",
  "Informação sobre com quem compartilhamos os dados.",
  "Informação sobre a possibilidade de não fornecer o consentimento e sobre as consequências da recusa.",
  "Revogação do consentimento a qualquer momento.",
];

const dadosColetados = [
  "Perfil: se você é empresa ou provedor.",
  "Nome.",
  "Empresa (opcional).",
  "E-mail.",
  "Telefone ou WhatsApp (opcional).",
  "Mensagem (opcional), com o conteúdo que você escrever.",
];

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-slate-800 py-10">
      <h2 className="font-heading text-2xl font-bold text-white">{titulo}</h2>
      <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-slate-300">
        {children}
      </div>
    </section>
  );
}

function Lista({ itens }: { itens: string[] }) {
  return (
    <ul className="space-y-2">
      {itens.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacidadePage() {
  return (
    <Shell>
      <PageIntro
        accent="cyan"
        eyebrow="LGPD"
        title="Política de Privacidade"
      >
        <p>
          Este documento explica como o Grupo RAM trata os dados pessoais
          coletados neste site, em conformidade com a Lei Geral de Proteção de
          Dados Pessoais (Lei 13.709/2018).
        </p>
      </PageIntro>

      <div className="bg-slate-950 px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <Secao titulo="Quem somos">
            <p>
              O Grupo RAM, com sede em Brasília-DF, é o controlador dos dados
              pessoais coletados neste site. Para falar conosco sobre
              privacidade, use os contatos abaixo:
            </p>
            <Lista
              itens={[
                "E-mail: comercial@gruporam.com.br",
                "Telefone: (61) 3036-5656",
              ]}
            />
          </Secao>

          <Secao titulo="Dados coletados">
            <p>
              Coletamos apenas os dados que você informa no formulário de
              contato:
            </p>
            <Lista itens={dadosColetados} />
            <p>
              Não coletamos outros dados pessoais por meio do formulário.
            </p>
          </Secao>

          <Secao titulo="Finalidades">
            <p>
              Usamos os seus dados para responder ao seu contato e para enviar
              proposta comercial. Não os usamos para nenhuma outra finalidade.
            </p>
          </Secao>

          <Secao titulo="Base legal">
            <p>
              O tratamento se baseia no seu consentimento, dado ao marcar a
              caixa de concordância do formulário, e na realização de
              procedimentos preliminares relacionados a contrato, quando você
              solicita uma proposta (art. 7º, incisos I e V, da LGPD).
            </p>
          </Secao>

          <Secao titulo="Compartilhamento">
            <p>
              Não vendemos dados pessoais. Os dados do formulário passam por
              prestadores de serviço que atuam como operadores, em nome do
              Grupo RAM:
            </p>
            <Lista
              itens={[
                "Formspree, serviço de recebimento de formulários.",
                "Vercel, serviço de hospedagem do site.",
              ]}
            />
          </Secao>

          <Secao titulo="Armazenamento e prazo">
            <p>
              Mantemos os dados pelo tempo necessário ao atendimento comercial
              e ao cumprimento de obrigações legais. Depois disso, eles são
              eliminados ou anonimizados.
            </p>
          </Secao>

          <Secao titulo="Seus direitos">
            <p>
              Nos termos do art. 18 da LGPD, você pode solicitar, a qualquer
              momento:
            </p>
            <Lista itens={direitos} />
            <p>
              Para exercer qualquer desses direitos, escreva para{" "}
              <a
                href="mailto:comercial@gruporam.com.br"
                className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
              >
                comercial@gruporam.com.br
              </a>
              . Você também pode apresentar reclamação à Autoridade Nacional
              de Proteção de Dados (ANPD).
            </p>
          </Secao>

          <Secao titulo="Cookies e rastreamento">
            <p>
              Este site não usa cookies de publicidade, pixels de marketing
              nem ferramentas de rastreamento de terceiros, e não grava dados
              no armazenamento local do seu navegador.
            </p>
            <p>
              Usamos apenas a Vercel Web Analytics para medir o número de
              visitas e as páginas acessadas, de forma agregada. Esse serviço
              funciona sem cookies de rastreamento.
            </p>
          </Secao>

          <Secao titulo="Atualizações">
            <p>
              Esta política foi revisada pela última vez em 8 de outubro de
              2026. Podemos atualizá-la a qualquer momento, e a versão em vigor
              é sempre a publicada nesta página.
            </p>
          </Secao>
        </div>
      </div>
    </Shell>
  );
}
