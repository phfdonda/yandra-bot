import { Message } from "whatsapp-web.js"
import { MessageHandler, BotContext } from "../types"
import { Auth } from "../services/auth"
import { BOT_PREFIX } from "../config"

export class WhatsAppMessageHandler implements MessageHandler {
	private auth: Auth

	constructor() {
		this.auth = new Auth()
	}

	/**
	 * Verifica se uma mensagem foi enviada pelo bot
	 * @param message - Conteúdo da mensagem
	 * @returns boolean
	 */
	private isBotMessage(message: string): boolean {
		return message.startsWith(BOT_PREFIX)
	}

	/**
	 * Manipula as mensagens recebidas pelo bot
	 * @param message - Objeto da mensagem recebida
	 * @param context - Contexto do bot
	 */
	async handleMessage(message: Message, context: BotContext): Promise<void> {
		try {
			console.log("\n=== Nova Mensagem Recebida ===")
			console.log("De:", message.from)
			console.log("Conteúdo:", message.body)
			console.log("É do bot:", this.isBotMessage(message.body))
			console.log("==============================\n")

			// Ignora mensagens do bot
			if (this.isBotMessage(message.body)) {
				console.log("Ignorando mensagem do bot")
				return
			}

			// Verifica se o número está autorizado
			if (!this.auth.isAuthorized(message.from)) {
				console.log("Mensagem ignorada - número não autorizado")
				return
			}

			// Processa a mensagem se for do admin
			if (this.auth.isAdmin(message.from)) {
				console.log("Processando mensagem do admin")

				try {
					// Gera resposta do Gemini
					console.log("Gerando resposta com Gemini...")
					const response = await context.gemini.generateResponse(
						message.body
					)
					console.log("Resposta gerada:", response)

					// Envia a resposta
					console.log("Tentando enviar mensagem para:", message.from)
					const chat = await message.getChat()
					console.log("Chat obtido:", chat.id)

					// Adiciona o prefixo do bot na resposta
					await chat.sendMessage(BOT_PREFIX + response)
					console.log("✅ Mensagem enviada com sucesso")
				} catch (error) {
					console.error(
						"❌ Erro ao processar/enviar mensagem:",
						error
					)

					// Tenta enviar mensagem de erro
					try {
						const chat = await message.getChat()
						await chat.sendMessage(
							BOT_PREFIX +
								"Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente."
						)
					} catch (errorMessageError) {
						console.error(
							"Erro ao enviar mensagem de erro:",
							errorMessageError
						)
					}
				}
			} else {
				console.log("Mensagem ignorada - não é do admin")
			}
		} catch (error) {
			console.error("❌ Erro geral ao processar mensagem:", error)
			try {
				if (this.auth.isAdmin(message.from)) {
					const chat = await message.getChat()
					await chat.sendMessage(
						BOT_PREFIX +
							"Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente."
					)
				}
			} catch (errorMessageError) {
				console.error(
					"Erro ao enviar mensagem de erro:",
					errorMessageError
				)
			}
		}
	}
}
