<p align="center">
  <img src="docs/readme/banner.svg" alt="SF Cosmetics — Cosmetics and Beauty Studio" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-0A0A0A?style=for-the-badge&logo=nextdotjs&logoColor=D4AF37&labelColor=0A0A0A&color=D4AF37" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-0A0A0A?style=for-the-badge&logo=react&logoColor=D4AF37&labelColor=0A0A0A&color=D4AF37" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-0A0A0A?style=for-the-badge&logo=typescript&logoColor=D4AF37&labelColor=0A0A0A&color=D4AF37" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind-4-0A0A0A?style=for-the-badge&logo=tailwindcss&logoColor=D4AF37&labelColor=0A0A0A&color=D4AF37" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Supabase-Postgres-0A0A0A?style=for-the-badge&logo=supabase&logoColor=D4AF37&labelColor=0A0A0A&color=D4AF37" alt="Supabase" />
  <img src="https://img.shields.io/badge/Gemini-IA-0A0A0A?style=for-the-badge&logo=googlegemini&logoColor=D4AF37&labelColor=0A0A0A&color=D4AF37" alt="Google Gemini" />
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> ·
  <a href="#-coleção-em-destaque">Coleção</a> ·
  <a href="#-funcionalidades">Funcionalidades</a> ·
  <a href="#-arquitetura">Arquitetura</a> ·
  <a href="#-identidade-visual">Identidade Visual</a> ·
  <a href="#-instalação">Instalação</a> ·
  <a href="#-base-de-dados">Base de Dados</a> ·
  <a href="#-deploy">Deploy</a> ·
  <a href="#-estrutura-do-projeto">Estrutura</a>
</p>

---

## ✦ Sobre o Projeto

**SF Cosmetics — Cosmetics and Beauty Studio** é uma loja online de perfumaria, cosmética e acessórios de beleza, pensada para transmitir uma experiência de **luxo discreto**: fundo claro, tipografia limpa e acentos dourados.

A plataforma junta duas partes:

- **Loja** — catálogo por categorias, página de produto com pirâmide olfativa, carrinho, favoritos e conta de cliente.
- **Painel de administração** — métricas de negócio, gestão de produtos, encomendas, clientes, despesas e conteúdos. A integração com **Google Gemini** cria fichas de produto completas a partir de uma simples descrição ou de um catálogo em PDF/CSV.

O catálogo inclui uma **coleção de perfumes árabes** com 15 fragrâncias masculinas e 15 femininas das casas mais procuradas: Lattafa, Armaf, Afnan, Rasasi, Al Haramain, Maison Alhambra e Ajmal.

---

## ✦ Coleção em Destaque

<table>
  <tr>
    <td align="center" width="25%"><img src="https://fimgs.net/mdimg/perfume/375x500.72821.jpg" width="140" alt="Lattafa Asad" /><br /><sub><b>LATTAFA</b></sub><br />Asad<br /><sub>Eau de Parfum · 100ml</sub></td>
    <td align="center" width="25%"><img src="https://fimgs.net/mdimg/perfume/375x500.34696.jpg" width="140" alt="Armaf Club de Nuit Intense Man" /><br /><sub><b>ARMAF</b></sub><br />Club de Nuit Intense Man<br /><sub>Eau de Toilette · 105ml</sub></td>
    <td align="center" width="25%"><img src="https://fimgs.net/mdimg/perfume/375x500.65414.jpg" width="140" alt="Afnan 9pm" /><br /><sub><b>AFNAN</b></sub><br />9pm<br /><sub>Eau de Parfum · 100ml</sub></td>
    <td align="center" width="25%"><img src="https://fimgs.net/mdimg/perfume/375x500.46890.jpg" width="140" alt="Rasasi Hawas for Him" /><br /><sub><b>RASASI</b></sub><br />Hawas for Him<br /><sub>Eau de Parfum · 100ml</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="https://fimgs.net/mdimg/perfume/375x500.76880.jpg" width="140" alt="Lattafa Yara" /><br /><sub><b>LATTAFA</b></sub><br />Yara<br /><sub>Eau de Parfum · 100ml</sub></td>
    <td align="center"><img src="https://fimgs.net/mdimg/perfume/375x500.27655.jpg" width="140" alt="Armaf Club de Nuit Woman" /><br /><sub><b>ARMAF</b></sub><br />Club de Nuit Woman<br /><sub>Eau de Parfum · 105ml</sub></td>
    <td align="center"><img src="https://fimgs.net/mdimg/perfume/375x500.70466.jpg" width="140" alt="Lattafa Fakhar Rose" /><br /><sub><b>LATTAFA</b></sub><br />Fakhar Rose<br /><sub>Eau de Parfum · 100ml</sub></td>
    <td align="center"><img src="https://fimgs.net/mdimg/perfume/375x500.90273.jpg" width="140" alt="Maison Alhambra Delilah" /><br /><sub><b>MAISON ALHAMBRA</b></sub><br />Delilah<br /><sub>Eau de Parfum · 100ml</sub></td>
  </tr>
