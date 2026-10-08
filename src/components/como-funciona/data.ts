/**
 * Conteúdo da página /como-funciona.
 * Fontes: roteiro e módulos do Firewall Grupo RAM, Contrato de Firewall e
 * Termo de Adesão FWaaS.
 */

export type Mode = "auto" | "human";

export const modeLabel: Record<Mode, string> = {
  auto: "Automático",
  human: "Validação humana",
};

/* ---------- 1. Comparativo ---------- */

export const aloneBullets = [
  "Regras de acesso configuradas e aplicadas de forma fixa.",
  "É um componente de segurança de rede: não substitui a política de segurança da empresa.",
];

export const managedBullets = [
  "Bloqueio de origens maliciosas por lista de reputação",
  "Filtro de conteúdo por categoria e por aplicativo",
  "Redundância de links com troca automática",
  "Alertas no WhatsApp quando algo cai e quando volta",
  "Gestão centralizada de políticas",
  "Atualizações e patches contínuos",
  "Monitoramento NOC e SOC 24 horas por dia, 7 dias por semana",
];

export const aloneFlow = ["Tráfego", "Regra fixa", "Permite ou bloqueia"];

export const managedFlow = [
  { label: "Detecta", detail: "Testes dos links e vigilância do IP da empresa" },
  { label: "Classifica", detail: "Chamados por severidade, de P1 a P4" },
  { label: "Age", detail: "Troca de link e bloqueio por reputação" },
  { label: "Escala", detail: "Equipe NOC e SOC" },
];

/* ---------- 2. Mapa da operação ---------- */

export type MapNodeId =
  | "firewall"
  | "links"
  | "alertas"
  | "vpn"
  | "wifi"
  | "noc";

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
    "Plataforma de firewall gerenciado, multi-cliente, sobre roteadores MikroTik, administrada inteira por um painel web.",
  points: [
    "Gestão centralizada de políticas",
    "Painel da frota e histórico de até 90 dias",
    "Permissões por usuário e por módulo",
  ],
};

export const mapNodes: MapNode[] = [
  {
    id: "firewall",
    label: "Firewall MikroTik",
    mode: "auto",
    cx: 150,
    cy: 70,
    summary:
      "O roteador MikroTik do cliente vira um firewall gerenciado, com o mesmo padrão de proteção aplicado pela plataforma.",
    points: [
      "Bloqueio de origens maliciosas por lista de reputação",
      "Filtro de conteúdo por categoria e por aplicativo",
      "Vigilância do IP da empresa em listas negras",
    ],
    note: "O bloqueio é por lista de reputação e não inspeciona o conteúdo do tráfego. Alterações críticas de configuração só são executadas com solicitação formal, chamado e validação técnica.",
  },
  {
    id: "links",
    label: "Links e redundância",
    mode: "auto",
    cx: 150,
    cy: 230,
    summary:
      "Até 4 links por firewall, com troca automática para o reserva em cerca de 30 segundos e volta sozinha quando o principal normaliza.",
    points: [
      "Qualidade de cada link medida a cada 10 segundos",
      "Tornar principal com um clique",
      "SD-WAN e QoS por tipo de tráfego (RouterOS v7)",
    ],
  },
  {
    id: "alertas",
    label: "Alertas no WhatsApp",
    mode: "auto",
    cx: 150,
    cy: 390,
    summary:
      "Mensagens enviadas por servidor próprio da plataforma quando o firewall, um link ou uma filial cai, e quando volta.",
    points: [
      "Aviso em menos de 2 minutos",
      "Telefones ou grupos como destinatários",
      "Anti-spam: quedas simultâneas viram um resumo",
    ],
  },
  {
    id: "vpn",
    label: "VPN e filiais",
    mode: "auto",
    cx: 650,
    cy: 70,
    summary:
      "Filiais ligadas à matriz como se estivessem no mesmo prédio, e VPN por usuário para o trabalho remoto.",
    points: [
      "Vigia de cada filial a cada minuto, com reconexão automática",
      "VPN por usuário com QR code e histórico de conexões",
    ],
  },
  {
    id: "wifi",
    label: "Wi-Fi de visitantes",
    mode: "auto",
    cx: 650,
    cy: 230,
    summary:
      "Portal com a marca da loja, cadastro com WhatsApp confirmado e relatórios de visitantes, dentro da LGPD.",
    points: [
      "Rede de visitantes separada da rede da empresa",
      "Venda de acesso por Pix direto na conta da loja",
    ],
  },
  {
    id: "noc",
    label: "NOC / SOC",
    mode: "human",
    cx: 650,
    cy: 390,
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
