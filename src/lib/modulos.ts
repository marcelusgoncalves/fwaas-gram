export type Modulo = {
  slug: string;
  numero: number;
  titulo: string;
  area: string;
  oQueE: string;
  dor: string;
  como: string[];
  diferenciais: string[];
  requisitos: string[];
  perguntas: { pergunta: string; resposta: string }[];
};

export const modulos: Modulo[] = [
  {
    slug: "painel-e-monitoramento",
    numero: 1,
    titulo: "Painel e monitoramento",
    area: "Monitoramento e alertas",
    oQueE:
      "Uma tela mostra a rede inteira do cliente agora: cada firewall, cada link de internet, a qualidade de cada um e o histórico dos últimos 90 dias.",
    dor: "“Só sei que a rede está ruim quando alguém reclama” e “a operadora diz que o link está ótimo”.",
    como: [
      "A plataforma consulta cada firewall a cada 60 segundos pela VPN de gerência.",
      "Painel da frota (para o provedor): disponibilidade de todos os firewalls, trocas de link recentes, alertas por tipo e problemas do Zabbix.",
      "Painel do firewall: CPU, memória, link em uso, última troca, aparelhos conectados, usuários de VPN e Wi-Fi, com períodos de hoje, ontem, 7, 30 ou até 90 dias.",
      "Qualidade de cada link: o próprio roteador testa cada link a cada 10 segundos (latência, oscilação e perda) e classifica como Bom, Degradado ou Crítico. A disponibilidade do mês sai em tabela e CSV, guardada por 400 dias.",
      "Teste de velocidade de cada link, feito pelo próprio roteador contra um servidor no Brasil, em cerca de 25 segundos.",
      "Zabbix dentro do painel: gráficos do Zabbix na aba Monitoramento de cada cliente. Firewall novo entra no Zabbix sozinho.",
      "Painel do cliente final: ele vê só a rede dele, com os indicadores de proteção do dia.",
    ],
    diferenciais: [
      "Mede a qualidade do lado do cliente, não da operadora: é prova para cobrar a operadora.",
      "Detecta link “ligado mas sem internet”, que um ping no gateway não pega.",
      "Em produção: dezenas de firewalls e links medidos continuamente, com testes de quase 500 Mb/s.",
    ],
    requisitos: [
      "Teste de velocidade só em RouterOS v7.",
      "Roteadores pequenos (hEX) limitam a medição perto de 400 Mb/s.",
      "Em RouterOS v6 a qualidade do link mede perda e latência, sem oscilação.",
    ],
    perguntas: [
      {
        pergunta: "Consigo provar para a operadora que o link caiu?",
        resposta:
          "Sim: histórico por link com horário, perda e latência, exportado em CSV.",
      },
      {
        pergunta: "Meu cliente vê isso?",
        resposta: "Vê o painel da rede dele, sem acesso aos outros clientes.",
      },
    ],
  },
  {
    slug: "alertas-no-whatsapp",
    numero: 2,
    titulo: "Alertas no WhatsApp",
    area: "Monitoramento e alertas",
    oQueE:
      "Quando algo cai, a pessoa certa fica sabendo no WhatsApp em menos de 2 minutos, antes do cliente ligar, e recebe outra mensagem quando volta.",
    dor: "“Fico sabendo do problema pelo cliente irritado.”",
    como: [
      "As mensagens são enviadas por servidor próprio da plataforma.",
      "Eventos (aviso de problema e de volta): firewall offline, link caiu, troca para o reserva, link degradado, filial desconectada ou degradada, problema do Zabbix e IP da empresa em lista negra.",
      "Destinatários: telefones ou grupos de WhatsApp, por provedor, cliente ou firewall, cada um com os eventos que quer receber.",
      "Mensagem clara: cliente, firewall, o que aconteceu, horário de Brasília e link para o painel.",
      "Anti-spam embutido: “offline” só é enviado se o firewall continuar fora após 90 segundos. Queda de link precisa de duas confirmações. Link degradado exige 5 medições ruins seguidas e no máximo um aviso a cada 30 minutos.",
      "Muitas quedas ao mesmo tempo viram uma mensagem de resumo. Quem não quer mais receber responde SAIR.",
    ],
    diferenciais: [
      "WhatsApp, não e-mail: é onde o técnico e o dono da empresa olham.",
      "Pode avisar o próprio cliente final, não só o provedor.",
      "O primeiro teste chegou em 20 segundos, e a vigilância de lista negra já disparou alertas reais.",
    ],
    requisitos: [
      "Precisa de um número de WhatsApp dedicado conectado ao painel.",
      "Não há alerta por e-mail hoje, só WhatsApp.",
      "Ainda sem horário de silêncio, janela de manutenção ou escalonamento.",
    ],
    perguntas: [
      {
        pergunta: "Vou receber 50 mensagens se a energia cair?",
        resposta:
          "Não: quedas simultâneas viram um resumo, e quedas rápidas nem disparam.",
      },
      {
        pergunta: "Posso mandar num grupo da equipe?",
        resposta: "Sim, grupos de WhatsApp são destinatários.",
      },
    ],
  },
  {
    slug: "redundancia-de-links-e-sd-wan",
    numero: 3,
    titulo: "Redundância de links e SD-WAN",
    area: "Internet que não cai",
    oQueE:
      "Com dois ou mais links, a internet troca sozinha para o reserva em cerca de 30 segundos quando o principal falha, e volta quando ele normaliza, sem ninguém mexer.",
    dor: "“A internet caiu e a loja parou” e “o sistema do banco só funciona num link”.",
    como: [
      "Até 4 links por firewall: fibra, rádio, 4G, IP fixo ou PPPoE. A tela mostra qual está em uso agora.",
      "Troca automática: cada link testa a própria internet a cada 10 segundos. Duas falhas e o tráfego vai para o próximo. Pega também o modem “ligado mas sem internet”.",
      "“Tornar principal”: um clique define o link preferido, na hora.",
      "Acesso remoto acompanha o link ativo: o endereço de acesso ao firewall se atualiza sozinho na troca.",
      "SD-WAN por tipo de tráfego: VoIP, chamadas de vídeo, sistemas críticos e backup, cada um com link preferido e limites de qualidade. Se o link piora, a classe muda em até 15 segundos e volta após 5 minutos bom.",
      "Prioridade de tráfego (QoS): a chamada não trava quando alguém faz um download grande.",
      "IP de saída fixo por serviço: banco e sistema que só aceitam um IP saem sempre pelo IP certo.",
    ],
    diferenciais: [
      "A decisão é do próprio roteador: funciona mesmo sem a plataforma.",
      "No piloto, trocou de link em menos de 45 segundos sem perder pacote e voltou sozinho.",
      "Caso real: o app de banco de uma rede de farmácias voltou a funcionar com o IP de saída por classe.",
    ],
    requisitos: [
      "Pelo menos dois links.",
      "SD-WAN e QoS só em RouterOS v7.",
      "Não soma a banda dos links: usa um por vez por tipo de tráfego.",
      "QoS completo em hEX: recomendado até cerca de 250 Mb/s por link.",
    ],
    perguntas: [
      {
        pergunta: "Na troca, as ligações caem?",
        resposta:
          "A troca leva cerca de 30 segundos. Conexões abertas podem reconectar, mas a rede segue funcionando.",
      },
      {
        pergunta: "Consigo somar dois links de 100 em 200?",
        resposta: "Não hoje: cada tipo de tráfego usa um link por vez.",
      },
    ],
  },
  {
    slug: "firewall-gerenciado-e-seguranca",
    numero: 4,
    titulo: "Firewall gerenciado e segurança",
    area: "Segurança",
    oQueE:
      "Todo cliente recebe o mesmo padrão de proteção, aplicado e mantido pela plataforma, com bloqueio de endereços maliciosos e vigilância do IP da empresa em listas negras.",
    dor: "“Cada técnico configura de um jeito”, “tenho medo de invasão” e “meus e-mails pararam de chegar”.",
    como: [
      "Padrão de proteção homologado: aplicado na ativação, fecha serviços perigosos, bloqueia consultas de fora à rede interna e mantém o acesso de gerência protegido.",
      "Regras e redirecionamentos de porta pelo painel: a plataforma aplica e corrige diferenças sozinha, sem mexer nas regras manuais do cliente.",
      "Bloqueio de origens maliciosas (IDS): listas de servidores de botnet e comando-e-controle, atualizadas a cada 6 horas. Começa em observação e passa a bloquear com um clique, com desligamento imediato e relatório.",
      "IP da empresa em lista negra: checagem de hora em hora em 8 listas (Spamhaus, Barracuda, SpamCop e outras), com motivo, data do incidente e aviso no WhatsApp.",
      "Firewall que se recupera sozinho: serviço de gestão travado é reiniciado em cerca de 20 segundos.",
      "Acesso ao painel: dois fatores (código no celular) e permissões por usuário, módulo a módulo.",
    ],
    diferenciais: [
      "Na primeira varredura, a plataforma achou 10 IPs listados na frota, incluindo máquinas infectadas em clientes reais.",
      "O padrão é o mesmo em todos os clientes e não se perde quando o técnico muda.",
    ],
    requisitos: [
      "O IDS bloqueia por lista de reputação e não inspeciona o conteúdo do tráfego.",
      "IDS, lista negra e recuperação automática só em RouterOS v7.",
      "As ações ficam registradas, mas ainda sem tela de auditoria.",
    ],
    perguntas: [
      {
        pergunta: "Isso faz inspeção profunda de pacotes?",
        resposta:
          "Não. O bloqueio é por lista de reputação, sem inspeção do conteúdo do tráfego.",
      },
      {
        pergunta: "Por que meu e-mail cai no spam?",
        resposta:
          "O card de reputação mostra se o IP da empresa está em lista negra e por quê.",
      },
    ],
  },
  {
    slug: "filtro-de-conteudo",
    numero: 5,
    titulo: "Filtro de conteúdo",
    area: "Controle de navegação",
    oQueE:
      "Bloqueia categorias inteiras de sites e aplicativos em toda a rede com um clique, com exceções por site, por aparelho ou por grupo de funcionários.",
    dor: "“Funcionário passa o dia em rede social”, “não quero site adulto ou de apostas na empresa” e “bloquear o TikTok mas liberar o WhatsApp”.",
    como: [
      "Categorias: malware, anúncios e rastreadores, adulto, redes sociais, apostas, drogas, namoro, notícias falsas, mineradores, torrents, encurtadores, entre outras.",
      "Aplicativos: catálogo com mais de 1.000 serviços, cada um bloqueado, liberado ou seguindo a categoria.",
      "Sites específicos: bloquear ou liberar domínios, com anotação do motivo.",
      "Aparelhos liberados: IPs que navegam sem filtro (por exemplo, a diretoria).",
      "Por grupo do Active Directory: o funcionário entra com o usuário e a senha do Windows e navega conforme o grupo dele. Desativou no AD, o acesso cai junto.",
      "Anti-burla: a rede é obrigada a usar o DNS filtrado. Mudanças valem na hora.",
    ],
    diferenciais: [
      "Vale para todos os aparelhos, sem instalar nada nos computadores.",
      "Cada cliente tem a própria conta de filtro, isolada.",
      "Bloqueio por aplicativo com exceção fina.",
    ],
    requisitos: [
      "RouterOS v7.",
      "Em HTTPS a página de bloqueio personalizada não aparece (limite de todo filtro por DNS).",
      "Login por AD feito no portal, uma vez por conexão (não é automático pelo Windows).",
      "Ainda sem bloqueio por horário.",
    ],
    perguntas: [
      {
        pergunta: "O funcionário consegue burlar?",
        resposta:
          "Trocar o DNS do computador não adianta: a rede força o DNS filtrado.",
      },
      {
        pergunta: "Posso liberar só para o gerente?",
        resposta: "Sim, pelo IP do aparelho ou pelo grupo do AD.",
      },
    ],
  },
  {
    slug: "relatorio-de-acesso",
    numero: 6,
    titulo: "Relatório de acesso por computador",
    area: "Controle de navegação",
    oQueE:
      "Mostra quais sites cada computador acessou, o que foi bloqueado e em que horário, com histórico de até um ano.",
    dor: "“Quero saber o que a equipe faz na internet” e “preciso de prova em caso de problema”.",
    como: [
      "Cada consulta de site é registrada com o computador (IP e nome) e a categoria.",
      "Painéis: acessos e bloqueios, série por hora ou dia, mais acessados, mais bloqueados e detalhe por computador.",
      "Períodos de hoje, 7, 30 e 90 dias e 1 ano, com exportação em CSV.",
      "Retenção configurável (padrão 30 dias, até 365) para a LGPD. O resumo diário é guardado por mais tempo.",
      "Modo completo (roteadores com container) ou Lite (um clique, para os demais).",
    ],
    diferenciais: [
      "Sem agente nos computadores: tudo sai do firewall.",
      "Junto com o filtro, mostra o que foi barrado.",
    ],
    requisitos: [
      "Mostra sites (domínios), não páginas nem conteúdo.",
      "O modo completo exige container e pendrive. O Lite tem precisão um pouco menor.",
      "Os bloqueios aparecem com o Filtro de conteúdo ativo.",
    ],
    perguntas: [
      {
        pergunta: "Dá para ver conversa de WhatsApp?",
        resposta: "Não. Mostra apenas quais sites e serviços foram acessados.",
      },
      {
        pergunta: "O funcionário fica sabendo?",
        resposta: "Recomendamos informar na política de uso da empresa (LGPD).",
      },
    ],
  },
  {
    slug: "proxy-gerido",
    numero: 7,
    titulo: "Proxy gerido",
    area: "Controle de navegação",
    oQueE:
      "Para redes que precisam do modo “só libera o necessário”: tudo bloqueado, exceto a lista aprovada, mantida em um único lugar para todas as lojas.",
    dor: "“No caixa da loja só pode abrir o sistema, o banco e o fornecedor.”",
    como: [
      "Lista de liberados por grupos: domínio, IP de destino, computador de origem e porta.",
      "Bloqueio geral no fim da lista, com chave liga e desliga.",
      "Contador de acessos por regra, para ver o que é usado.",
      "Mudanças ficam pendentes até “Aplicar”. Ao ativar, importa a lista existente e guarda cópia para desfazer.",
    ],
    diferenciais: [
      "Em produção numa rede de farmácias: mais de 1.000 regras importadas, com as lojas navegando.",
      "Desfazer em um clique.",
    ],
    requisitos: [
      "RouterOS v7.",
      "Acesso negado mostra tela simples, sem a marca do cliente.",
      "Os computadores precisam estar configurados para usar o proxy.",
    ],
    perguntas: [
      {
        pergunta: "Qual a diferença para o Filtro de conteúdo?",
        resposta:
          "O filtro bloqueia o que é ruim e libera o resto. O proxy bloqueia tudo e libera só a lista.",
      },
    ],
  },
  {
    slug: "vpn-de-trabalho-remoto",
    numero: 8,
    titulo: "VPN de trabalho remoto",
    area: "VPN e filiais",
    oQueE:
      "Cada funcionário recebe o próprio acesso seguro à rede da empresa em minutos, por QR code ou arquivo, com histórico de quem conectou.",
    dor: "“Preciso acessar o sistema da empresa de casa” e “não sei quem está usando a VPN”.",
    como: [
      "Um acesso por pessoa. O funcionário instala o WireGuard (Windows, Mac, Android, iPhone) e lê o QR code.",
      "Dois modos: só a rede da empresa ou tudo pela empresa (a navegação passa pelo filtro).",
      "Liga e desliga um acesso na hora.",
      "Histórico: quem conectou, de onde, quando, por quanto tempo e quanto trafegou, por 1 ano, com CSV.",
      "Limite de acessos por cliente, definido pelo provedor.",
    ],
    diferenciais: [
      "WireGuard: mais rápido e estável, inclusive no 4G.",
      "Auditoria pronta para a LGPD e para a TI do cliente.",
      "Evita conflito de endereços com o que já existe no roteador.",
    ],
    requisitos: [
      "RouterOS v7.",
      "Firewall com IP público: não funciona atrás de CGNAT.",
      "Redes que bloqueiam UDP podem impedir a conexão.",
    ],
    perguntas: [
      {
        pergunta: "E se o funcionário sair da empresa?",
        resposta: "Um clique desliga o acesso dele.",
      },
      {
        pergunta: "Quantas pessoas podem usar?",
        resposta: "Até 253 por VPN. O limite contratado é definido por cliente.",
      },
    ],
  },
  {
    slug: "interligacao-de-filiais",
    numero: 9,
    titulo: "Interligação de filiais",
    area: "VPN e filiais",
    oQueE:
      "Liga as filiais à matriz como se estivessem no mesmo prédio, vigia cada túnel a cada minuto e reconecta sozinho quando algum cai.",
    dor: "“As lojas precisam acessar o sistema da matriz” e “toda semana uma filial fica sem sistema”.",
    como: [
      "A plataforma cria túneis e rotas nos dois lados. Só a matriz precisa de IP público: as filiais funcionam até atrás de CGNAT.",
      "Roteadores antigos nas filiais também entram, inclusive sem adotar o roteador da loja.",
      "Migração loja a loja, com volta automática se a loja não responder.",
      "VPN reserva por filial: se a principal cai, a reserva assume.",
      "Vigia: latência, perda e tráfego a cada minuto, 400 dias de histórico, disponibilidade por loja e quedas com causa provável.",
      "Auto-cura: túnel parado é renegociado sozinho, e a troca de link na matriz reajusta todas as filiais. Alerta no WhatsApp.",
    ],
    diferenciais: [
      "Em produção com cerca de 70 lojas de uma rede de farmácias, mais outras redes.",
      "43 filiais recriadas de uma vez: 24 reconectaram em menos de 2 minutos.",
      "Sem visita técnica para mexer na VPN da loja.",
    ],
    requisitos: [
      "Matriz com IP público e MikroTik v7.",
      "Filiais com roteador antigo mostram estado e latência, sem volume de tráfego.",
    ],
    perguntas: [
      {
        pergunta: "E se a internet da matriz cair?",
        resposta: "As filiais acompanham a troca de link da matriz sozinhas.",
      },
      {
        pergunta: "Quanto tempo para ligar uma loja nova?",
        resposta: "Cadastrar a filial e colar um script no roteador da loja.",
      },
    ],
  },
  {
    slug: "wi-fi-de-visitantes",
    numero: 10,
    titulo: "Wi-Fi de visitantes (Hotspot)",
    area: "Wi-Fi de visitantes",
    oQueE:
      "Transforma o Wi-Fi da loja em canal de relacionamento: o cliente entra por um portal com a marca da loja, deixa o WhatsApp confirmado e vira contato para marketing, dentro da LGPD.",
    dor: "“Wi-Fi para clientes sem expor minha rede”, “quero saber quem frequenta a loja” e “quero ganhar dinheiro com o Wi-Fi”.",
    como: [
      "Portal com a marca da loja, um por loja, com cadastro compartilhado entre as lojas do cliente.",
      "Formas de entrar: formulário, voucher, cortesia, compra por Pix, código no WhatsApp e login corporativo (AD).",
      "WhatsApp confirmado: o visitante navega na hora por alguns minutos, toca no link e vira contato confirmado. As mensagens saem pelo número da loja (ou do provedor, como extra).",
      "Venda por Pix: planos de tempo ou dados, Pix na conta da loja, liberação automática e confirmação no WhatsApp.",
      "Cortesias pelo WhatsApp e tela de boas-vindas com propaganda (imagem, vídeo e cliques).",
      "Limites: velocidade, tempo por acesso, tempo ou dados por dia, horário e aparelhos por pessoa.",
      "Relatórios: novos e recorrentes, mapa de calor, permanência, zonas, aparelhos e Lista WhatsApp para marketing.",
      "LGPD e Marco Civil: termos versionados, aceite registrado e registros guardados por 15 meses. A rede de visitantes é separada da rede da empresa.",
    ],
    diferenciais: [
      "Dados quase ao vivo, com novos e recorrentes, permanência, aparelhos e percentual de MAC aleatório.",
      "WhatsApp confirmado, sem custo de SMS.",
      "Venda por Pix na conta da própria loja.",
      "O mesmo painel gerencia firewall, VPN e filtro.",
    ],
    requisitos: [
      "MikroTik RouterOS v7 com pacote de hotspot (o hAP lite não roda).",
      "Wi-Fi de visitantes aberto (sem senha). Pagamento só por Pix.",
      "O login de visitantes novos depende da plataforma no ar.",
    ],
    perguntas: [
      {
        pergunta: "Os contatos são meus?",
        resposta:
          "Sim: a Lista WhatsApp é exportada pela loja, só com quem aceitou.",
      },
      {
        pergunta: "O Pix passa por vocês?",
        resposta: "Não: cai direto na conta da loja.",
      },
    ],
  },
  {
    slug: "adocao-e-implantacao",
    numero: 11,
    titulo: "Adoção e implantação",
    area: "Para o parceiro e implantação",
    oQueE:
      "Colocar um cliente na plataforma leva minutos: firewall novo recebe o padrão completo, e firewall que já funciona é adotado sem derrubar a rede e sem trocar o equipamento.",
    dor: "“Trocar o firewall do cliente é caro e arriscado” e “não sei o que o técnico anterior configurou”.",
    como: [
      "Cadastrar e provisionar: um script colado no roteador cria o túnel de gerência e o firewall aparece online.",
      "Firewall novo: padrão homologado completo (links, rede local, proteção, monitoramento).",
      "Rede que já existe: a plataforma só adiciona o acesso dela. Nada é renomeado ou apagado.",
      "Inventário do legado: cataloga 21 áreas do roteador e permite adotar regra por regra.",
      "Roteadores antigos (v6) também entram.",
      "Rede local pelo painel: VLANs, DHCP e Wi-Fi do MikroTik.",
      "Firewall novo entra no Zabbix sozinho.",
    ],
    diferenciais: [
      "Adoção sem troca de equipamento e sem parada.",
      "Em produção: 268 itens inventariados num cliente e 42 lojas com roteadores antigos colocadas em lote.",
      "Tudo o que a plataforma cria é identificado e removível.",
    ],
    requisitos: [
      "Equipamento MikroTik.",
      "Em v6: sem VPN de trabalho remoto, Wi-Fi de visitantes e troca automática de link.",
      "O padrão completo substitui a configuração: em rede ativa, use a adoção.",
    ],
    perguntas: [
      {
        pergunta: "Vai derrubar minha rede?",
        resposta:
          "Na adoção, não: nada é alterado até você adotar item por item.",
      },
      {
        pergunta: "Preciso ir ao cliente?",
        resposta: "Não: basta colar o script no roteador, remotamente.",
      },
    ],
  },
  {
    slug: "para-o-parceiro-que-revende",
    numero: 12,
    titulo: "Para o parceiro que revende",
    area: "Para o parceiro e implantação",
    oQueE:
      "O provedor recebe a plataforma inteira com a marca dele, no endereço dele, e cada cliente vê só a própria rede.",
    dor: "“Quero oferecer firewall gerenciado com a minha marca sem desenvolver nada.”",
    como: [
      "Marca própria: nome, logo, favicon, cores, e-mail e telefone de suporte.",
      "Endereço próprio: subdomínio automático ou domínio do parceiro, com certificado automático.",
      "Hierarquia: plataforma, parceiro e cliente. Cada cliente vê só o dele.",
      "Permissões finas: perfis e ver ou alterar módulo a módulo (mais de 20 módulos).",
      "Contrato digital com versão, data e IP.",
      "Planos e módulos com fatura estimada pelo uso.",
      "Guia de implantação, painel no celular e Wi-Fi de visitantes com a marca do parceiro.",
    ],
    diferenciais: [
      "SaaS puro: nada para instalar ou manter.",
      "Marca e domínio próprios funcionando em produção.",
      "Isolamento entre clientes validado.",
    ],
    requisitos: [
      "E-mails com a marca do parceiro dependem de configurar o servidor de e-mail.",
      "A cobrança automática dos parceiros está em implantação. Hoje há a fatura estimada.",
    ],
    perguntas: [
      {
        pergunta: "Meu cliente vai ver a marca de vocês?",
        resposta: "Não: painel, endereço e Wi-Fi saem com a marca do parceiro.",
      },
      {
        pergunta: "Consigo dar acesso só de leitura?",
        resposta:
          "Sim, com perfil de visualização ou ver e alterar por módulo.",
      },
    ],
  },
];