</table>

<details>
<summary><b>Ver a coleção completa (30 perfumes)</b></summary>

<br />

| Masculinos | Marca | Família olfativa | Preço |
|---|---|---|---:|
| Asad | Lattafa | Âmbar Especiado | 35,00 € |
| Asad Zanzibar | Lattafa | Aromático Aquático | 39,00 € |
| Fakhar Black | Lattafa | Aromático Fougère | 32,00 € |
| Odyssey Homme | Armaf | Âmbar Floral | 35,00 € |
| Club de Nuit Intense Man | Armaf | Chipre Frutado | 49,00 € |
| Club de Nuit Blue Iconic | Armaf | Amadeirado Aromático | 45,00 € |
| 9pm | Afnan | Âmbar Baunilhado | 42,00 € |
| Supremacy Not Only Intense | Afnan | Chipre Frutado | 55,00 € |
| Turathi Blue | Afnan | Amadeirado Especiado | 45,00 € |
| Hawas for Him | Rasasi | Aromático Aquático | 59,00 € |
| Hawas Ice | Rasasi | Aromático Aquático | 62,00 € |
| L'Aventure | Al Haramain | Chipre Frutado | 38,00 € |
| Salvo | Maison Alhambra | Aromático Especiado | 29,00 € |
| Jean Lowe Immortal | Maison Alhambra | Amadeirado Aromático | 29,00 € |
| Evoke for Him | Ajmal | Amadeirado Aromático | 52,00 € |

| Femininos | Marca | Família olfativa | Preço |
|---|---|---|---:|
| Yara | Lattafa | Âmbar Baunilhado | 32,00 € |
| Yara Moi | Lattafa | Âmbar Floral | 34,00 € |
| Yara Candy | Lattafa | Floral Frutado Gourmand | 36,00 € |
| Yara Tous | Lattafa | Floral Frutado | 34,00 € |
| Haya | Lattafa | Floral Frutado | 35,00 € |
| Mayar | Lattafa | Floral Frutado | 36,00 € |
| Sakeena | Lattafa | Âmbar Floral | 38,00 € |
| Fakhar Rose | Lattafa | Floral Branco | 32,00 € |
| Qimmah for Women | Lattafa | Âmbar Baunilhado | 39,00 € |
| Club de Nuit Woman | Armaf | Chipre Floral | 42,00 € |
| 9pm pour Femme | Afnan | Floral Frutado | 42,00 € |
| Hawas for Her | Rasasi | Floral Frutado | 59,00 € |
| Delilah | Maison Alhambra | Floral Frutado | 29,00 € |
| L'Aventure Femme | Al Haramain | Chipre Frutado | 38,00 € |
| Evoke for Her | Ajmal | Chipre Floral | 52,00 € |

Cada produto tem marca, concentração, volume, família olfativa, notas de topo, coração e base, país de origem e descrição longa. O seed está em [`supabase/seed_perfumes_arabes.sql`](supabase/seed_perfumes_arabes.sql).

</details>

---

## ✦ Funcionalidades

<table>
<tr>
<td valign="top" width="50%">

### 🛍️ Loja

- **Catálogo por categorias** — perfumes, rosto, corpo, cabelo, maquilhagem, bijuteria e aparelhos
- **Filtros** por subcategoria (Feminino, Masculino, Unisex…), intervalo de preço, pesquisa e ordenação
- **Página de produto** com galeria, pirâmide olfativa (topo, coração, base), família, concentração, volume e stock em tempo real
- **Carrinho** persistente (localStorage para visitantes, Supabase para clientes autenticados)
- **Favoritos** organizados em listas personalizadas
- **Autenticação** por email/password e Google OAuth
- **Homepage configurável** — hero, destaques e produtos marcados com `show_on_home`
- **Navegação dinâmica** gerida pelo CMS
- **Design responsivo** para mobile e desktop

</td>
<td valign="top" width="50%">

### 📊 Painel de Administração

