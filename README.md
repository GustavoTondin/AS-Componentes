# 🛒 Mini E-commerce com React

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

Aplicação Front-end desenvolvida como parte da Avaliação Prática (AS). O projeto simula um pequeno e-commerce com gerenciamento de carrinho global, validação de estoque em tempo real e operações de CRUD (Criar, Ler, Atualizar, Deletar) de produtos consumindo uma API simulada.

## 📋 Funcionalidades

- **Listagem de Produtos:** Exibição dinâmica de produtos vindos da API.
- **Detalhes do Produto:** Rota dinâmica (`/produto/:id`) com informações completas.
- **Carrinho de Compras (Global):**
  - Gerenciado via **Context API**.
  - Adicionar, remover e alterar quantidade.
  - Cálculo automático do total.
- **Controle de Estoque Inteligente:**
  - Bloqueio de adição caso o estoque seja 0.
  - Validação para não permitir adicionar ao carrinho mais itens do que o disponível no estoque.
- **Gestão de Produtos (CRUD):**
  - Cadastro de novos produtos com validação de formulário.
  - Edição de produtos existentes.
  - Exclusão de produtos.
  - Uso de **useRef** para focar automaticamente em campos inválidos.

## 🚀 Tecnologias Utilizadas

- **React JS** (Vite)
- **React Router Dom** (Navegação SPA)
- **Context API** (Gerenciamento de Estado)
- **Tailwind CSS** (Estilização)
- **JSON Server** (API REST Simulada)

---

## 📦 Como Rodar o Projeto

Para rodar o projeto, você precisará de **dois terminais** abertos simultaneamente (um para o Back-end e outro para o Front-end).

### Pré-requisitos
- Node.js instalado.

### Passo 1: Instalação
Clone o repositório e instale as dependências:

```bash
# Entre na pasta do projeto
cd mini-ecommerce

# Instale as dependências
npm install
