import { Eyebrow } from "./ui";

const provas = [
  {
    valor: "~70",
    texto: "lojas de uma rede de farmácias interligadas e vigiadas pela plataforma",
  },
  {
    valor: "42",
    texto: "lojas com roteadores antigos colocadas na plataforma em lote",
  },
  {
    valor: "1.000+",
    texto: "regras de proxy importadas, com as lojas navegando",
  },
  {
    valor: "90 dias",
    texto: "de histórico de qualidade dos links no painel de cada firewall",
  },
];

export default function Provas() {
  return (
    <section className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Eyebrow accent="amber">Em produção, em clientes reais</Eyebrow>
        <h2 className="font-heading max-w-3xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Não é promessa. Já está rodando.
        </h2>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 sm:grid-cols-2 lg:grid-cols-4">
          {provas.map((p) => (
            <div key={p.valor} className="bg-slate-950 p-8">
              <dt className="font-heading text-4xl font-extrabold text-amber-400">
                {p.valor}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-slate-300">
                {p.texto}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
