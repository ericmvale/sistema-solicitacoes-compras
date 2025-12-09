
# 🧾 Sistema de Solicitações de Compras  
### Projeto Integrador – Análise de soluções integradas para organizações
Este repositório foi desenvolvido como parte do Projeto Integrador do 5º período de Análise e Desenvolvimento de Sistemas – SENAC.

A aplicação implementa, as telas e fluxos definidos no documento oficial do projeto. O objetivo é demonstrar a interface funcional e validar a experiência do usuário baseada no protótipo.

---

## 📘 Contexto do Projeto (PDF – 1ª Entrega)

Conforme o documento oficial do Projeto Integrador, o sistema foi idealizado para solucionar problemas reais do processo atual de solicitações internas de compras e serviços, que hoje ocorre de forma descentralizada e manual.

O sistema tem como objetivos:

- Padronizar o processo de solicitações  
- Reduzir retrabalho e falhas humanas  
- Melhorar a comunicação entre setores  
- Facilitar a tomada de decisão  
- Criar uma base para futuras integrações internas  

O PDF apresenta ainda as **personas**, **jornada do usuário** e o **protótipo de telas**, que serviram como base para esta implementação em React.

---

## 🧩 Funcionalidades Implementadas

Com base no protótipo definido no Figma e descrito no PDF, esta PoC implementa:

- **Tela de Login**
- **Dashboard inicial**
- **Formulário de Solicitação de Compras**, contendo campos:
  - Filial  
  - Solicitante  
  - Categoria  
  - Prioridade  
  - Centro de Custo  
  - Quantidade  
  - Valor Estimado  
  - Justificativa  
  - Descrição da solicitação  
- Validações básicas
- Componentes visuais padronizados  
- Layout responsivo  
- Navegação entre as telas principais

---

## 🛠 Tecnologias Utilizadas

As tecnologias foram extraídas do arquivo `package.json` do projeto:

- **React 18**
- **TypeScript**
- **Vite**
- **Radix UI**
- **shadcn/ui** (biblioteca baseada em Radix)
- **React Hook Form**
- **Sonner** (notificações)
- **Embla Carousel**
- **Recharts**
- **Tailwind Merge**
- **Lucide React**

Essas dependências estão presentes no projeto e foram utilizadas na composição dos componentes e da estrutura visual.

---

## 📂 Estrutura do Repositório

```
/
├── src/
│   ├── components/      # Componentes e telas do sistema
│   ├── guidelines/      # Arquivos auxiliares
│   ├── styles/          # Estilos globais
│   ├── App.tsx          # Estrutura principal
│   └── main.tsx         # Ponto de entrada do React
├── index.html           # HTML base da aplicação
├── package.json         # Dependências e scripts
├── vite.config.ts       # Configuração Vite/React
└── README.md            # Documentação
```

## ▶️ Como Executar o Projeto

Para rodar a aplicação localmente:

### 1️⃣ Instale as dependências

```bash
npm install
```

### 2️⃣ Execute o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:5173
```


## 👥 Integrantes do Grupo

- **Eric Matheus Souza do Vale** — @ericmvale  
- **João Francisco de Souza Ferreira** — @JoaoFranciscoSF  
- **Lavinia Talissa Machado** — @laviniat05  
- **Lorena Brito Cartaxo** — @lorenacartaxo  
- **Lucas Ferreira dos Santos** — @CalmLikeab0mb
