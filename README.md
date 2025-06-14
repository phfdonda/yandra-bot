# Yandra Bot 🤖

Bot do WhatsApp para a Professora Yandra Gomes, utilizando Google Gemini AI para processamento de linguagem natural.

## Funcionalidades

- 💬 Processamento de mensagens usando Google Gemini AI
- ⏰ Agendamento de mensagens
- 🔒 Sistema de autorização para controle de acesso
- 📝 Logs detalhados para monitoramento
- 🎯 Modo de desenvolvimento para testes

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```env
# Configurações do WhatsApp
WHATSAPP_SESSION_PATH=./session

# Configurações do Google Gemini
GOOGLE_API_KEY=sua_chave_api_aqui

# Configurações do Bot
BOT_MODE=development  # ou 'production'
ADMIN_NUMBER=seu_numero_aqui  # Número do administrador com código do país (ex: 5511999999999)
```

## Uso

### Desenvolvimento
No modo de desenvolvimento (`BOT_MODE=development`):
- Apenas o número do administrador pode interagir com o bot
- Mensagens de outros números são silenciosamente ignoradas
- Logs detalhados são exibidos no console para monitoramento

### Produção
No modo de produção (`BOT_MODE=production`):
- Todos os números podem interagir com o bot
- Logs são mantidos para monitoramento

## Estrutura do Projeto

```
.
├── src/
│   ├── bot.js          # Configuração principal do bot
│   ├── messageHandler.js # Manipulação de mensagens
│   ├── scheduler.js    # Agendamento de mensagens
│   ├── gemini.js       # Integração com Google Gemini AI
│   └── auth.js         # Sistema de autorização
├── .env               # Configurações do ambiente
└── package.json       # Dependências do projeto
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 