/** Versão (data de revisão) da Política de Privacidade. Fonte única. */
export const VERSAO_POLITICA_PRIVACIDADE = "2026-10-08";

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/** Converte "AAAA-MM-DD" em "8 de outubro de 2026". */
export function dataPorExtenso(iso: string): string {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}
