export type Ator = "auto" | "humano";

export type NodeId =
  | "internet"
  | "linkP"
  | "linkC"
  | "fwaas"
  | "servidores"
  | "estacoes"
  | "dr";

export interface Evento {
  /** Segundos da animação (não representam tempo real de atendimento). */
  t: number;
  etapa: 0 | 1 | 2 | 3;
  ator: Ator;
  texto: string;
}

export interface Cenario {
  id: "intrusao" | "queda-link" | "endpoint" | "backup";
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
  linkC: { x: 190, y: 222, label: "Link contingência", w: 116, h: 34 },
  fwaas: { x: 330, y: 160, label: "FWaaS", w: 104, h: 62 },
  servidores: { x: 524, y: 72, label: "Servidores", w: 96, h: 36 },
  estacoes: { x: 524, y: 160, label: "Estações", w: 96, h: 36 },
  dr: { x: 524, y: 248, label: "Backup / DR", w: 96, h: 36 },
};

export const DURACAO = 15;

export const CENARIOS: Cenario[] = [
  {
    id: "intrusao",
    nome: "Intrusão",
    eventos: [
      {
        t: 1,
        etapa: 0,
        ator: "auto",
        texto: "A inspeção de tráfego em tempo real identifica comportamento suspeito.",
      },
      {
        t: 4,
        etapa: 1,
        ator: "auto",
        texto: "Bloqueio automatizado da ameaça no firewall.",
      },
      {
        t: 8,
        etapa: 2,
        ator: "humano",
        texto:
          "A equipe NOC e SOC acompanha o evento e abre chamado por severidade (P1 a P4). [CONFIRMAR] critério de escalonamento e severidade aplicada.",
      },
      {
        t: 12,
        etapa: 3,
        ator: "humano",
        texto:
          "O cliente recebe relatório e suporte técnico especializado. [CONFIRMAR] formato e prazo do retorno do incidente.",
      },
    ],
  },
  {
    id: "queda-link",
    nome: "Queda de link",
    eventos: [
      {
        t: 1,
        etapa: 0,
        ator: "auto",
        texto:
          "O monitoramento do NOC identifica a indisponibilidade do link principal. [CONFIRMAR] método de detecção.",
      },
      {
        t: 4,
        etapa: 1,
        ator: "auto",
        texto:
          "O tráfego passa a seguir pelo link de contingência. [CONFIRMAR] se o serviço inclui failover automático.",
      },
      {
        t: 8,
        etapa: 2,
        ator: "humano",
        texto:
          "A equipe NOC acompanha o incidente e abre chamado por severidade (P1 a P4). [CONFIRMAR] critério de escalonamento e severidade aplicada.",
      },
      {
        t: 12,
        etapa: 3,
        ator: "humano",
        texto:
          "O cliente recebe atualização e suporte técnico especializado. [CONFIRMAR] formato e prazo do retorno do incidente.",
      },
    ],
  },
  {
    id: "endpoint",
    nome: "Endpoint infectado",
    eventos: [
      {
        t: 1,
        etapa: 0,
        ator: "auto",
        texto:
          "A proteção de endpoints identifica comportamento anômalo em uma estação.",
      },
      {
        t: 4,
        etapa: 1,
        ator: "auto",
        texto:
          "O tráfego malicioso é bloqueado no firewall e a estação é isolada. [CONFIRMAR] se o isolamento é automático ou assistido.",
      },
      {
        t: 8,
        etapa: 2,
        ator: "humano",
        texto:
          "A equipe NOC e SOC analisa o evento e abre chamado por severidade (P1 a P4). [CONFIRMAR] critério de escalonamento e severidade aplicada.",
      },
      {
        t: 12,
        etapa: 3,
        ator: "humano",
        texto:
          "O cliente recebe relatório e suporte técnico especializado. [CONFIRMAR] formato e prazo do retorno do incidente.",
      },
    ],
  },
  {
    id: "backup",
    nome: "Falha de backup",
    eventos: [
      {
        t: 1,
        etapa: 0,
        ator: "auto",
        texto:
          "O monitoramento identifica falha na rotina de backup. [CONFIRMAR] como a falha é detectada.",
      },
      {
        t: 4,
        etapa: 1,
        ator: "auto",
        texto:
          "O Disaster Recovery assume a proteção dos dados. [CONFIRMAR] procedimento de recuperação e metas de tempo.",
      },
      {
        t: 8,
        etapa: 2,
        ator: "humano",
        texto:
          "A equipe NOC acompanha a recuperação e abre chamado por severidade (P1 a P4). [CONFIRMAR] critério de escalonamento e severidade aplicada.",
      },
      {
        t: 12,
        etapa: 3,
        ator: "humano",
        texto:
          "O cliente recebe relatório e suporte técnico especializado. [CONFIRMAR] formato e prazo do retorno do incidente.",
      },
    ],
  },
];
