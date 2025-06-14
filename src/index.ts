// @ts-ignore
import { Client, LocalAuth } from "whatsapp-web.js"
import qrcode from "qrcode-terminal"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { config } from "./config"
import { Gemini } from "./services/gemini"
import { WhatsAppMessageHandler } from "./handlers/messageHandler"
import { BotContext } from "./types"
import fs from "fs"
import path from "path"

async function main() {
	try {
		console.log("🚀 Iniciando bot...")

		// Verifica se existe uma sessão salva
		const sessionPath = path.join(process.cwd(), ".wwebjs_auth")
		const hasSession = fs.existsSync(sessionPath)

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
		const gemini = new Gemini()
		const isConnected = await gemini.verifyConnection()
		if (!isConnected) {
			throw new Error("Falha ao conectar com Gemini")
		}

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
			if (!hasSession) {
				console.log("QR Code recebido, escaneie com seu WhatsApp:")
				qrcode.generate(qr, { small: true })
			}
		})

		// Evento de autenticação
		client.on("authenticated", () => {
			console.log("✅ Autenticado com sucesso!")
		})

		// Evento de pronto
		client.on("ready", () => {
			console.log("✅ Cliente WhatsApp pronto!")
		})

		// Evento de mensagem
		client.on("message", async (message) => {
			await messageHandler.handleMessage(message, context)
		})

		// Evento de erro
		client.on("auth_failure", (error) => {
			console.error("❌ Falha na autenticação:", error)
		})

		// Evento de desconexão
		client.on("disconnected", (reason) => {
			console.log("❌ Cliente desconectado:", reason)
		})

		// Inicializa o cliente
		await client.initialize()
		console.log("✅ Bot iniciado com sucesso!")
	} catch (error) {
		console.error("❌ Erro ao iniciar bot:", error)
		process.exit(1)
	}
}

main()
