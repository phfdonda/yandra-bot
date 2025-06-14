import { Client, LocalAuth } from "whatsapp-web.js"
import qrcode from "qrcode-terminal"
import dotenv from "dotenv"
import { handleMessage } from "./messageHandler.js"

dotenv.config()

// Configuração do cliente WhatsApp
const client = new Client({
	authStrategy: new LocalAuth({
		clientId: "yandra-bot",
		dataPath: process.env.WHATSAPP_SESSION_PATH || "./session",
	}),
	puppeteer: {
		args: ["--no-sandbox"],
	},
})

// Gera QR Code para autenticação
client.on("qr", (qr) => {
	console.log("QR Code recebido, escaneie-o com seu WhatsApp:")
	qrcode.generate(qr, { small: true })
})

// Evento de autenticação bem-sucedida
client.on("authenticated", () => {
	console.log("Cliente autenticado com sucesso!")
})

// Evento de pronto para uso
client.on("ready", () => {
	console.log("Cliente está pronto!")
	console.log("Modo:", process.env.BOT_MODE || "development")
	console.log("Admin:", process.env.ADMIN_NUMBER)
})

// Manipula mensagens recebidas
client.on("message", async (message) => {
	await handleMessage(message, client)
})

// Inicializa o cliente
client.initialize()
