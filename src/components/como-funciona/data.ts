/**
 * Conteúdo da página /como-funciona.
 * Fontes: textos do site (Solutions, SecurityChecklist, PricingModel,
 * Differentials), Contrato de Firewall e Termo de Adesão FWaaS.
 * Onde não há informação, o texto leva o marcador [CONFIRMAR].
 */

export type Mode = "auto" | "human";

export const modeLabel: Record<Mode, string> = {
  auto: "Automático",
  human: "Validação humana",
};

/* ---------- 1. Comparativo ---------- */

export const aloneBullets = [
  "Regras de acesso configuradas e aplicadas de forma fixa.",
  "É um componente de segurança de rede: não substitui política de segurança, backup, antivírus nem EDR.",
];

export const managedBullets = [
  "Inspeção de tráfego em tempo real",
  "Bloqueio automatizado de ameaças",
  "Gestão centralizada de políticas",
  "Atualizações e patches contínuos",
  "Monitoramento NOC e SOC 24 horas por dia, 7 dias por semana",
];

export const aloneFlow = ["Tráfego", "Regra fixa", "Permite ou bloqueia"];

export const managedFlow = [
  { label: "Detecta", detail: "Inspeção de tráfego em tempo real" },
  { label: "Classifica", detail: "Chamados por severidade, de P1 a P4" },
  { label: "Age", detail: "Bloqueio automatizado de ameaças" },
  { label: "Escala", detail: "Equipe NOC e SOC" },
];

/* ---------- 2. Mapa da operação ---------- */

export type MapNodeId = "firewall" | "endpoints" | "dr" | "noc";

export type MapNode = {
  id: MapNodeId;
  label: string;
  mode: Mode;
  cx: number;
  cy: number;
  summary: string;
  points: string[];
  note?: string;
};

export const hubInfo = {
  label: "FWaaS",
  summary:
    "O Firewall as a Service do Grupo RAM entrega segurança avançada com flexibilidade entre nuvem e ambiente físico, adaptando-se ao porte e à necessidade de cada operação.",
  points: [
    "Gestão centralizada de políticas",
    "Relatórios de uso e conformidade",
    "Suporte técnico especializado",
  ],
};

export const mapNodes: MapNode[] = [
  {
    id: "firewall",
    label: "Firewall Físico / Cloud",
    mode: "auto",
    cx: 150,
    cy: 80,
    summary:
      "Appliance dedicado ou solução hospedada em nuvem, conforme a necessidade da operação.",
    points: [
      "Inspeção de tráfego em tempo real",
      "Bloqueio automatizado de ameaças",
      "Alta disponibilidade e redundância",
    ],
    note: "Alterações críticas de configuração só são executadas com solicitação formal, chamado e validação técnica.",
  },
  {
    id: "endpoints",
    label: "Endpoints",
    mode: "auto",
    cx: 650,
    cy: 80,
    summary:
      "Camada adicional de defesa para estações de trabalho, servidores e dispositivos móveis.",
    points: [],
    note: "[CONFIRMAR] quais ações em endpoints são automáticas e quais exigem validação humana.",
  },
  {
    id: "dr",
    label: "Disaster Recovery",
    mode: "human",
    cx: 150,
    cy: 380,
    summary:
      "Continuidade de negócio garantida com planos de contingência e recuperação após incidentes.",
    points: [],
    note: "[CONFIRMAR] etapas automáticas e etapas que exigem validação humana na recuperação.",
  },
  {
    id: "noc",
    label: "NOC / SOC",
    mode: "human",
    cx: 650,
    cy: 380,
    summary:
      "Equipe especializada acompanhando a rede 24 horas por dia, 7 dias por semana.",
    points: [
      "Chamados classificados por severidade, de P1 a P4",
      "Suporte técnico especializado",
    ],
  },
];

/* ---------- 3. Jornada: ver lib/scenarios.ts e IncidentSimulator.tsx ---------- */

/* ---------- 4. Controle ---------- */

export const controlCards = [
  {
    title: "Mudanças com validação",
    description:
      "Alterações críticas de configuração só são executadas com solicitação formal, registro de chamado, validação técnica e, quando necessário, janela de manutenção previamente aprovada.",
  },
  {
    title: "Chamados por severidade",
    description:
      "O atendimento segue uma matriz de severidade, de P1 a P4, contada a partir da abertura formal do chamado.",
  },
  {
    title: "Responsabilidades definidas",
    description:
      "Contrato e Termo de Adesão delimitam o que cabe ao Grupo RAM e ao cliente, como links de internet, energia e infraestrutura local.",
  },
  {
    title: "Dados e LGPD",
    description:
      "O contrato prevê o cumprimento da Lei nº 13.709/2018, com regras para logs, acesso remoto, confidencialidade e credenciais.",
  },
];

/* ---------- 5. SLA (Contrato e Termo de Adesão) ---------- */

export const slaRows = [
  {
    severity: "Crítica (P1)",
    example: "Firewall inoperante, rede fora do ar",
    first: "Até 1 hora",
    workaround: "Até 4 horas",
  },
  {
    severity: "Alta (P2)",
    example: "VPN essencial fora do ar, regra crítica bloqueando operação",
    first: "Até 4 horas",
    workaround: "Até 8 horas",
  },
  {
    severity: "Média (P3)",
    example: "Ajuste de regra, instabilidade localizada",
    first: "Até 8h úteis",
    workaround: "Até 24h úteis",
  },
  {
    severity: "Baixa (P4)",
    example: "Nova regra não urgente, dúvida, ajuste fino",
    first: "Até 24h úteis",
    workaround: "Até 48h úteis",
  },
];

export const slaNote =
  "Os prazos são metas operacionais, contadas a partir da abertura formal do chamado. Podem ser impactados por fatores fora do controle do Grupo RAM, como links, energia, fornecedores e aprovações do cliente.";
