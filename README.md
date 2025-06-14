# Yandra Bot 🤖

Bot do WhatsApp para a Professora Yandra Gomes, utilizando Google Gemini AI para respostas automatizadas.

## 🚀 Funcionalidades

- Respostas automáticas usando Google Gemini AI
- Modo de desenvolvimento (apenas admin) e produção (todos)
- Ignora mensagens de grupos
- Sistema de prefixo para evitar loops de resposta
- Logs detalhados para debug

## 📋 Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Conta no Google Cloud com API do Gemini ativada

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/yandra-bot.git
cd yandra-bot
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
ADMIN_NUMBER=5561999999999
GEMINI_API_KEY=sua-chave-api
NODE_ENV=development
```

## 🚀 Uso

### Desenvolvimento
```bash
npm run dev
```
O modo de desenvolvimento usa o tsup em modo watch, que recompila automaticamente o código quando há alterações.

### Produção
```bash
npm run build
npm start
```
O build de produção usa o tsup para:
- Minificar o código
- Otimizar o bundle
- Gerar um único arquivo de saída
- Limpar a pasta dist antes de cada build

## 📁 Estrutura do Projeto

```
src/
├── config.ts           # Configurações do bot
├── index.ts           # Arquivo principal
├── types/             # Definições de tipos
│   └── index.ts
├── services/          # Serviços
│   ├── auth.ts       # Autenticação
│   └── gemini.ts     # Integração com Gemini
└── handlers/          # Manipuladores
    └── messageHandler.ts
```

## 🔍 Logs

O bot possui um sistema de logs detalhado que mostra:
- Conexão com WhatsApp
- Conexão com Gemini
- Mensagens recebidas
- Processamento de mensagens
- Erros e exceções

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## ✨ Agradecimentos

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [Google Generative AI](https://ai.google.dev/) 