- **Dashboard** com receita, encomendas, clientes e inventário, com gráficos interativos (Recharts)
- **Produtos** — CRUD completo, pesquisa, filtros, stock e imagens
- **Criação com IA (Gemini)** — descreve um produto em linguagem natural e recebe a ficha completa
- **Importação de catálogos** a partir de PDF, CSV ou texto, via IA
- **Encomendas** — estados (pendente → em processamento → enviada → entregue) e estado do pagamento
- **Clientes** — diretório com perfil, total gasto e histórico
- **Despesas** por categoria (renda, fornecedores, marketing, software, logística) com recorrência
- **CMS** — itens de navegação e blocos de conteúdo da homepage
- **Interface escura** com acentos dourados

</td>
</tr>
</table>

---

## ✦ Arquitetura

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#0A0A0A','primaryTextColor':'#F3CF55','primaryBorderColor':'#D4AF37','lineColor':'#D4AF37','secondaryColor':'#FAFAF8','tertiaryColor':'#FAFAF8','fontFamily':'Poppins, Segoe UI, sans-serif'}}}%%
flowchart LR
    U([Cliente]) --> L[Loja<br/>Next.js App Router]
    A([Administrador]) --> D[Painel Admin<br/>/admin]
    L --> C[Contexts<br/>Auth · Cart · Favorites]
    C --> S[(Supabase<br/>Postgres + Auth + RLS)]
    D --> S
    D --> G[API Route<br/>/api/gemini]
    G --> AI[[Google Gemini]]
    L -. imagens .-> CDN[(CDN de imagens)]
