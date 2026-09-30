# 🎯 ENEM Nota Max

Plataforma web de estudos para o **ENEM**, criada para ajudar estudantes a aprender com mais foco e menos tempo perdido. Resumos diretos, mapas mentais, videoaulas e estratégias de prova em um só lugar, com design original e uso confortável no celular.

## ✨ Funcionalidades

- **Mural de assuntos:** cerca de 60 temas organizados nas 5 áreas do ENEM (Linguagens, Matemática, Ciências Humanas, Ciências da Natureza e Redação).
- **Resumos objetivos:** texto curto e direto, com pontos-chave e "o que mais cai na prova".
- **Mapas mentais interativos:** diagramas por tema (ex.: Meio Ambiente) com zoom, arrastar e modo lista.
- **Videoaulas:** biblioteca de vídeos educativos sobre o ENEM, com filtro por área.
- **Dicas de tempo e planejador:** estratégias para reservar o tempo na prova e nos estudos, com um planejador de horas por área.
- **Banco de repertório para a redação:** citações, leis, obras e dados, com o eixo temático em que cada um se encaixa.

## 🚧 Em desenvolvimento

- Mapas mentais gerados por IA a partir de um tema digitado pelo usuário, com blocos em vários níveis, explicação em cada bloco e vídeo nos blocos mais complexos.
- Videoaulas reais carregadas pela YouTube Data API.
- Ampliação do banco de repertórios.

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Interface | React 19, TypeScript |
| Estilo | Tailwind CSS 4, Motion, Lucide Icons |
| Build | Vite |
| Servidor | Express |
| IA | Google Gemini (`@google/genai`) |

## 📁 Estrutura

```
src/
├── components/   # Navbar, Footer, MindMapViewer, VideoEmbed, TimePlanner
├── pages/        # Home, Vídeos, Assunto, Dicas, Mapas mentais, Citações
├── data/         # Assuntos por área, mapas mentais, vídeos, citações, dicas
└── types/        # Tipos TypeScript
```

## 🚀 Como rodar localmente

**Pré-requisito:** Node.js

```bash
# 1. Instale as dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.example .env.local
# edite o .env.local e preencha GEMINI_API_KEY

# 3. Inicie o projeto
npm run dev
```

O site abre em `http://localhost:3000`.

## 🔐 Variáveis de ambiente

| Variável | Uso |
|---|---|
| `GEMINI_API_KEY` | Chave da API do Gemini (somente no servidor) |
| `YOUTUBE_API_KEY` | Chave da YouTube Data API (vídeos reais) |

> Nunca envie suas chaves para o GitHub. Mantenha o `.env.local` no `.gitignore`.

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas. Abra uma *issue* ou envie um *pull request*.

## 📄 Licença

Defina a licença do projeto (ex.: MIT).
