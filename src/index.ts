// @ts-ignore
import { Client, LocalAuth } from "whatsapp-web.js"
import qrcode from "qrcode-terminal"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { config } from "./config.js"
import { Gemini } from "./services/gemini.js"
import { WhatsAppMessageHandler } from "./handlers/messageHandler.js"
import { BotContext } from "./types/index.js"

async function main() {
	try {
		console.log("🚀 Iniciando bot...")

		// Inicializa o cliente do WhatsApp
		const client = new Client({
			authStrategy: new LocalAuth(),
			puppeteer: {
				args: [
					"--no-sandbox",
					"--disable-setuid-sandbox",
					"--disable-dev-shm-usage",
					"--disable-accelerated-2d-canvas",
					"--no-first-run",
					"--no-zygote",
					"--disable-gpu",
				],
				headless: true,
			},
		})

		// Inicializa o Gemini
		console.log("Verificando conexão com Gemini...")
		const gemini = new Gemini()
		const isConnected = await gemini.verifyConnection()
		if (!isConnected) {
			throw new Error("Falha ao conectar com Gemini")
		}
		console.log("✅ Conexão com Gemini estabelecida")

		// Inicializa o manipulador de mensagens
		const messageHandler = new WhatsAppMessageHandler()

		// Configura o contexto do bot
		const context: BotContext = {
			client,
			gemini,
			config,
		}

		// Evento de QR Code
		client.on("qr", (qr) => {
			console.log("QR Code recebido, escaneie com seu WhatsApp:")
			qrcode.generate(qr, { small: true })
		})

		// Evento de autenticação
		client.on("authenticated", () => {
			console.log("✅ Autenticado com sucesso!")
		})

		// Evento de pronto
		client.on("ready", () => {
			console.log("✅ Cliente WhatsApp pronto para receber mensagens!")
		})

		// Evento de desconexão
		client.on("disconnected", (reason) => {
			console.log("❌ Cliente desconectado:", reason)
		})

		// Evento de mensagem
		client.on("message", async (message) => {
			try {
				console.log("\n📨 Nova mensagem recebida")
				await messageHandler.handleMessage(message, context)
			} catch (error) {
				console.error("❌ Erro ao processar mensagem:", error)
			}
		})

		// Evento de erro
		client.on("auth_failure", (error) => {
			console.error("❌ Falha na autenticação:", error)
		})

		// Evento de erro geral
		client.on("error", (error) => {
			console.error("❌ Erro no cliente WhatsApp:", error)
		})

		// Inicializa o cliente
		console.log("Inicializando cliente WhatsApp...")
		await client.initialize()
		console.log("✅ Bot iniciado com sucesso!")
	} catch (error) {
		console.error("❌ Erro ao iniciar bot:", error)
		process.exit(1)
	}
}

main()