```

- **Rendering:** Next.js 16 com App Router. As páginas da loja são componentes client que leem o Supabase diretamente com a chave pública, protegidas por Row-Level Security.
- **Sessão:** `middleware.ts` renova a sessão Supabase em cada pedido (`@supabase/ssr`).
- **IA:** a chave Gemini fica só no servidor. O painel chama `/api/gemini`, que faz o pedido ao modelo.

---

## ✦ Identidade Visual

<p align="center">
  <img src="docs/readme/palette.svg" alt="Paleta de cores" width="100%" />
</p>

| Elemento | Definição |
|---|---|
| **Cor principal** | Gold `#D4AF37`, usada em botões, marcas, preços e realces |
| **Variações** | Gold Light `#F3CF55` · Gold Dark `#AA8C2C` (tokens `--color-gold-*` em `app/globals.css`) |
| **Fundos** | Branco e Ivory `#FAFAF8` na loja, Noir `#0A0A0A` no painel e nos banners |
| **Tipografia** | [Poppins](https://fonts.google.com/specimen/Poppins) via `next/font`; títulos em maiúsculas com espaçamento largo |
| **Logótipo** | `public/logo-original.png` (horizontal) · `public/logo-nobg.png` (monograma) |

<p align="center">
  <img src="public/logo-original.png" alt="SF Cosmetics and Beauty Studio" width="360" />
</p>

---

## ✦ Tech Stack

| Camada | Tecnologia |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Linguagem** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI** | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| **Componentes** | [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/) |
| **Backend / BD** | [Supabase](https://supabase.com/) (PostgreSQL + Auth + RLS) |
| **Autenticação** | Supabase Auth (email + Google OAuth) |
| **IA** | [Google Gemini](https://ai.google.dev/) via `@google/generative-ai` |
| **Gráficos** | [Recharts](https://recharts.org/) |
| **Notificações** | [Sonner](https://sonner.emilkowal.dev/) |

---

## ✦ Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [npm](https://www.npmjs.com/)
- Um projeto no [Supabase](https://supabase.com/)
- Chave da API [Google Gemini](https://ai.google.dev/) (opcional, só para as funcionalidades de IA)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/rodrigofariarocha/Sf_Cosmetics.git
cd Sf_Cosmetics

# 2. Instalar dependências
npm install

# 3. Configurar as variáveis de ambiente
cp .env.example .env.local

# 4. Preparar a base de dados (ver secção seguinte)

# 5. Iniciar em modo de desenvolvimento
npm run dev
```

A aplicação fica disponível em **http://localhost:3000** e o painel em **http://localhost:3000/admin**.

### Variáveis de Ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://o-teu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=a-tua-anon-key

# Google Gemini (opcional)
GEMINI_API_KEY=a-tua-chave-gemini
```

> [!IMPORTANT]
> Os ficheiros `.env*` estão no `.gitignore`. Nunca faças commit de chaves; usa as variáveis de ambiente do Vercel em produção.

---

## ✦ Base de Dados

O projeto usa Supabase (PostgreSQL) com Row-Level Security. As tabelas `products`, `orders`, `order_items`, `profiles`, `favorites`, `favorite_lists` e `cart` são criadas no Supabase. Os scripts da pasta `supabase/` acrescentam o resto e devem correr no **SQL Editor** por esta ordem:

| # | Ficheiro | O que faz |
|:-:|---|---|
| 1 | `setup_cms.sql` | Cria `navigation_items`, `content_blocks` e `expenses` |
| 2 | `update_products_schema.sql` | Adiciona `show_on_home` aos produtos |
| 3 | `migrations/add_subcategory_column.sql` | Adiciona `subcategory` |
| 4 | `migrations/add_product_details.sql` | Adiciona os campos de perfumaria: marca, volume, género, família, notas, concentração, origem, avaliação |
| 5 | `fix_rls_policies.sql` | Políticas de Row-Level Security |
| 6 | `seed_navigation.sql` | Menu de navegação por defeito |
| 7 | `seed_products.sql` | Produtos de exemplo de várias categorias |
| 8 | `seed_perfumes_arabes.sql` | Coleção de 30 perfumes árabes (15 masculinos e 15 femininos) |

### Modelo de dados

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#FAFAF8','primaryTextColor':'#0A0A0A','primaryBorderColor':'#D4AF37','lineColor':'#AA8C2C','fontFamily':'Poppins, Segoe UI, sans-serif'}}}%%
erDiagram
    PROFILES ||--o{ ORDERS : faz
    ORDERS ||--|{ ORDER_ITEMS : contém
    PRODUCTS ||--o{ ORDER_ITEMS : vendido_em
    PROFILES ||--o{ FAVORITES : guarda
    FAVORITE_LISTS ||--o{ FAVORITES : agrupa
    PRODUCTS ||--o{ FAVORITES : favorito
    NAVIGATION_ITEMS ||--o{ NAVIGATION_ITEMS : submenu

    PRODUCTS {
        uuid id
        text name
        text brand
        text category
        text subcategory
        numeric price
        int stock
        text concentration
        text volume
        text gender
        text fragrance_family
        text top_notes
        text heart_notes
        text base_notes
        bool show_on_home
    }
    ORDERS {
        uuid id
        text status
        text payment_status
        numeric total_amount
    }
```

### Importar produtos por CSV

```bash
node scripts/import-products.mjs data/template-produtos.csv
```

O modelo [`data/template-produtos.csv`](data/template-produtos.csv) tem as colunas `name, description, price, category, subcategory, stock, image_url, show_on_home`.

---

## ✦ Deploy

O projeto está pronto para o [Vercel](https://vercel.com/):

1. Importar o repositório no Vercel
2. Definir `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `GEMINI_API_KEY` em **Settings → Environment Variables**
3. No Supabase, em **Authentication → URL Configuration**, adicionar o domínio de produção e o callback `https://<domínio>/auth/callback`
4. Fazer deploy

---

## ✦ Estrutura do Projeto

```
├── app/                      # Next.js App Router
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Layout raiz (providers, fonte Poppins)
│   ├── account/              # Conta do cliente
│   ├── admin/                # Painel de administração
│   ├── api/gemini/           # API Route — integração com o Gemini
│   ├── auth/                 # Callback OAuth e página de erro
│   ├── cart/                 # Carrinho
│   ├── favorites/            # Favoritos
│   ├── products/[id]/        # Página de produto
│   ├── register/             # Registo
│   └── shop/[category]/      # Loja por categoria
├── components/
│   ├── client/               # Header, footer, showcase, página de produto
│   ├── admin/                # Dashboard de administração
│   ├── ui/                   # Componentes shadcn/ui
│   └── product-card.tsx      # Cartão de produto
├── contexts/                 # Auth, Cart, Favorites
├── lib/supabase/             # Clientes Supabase (browser, server, middleware)
├── types/                    # Tipos TypeScript (Product, Order, …)
├── supabase/                 # Scripts SQL, migrações e seeds
├── scripts/                  # Importação CSV e manutenção
├── data/                     # Modelos CSV
├── docs/readme/              # Banner e paleta deste README
└── public/                   # Logótipos e assets estáticos
```

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Linting com ESLint |

---

## ✦ Créditos e Licença

- Imagens e notas olfativas dos perfumes: [Fragrantica](https://www.fragrantica.com/). Servem apenas de demonstração do protótipo; antes de entrar em produção devem ser substituídas por imagens próprias ou autorizadas pelas marcas.
- Os nomes e marcas dos perfumes pertencem aos respetivos proprietários.
- Projeto privado e de uso exclusivo.

<br />

<p align="center">
  <img src="public/logo-nobg.png" alt="SF" width="64" /><br />
  <sub>Desenvolvido por <b>Rodrigo Rocha</b> · SF Cosmetics and Beauty Studio</sub>
</p>
