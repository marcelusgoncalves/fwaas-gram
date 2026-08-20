# FWAAS GRAM - Firewall as a Service

## Projeto
**fwaas-gram** é um site landing page para o serviço **Firewall as a Service (FWAAS)** da **RAM Cyber Segurança**, oferecendo proteção de perímetro gerenciada.

## Stack Tecnológico
- **Framework**: Next.js 16+ (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Diretório de código**: `/src`
- **Alias de importação**: `@/*`

## Estrutura do Projeto
```
fwaas-gram/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Página inicial
│   │   ├── layout.tsx        # Layout raiz
│   │   └── globals.css       # Estilos globais
│   └── components/           # Componentes reutilizáveis
├── public/                   # Arquivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── .eslintrc.json
```

## Desenvolvimento

### Iniciar servidor
```bash
npm run dev
```
Servidor rodando em: **http://localhost:3000**

### Construir para produção
```bash
npm run build
npm run start
```

### Lint
```bash
npm run lint
```

## Página Inicial
Localização: `src/app/page.tsx`

Componentes:
- **Título**: "FWAAS GRAM" em destaque
- **Descrição**: Firewall as a Service — proteção de perímetro gerenciada
- **CTA**: Botão "Fale com um especialista" (link para #contato)

Cores: Slate (slate-900, slate-600)
Design: Limpo, responsivo, centrado

## Próximas Implementações
- [ ] Header com navegação
- [ ] Seção de Features/Benefícios
- [ ] Seção de Preços
- [ ] Formulário de Contato
- [ ] Footer
- [ ] Responsive design completo
- [ ] Otimizações de SEO

## Notas
- Hot-reload ativado em desenvolvimento
- Tailwind CSS configurado com theme estendido
- TypeScript strict mode habilitado
