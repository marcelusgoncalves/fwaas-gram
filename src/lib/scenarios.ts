export type Ator = "auto" | "humano";

export type NodeId =
  | "internet"
  | "linkP"
  | "linkC"
  | "fwaas"
  | "servidores"
  | "estacoes"
  | "filial";

export interface Evento {
  /** Segundos da animação (não representam tempo real de atendimento). */
  t: number;
  etapa: 0 | 1 | 2 | 3;
  ator: Ator;
  texto: string;
}

export interface Cenario {
  id: "queda-link" | "origem-maliciosa" | "lista-negra" | "filial";
  nome: string;
  eventos: Evento[];
}

export const ETAPAS = [
  { titulo: "Detecção", tipo: "Automático" },
  { titulo: "Ação automática", tipo: "Automático" },
  { titulo: "Escalonamento humano", tipo: "Validação humana" },
  { titulo: "Retorno ao cliente", tipo: "Validação humana" },
] as const;

export const NODES: Record<
  NodeId,
  { x: number; y: number; label: string; w: number; h: number }
> = {
  internet: { x: 62, y: 160, label: "Internet", w: 84, h: 38 },
  linkP: { x: 190, y: 98, label: "Link principal", w: 104, h: 34 },
  linkC: { x: 190, y: 222, label: "Link reserva", w: 116, h: 34 },
  fwaas: { x: 330, y: 160, label: "FWaaS", w: 104, h: 62 },
  servidores: { x: 524, y: 72, label: "Servidores", w: 96, h: 36 },
  estacoes: { x: 524, y: 160, label: "Estações", w: 96, h: 36 },
  filial: { x: 524, y: 248, label: "Filial", w: 96, h: 36 },
};

export const DURACAO = 15;

export const CENARIOS: Cenario[] = [
  {
    id: "queda-link",
    nome: "Queda de link",
    eventos: [
      {
        t: 1,
        etapa: 0,
        ator: "auto",
        texto:
          "O próprio roteador testa cada link a cada 10 segundos e detecta a falha do link principal, inclusive com o modem ligado e sem internet.",
      },
      {
        t: 4,
        etapa: 1,
        ator: "auto",
        texto:
          "Após duas falhas seguidas, o tráfego passa ao link reserva em cerca de 30 segundos, e o alerta chega no WhatsApp em menos de 2 minutos.",
      },
      {
        t: 8,
        etapa: 2,
        ator: "humano",
        // VALIDAR: confirmar com a diretoria que o NOC/SOC 24x7 é entregue como serviço antes de ir para produção
        texto:
          "A equipe NOC e SOC acompanha o evento e abre chamado por severidade (P1 a P4).",
      },
      {
        t: 12,
        etapa: 3,
        ator: "humano",
        texto:
          "O cliente recebe a atualização. Quando o link principal normaliza, o tráfego volta sozinho e uma nova mensagem avisa.",
      },
    ],
  },
  {
    id: "origem-maliciosa",
    nome: "Origem maliciosa",
    eventos: [
      {
        t: 1,
        etapa: 0,
        ator: "auto",
        texto:
          "A lista de reputação, com servidores de botnet e comando-e-controle atualizada a cada 6 horas, identifica uma origem maliciosa tentando acessar a rede.",
      },
      {
        t: 4,
        etapa: 1,
        ator: "auto",
        texto:
          "O firewall barra a origem. O bloqueio começa em observação e passa a bloquear com um clique, com relatório.",
      },
      {
        t: 8,
        etapa: 2,
        ator: "humano",
        texto:
          "A equipe NOC e SOC acompanha o evento e abre chamado por severidade (P1 a P4).",
      },
      {
        t: 12,
        etapa: 3,
        ator: "humano",
        texto:
          "O cliente recebe o relatório do bloqueio e o retorno da equipe.",
      },
    ],
  },
  {
    id: "lista-negra",
    nome: "IP da empresa em lista negra",
    eventos: [
      {
        t: 1,
        etapa: 0,
        ator: "auto",
        texto:
          "A plataforma checa o IP público da empresa de hora em hora em 8 listas e encontra o endereço listado, com o motivo e a data do incidente.",
      },
      {
        t: 4,
        etapa: 1,
        ator: "auto",
        texto:
          "Um aviso é enviado no WhatsApp para os destinatários configurados.",
      },
      {
        t: 8,
        etapa: 2,
        ator: "humano",
        texto:
          "A equipe NOC e SOC acompanha o evento e abre chamado por severidade (P1 a P4).",
      },
      {
        t: 12,
        etapa: 3,
        ator: "humano",
        texto:
          "O cliente recebe a orientação e acompanha o card de reputação dos IPs públicos no painel.",
      },
    ],
  },
  {
    id: "filial",
    nome: "Filial desconectada",
    eventos: [
      {
        t: 1,
        etapa: 0,
        ator: "auto",
        texto:
          "O vigia mede cada filial a cada minuto e detecta que uma delas deixou de responder.",
      },
      {
        t: 4,
        etapa: 1,
        ator: "auto",
        texto:
          "O túnel parado é renegociado sozinho, a VPN reserva da filial assume se a principal caiu, e um aviso sai no WhatsApp.",
      },
      {
        t: 8,
        etapa: 2,
        ator: "humano",
        texto:
          "A equipe NOC e SOC acompanha a queda, com a causa provável, e abre chamado por severidade (P1 a P4).",
      },
      {
        t: 12,
        etapa: 3,
        ator: "humano",
        texto:
          "A filial volta ao ar e o cliente recebe a atualização, com a disponibilidade da loja no histórico.",
      },
    ],
  },
];