export function getModulo(slug: string) {
  return modulos.find((m) => m.slug === slug);
}

export const dores: {
  cliente: string;
  plataforma: string;
  modulo: string;
}[] = [
  {
    cliente: "“A internet cai e a loja para”",
    plataforma:
      "Dois ou mais links com troca automática em segundos, sem ninguém mexer.",
    modulo: "redundancia-de-links-e-sd-wan",
  },
  {
    cliente: "“Só descubro que caiu quando o cliente reclama”",
    plataforma:
      "Alerta no WhatsApp quando o firewall, um link ou uma filial cai, e quando volta.",
    modulo: "alertas-no-whatsapp",
  },
  {
    cliente: "“Funcionário fica em rede social e site impróprio”",
    plataforma:
      "Bloqueio por categoria (redes sociais, jogos, adulto, apostas) e relatório de acesso por computador.",
    modulo: "filtro-de-conteudo",
  },
  {
    cliente: "“Tenho medo de vírus e invasão”",
    plataforma:
      "Bloqueio automático de endereços maliciosos e aviso quando o IP da empresa entra em lista negra.",
    modulo: "firewall-gerenciado-e-seguranca",
  },
  {
    cliente: "“Preciso que as filiais acessem o sistema da matriz”",
    plataforma:
      "Interligação matriz-filial criada pelo painel, com vigia que reconecta sozinha.",
    modulo: "interligacao-de-filiais",
  },
  {
    cliente: "“Quero trabalhar de casa com segurança”",
    plataforma:
      "VPN por usuário em minutos (QR code no celular), com histórico de quem conectou.",
    modulo: "vpn-de-trabalho-remoto",
  },
  {
    cliente: "“Quero Wi-Fi para clientes sem expor minha rede”",
    plataforma:
      "Hotspot com a marca da loja, cadastro com WhatsApp confirmado, LGPD e relatórios de visitantes.",
    modulo: "wi-fi-de-visitantes",
  },
  {
    cliente: "“Quero ganhar dinheiro com o Wi-Fi”",
    plataforma:
      "Venda de acesso por Pix direto na conta do cliente, cortesias e propaganda na tela de boas-vindas.",
    modulo: "wi-fi-de-visitantes",
  },
  {
    cliente: "“Cada técnico configura de um jeito”",
    plataforma:
      "Padrão único aplicado pela plataforma, histórico de tudo e permissões por usuário.",
    modulo: "firewall-gerenciado-e-seguranca",
  },
];
