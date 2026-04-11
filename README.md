<p align="center">
  <img src="public/logo-nobg.png" alt="SF Cosmetics" width="180" />
</p>

<h1 align="center">SF Cosmetics</h1>

<p align="center">
  <strong>Plataforma e-commerce premium de cosmética e perfumaria</strong>
</p>

<p align="center">
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#variáveis-de-ambiente">Variáveis de Ambiente</a> •
  <a href="#base-de-dados">Base de Dados</a> •
  <a href="#estrutura-do-projeto">Estrutura</a> •
  <a href="#licença">Licença</a>
</p>

---

## Sobre o Projeto

**SF Cosmetics** é uma loja online de cosmética, perfumaria e acessórios de beleza, construída com foco em design de luxo e experiência de utilizador premium. Inclui um painel de administração inteligente com integração de IA (Google Gemini) para criação automática de produtos, gestão de encomendas, clientes, despesas e CMS.

---

## Funcionalidades

### Loja (Cliente)

- **Catálogo dinâmico** com 7+ categorias (perfumes, rosto, corpo, cabelo, maquilhagem, bijuteria, dispositivos)
- **Página de produto detalhada** — galeria de imagens, pirâmide olfativa, família de fragrância, notas de topo/coração/base, indicador de stock em tempo real
- **Carrinho de compras** persistente (localStorage para visitantes, Supabase para utilizadores autenticados)
- **Sistema de favoritos** com listas personalizadas
- **Autenticação** via email/password e Google OAuth
- **Navegação dinâmica** gerida por CMS (Supabase)
- **Homepage configurável** com hero, destaques e produtos em destaque
- **Design responsivo** otimizado para mobile e desktop

### Painel de Administração

- **Dashboard** com métricas em tempo real (receita, encomendas, clientes, inventário) e gráficos interativos
- **Gestão de produtos** — CRUD completo, filtros, pesquisa, gestão de stock e imagens
- **Criação de produtos com IA (Gemini 2.0 Flash)** — descreve um produto em linguagem natural e a IA gera todos os detalhes (nome, preço, notas olfativas, imagens)
- **Extração de catálogos** — importa produtos a partir de PDF, CSV ou texto via IA
- **Gestão de encomendas** — tracking de estado (pendente → processamento → enviado → entregue), pagamento e cliente associado
- **Gestão de clientes** — diretório com perfil, total gasto e histórico
- **Controlo de despesas** — registo de despesas por categoria (renda, fornecedor, marketing, software, logística) com recorrência
- **CMS** — edição de itens de navegação e blocos de conteúdo da homepage
- **UI dark mode** com acentos dourados (#D4AF37)

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Linguagem** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI** | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| **Componentes** | [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/) |
| **Backend / DB** | [Supabase](https://supabase.com/) (PostgreSQL + Auth + RLS) |
| **Autenticação** | Supabase Auth (email + Google OAuth) |
| **IA** | [Google Gemini 2.0 Flash](https://ai.google.dev/) |
| **Gráficos** | [Recharts](https://recharts.org/) |
| **Notificações** | [Sonner](https://sonner.emilkowal.dev/) |

---

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)
- Conta no [Supabase](https://supabase.com/)
- Chave da API [Google Gemini](https://ai.google.dev/) (opcional, para funcionalidades IA)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/rodrigofariarocha/Sf_Cosmetics.git
cd Sf_Cosmetics

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente (ver secção abaixo)
cp .env.example .env.local

# 4. Executar as migrações SQL no Supabase (ver secção Base de Dados)

# 5. Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**.

---

## Variáveis de Ambiente

Criar um ficheiro `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Gemini (opcional)
GEMINI_API_KEY=your-gemini-api-key
```

---

## Base de Dados

O projeto utiliza Supabase (PostgreSQL) com Row-Level Security. Os scripts SQL estão na pasta `supabase/`:

| Ficheiro | Descrição |
|---|---|
| `setup_cms.sql` | Criação das tabelas principais (navigation, content_blocks, orders, profiles, expenses, favorites) |
| `seed_products.sql` | Dados iniciais de produtos |
| `seed_navigation.sql` | Itens de navegação por defeito |
| `update_products_schema.sql` | Campos avançados de perfumaria (notas, concentração, família olfativa) |
| `fix_rls_policies.sql` | Políticas de Row-Level Security |
| `migrations/` | Migrações incrementais |

### Tabelas Principais

```
products           — Catálogo de produtos (perfumaria detalhada)
navigation_items   — Menu de navegação dinâmico (CMS)
content_blocks     — Blocos de conteúdo da homepage
orders / order_items — Encomendas e itens
profiles           — Perfis de utilizador
favorites / favorite_lists — Sistema de favoritos
expenses           — Controlo de despesas do negócio
cart               — Carrinho persistente
```

---

## Estrutura do Projeto

```
├── app/                    # Next.js App Router
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Layout raiz (providers, fontes)
│   ├── account/            # Página da conta
│   ├── admin/              # Painel de administração
│   ├── api/gemini/         # API Route — integração Gemini IA
│   ├── auth/               # Callback OAuth + erro
│   ├── cart/               # Página do carrinho
│   ├── favorites/          # Página de favoritos
│   ├── products/[id]/      # Página de produto dinâmica
│   ├── register/           # Registo de utilizador
│   └── shop/[category]/    # Loja por categoria
├── components/
│   ├── client/             # Componentes client-side (header, footer, shop, produto)
│   ├── admin/              # Dashboard de administração
│   ├── ui/                 # Componentes UI reutilizáveis (shadcn/ui)
│   └── product-card.tsx    # Card de produto reutilizável
├── contexts/               # React Context (auth, cart, favorites)
├── lib/
│   ├── supabase/           # Clientes Supabase (client, server, middleware)
│   ├── mock-data.ts        # Dados de desenvolvimento
│   └── utils.ts            # Utilitários (cn, formatação)
├── types/                  # TypeScript types (Product, CartItem, ContentBlock, etc.)
├── supabase/               # Scripts SQL e migrações
├── scripts/                # Scripts de importação e manutenção
└── public/                 # Assets estáticos (logos)
```

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Linting com ESLint |

---

## Licença

Este projeto é privado e de uso exclusivo.

---

<p align="center">
  Feito com ☕ e dedicação — <strong>SF Cosmetics</strong>
</p>
