# Ferreira Imóveis — Portal Imobiliário & Painel Administrativo

Portal imobiliário institucional moderno e plataforma de gestão de catálogo para a **Ferreira Imóveis**, com atuação em **Cruzeiro - SP** e imóveis de temporada no litoral em **Ubatuba - SP**.

Desenvolvido com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS (Dark Mode + Vermelho)**, **Prisma ORM com SQLite** e autenticação segura por sessão para administradores.

---

##  Identidade do Negócio

- **Razão Social**: Afrânio Ramos Ferreira Filho
- **Nome Fantasia**: Ferreira Imóveis
- **Corretores Responsáveis**:
  - **Afrânio Ramos Ferreira Filho** — CRECI 130906-F
  - **Maria Fernanda Ferreira** — CRECI 198557-F
- **Endereço**: Rua Professor Virgílio Antunes, 57 - Centro - Cruzeiro - SP
- **Telefone Fixo**: (12) 3145-7589
- **Celular / WhatsApp**: (12) 99748-4619
- **E-mails**: `mferreiraimoveis@creci.org.br` | `imobiliariaferreiraimoveis@bol.com.br`
- **Redes Sociais**: Instagram `@imobiliariaferreiraimoveis` | Facebook `Ferreira-Imóveis`
- **Horário de Atendimento**: Segunda a Sexta, das 9h às 18h

---

##  Tecnologias Utilizadas

- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS (Dark Mode Premium + Destaques em Vermelho)**
- **Prisma ORM + SQLite (`prisma/dev.db`)**
- **Lucide React Icons**
- **JSON Web Token (`jose`) + HTTP-Only Session Cookies**

---

##  Contas Administrativas de Acesso

O painel administrativo (`/admin`) é restrito exclusivamente a 2 contas previamente autorizadas (sem tela de cadastro público):

1. **Henrique (Dev / Admin)**
2. **Maria Fernanda (Corretora / Admin)**


---

##  Como Rodar o Projeto Localmente

### 1. Instalar as dependências
```bash
npm install
```

### 2. Configurar o banco de dados e popular o seed
```bash
npm run db:seed
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

Abra o navegador em [http://localhost:3000](http://localhost:3000).

---

##  Links Úteis

- **Área Pública**: [http://localhost:3000](http://localhost:3000)
- **Imóveis / Busca**: [http://localhost:3000/imoveis](http://localhost:3000/imoveis)
- **Login Administrativo**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Painel Administrativo**: [http://localhost:3000/admin](http://localhost:3000/admin)
