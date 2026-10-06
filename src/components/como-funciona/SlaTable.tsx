import { slaRows, slaNote } from "./data";
import SectionShell from "./SectionShell";
import Txt from "./Txt";

export default function SlaTable() {
  return (
    <SectionShell
      id="sla"
      eyebrow="SLA por criticidade"
      accent="amber"
      tone="soft"
      title="Tempos de atendimento definidos por severidade."
      intro={slaNote}
    >
      <div
        role="region"
        aria-label="Tabela de SLA por severidade, role horizontalmente no celular"
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40"
      >
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">
            Primeiro atendimento e meta de contorno por severidade do chamado
          </caption>
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-[0.15em] text-amber-400">
              <th scope="col" className="px-6 py-4 font-semibold">
                Severidade
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Exemplo típico
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Primeiro atendimento
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Meta de contorno
              </th>
            </tr>
          </thead>
          <tbody>
            {slaRows.map((row) => (
              <tr
                key={row.severity}
                className="border-b border-slate-800/60 last:border-0"
              >
                <th scope="row" className="px-6 py-4 font-bold text-white">
                  {row.severity}
                </th>
                <td className="px-6 py-4 text-slate-400">{row.example}</td>
                <td className="px-6 py-4 font-semibold text-slate-200">
                  {row.first}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-200">
                  {row.workaround}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        <Txt>
          [CONFIRMAR] esta tabela vem do Contrato e do Termo de Adesão (o site
          ainda não a publicava). Validar se pode ser exibida publicamente.
        </Txt>
      </p>
    </SectionShell>
  );
}
