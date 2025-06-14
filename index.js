// Importando o módulo whatsapp-web.js como um pacote CommonJS
import pkg from "whatsapp-web.js"
const { Client, LocalAuth } = pkg

// Importando outros módulos necessários
import qrcode from "qrcode-terminal"
import dotenv from "dotenv"
import { handleMessage } from "./messageHandler.js"

dotenv.config()

// Inicializa o cliente WhatsApp
const client = new Client({
	authStrategy: new LocalAuth({
		clientId: "yandra-bot",
		dataPath: "./session",
	}),
	puppeteer: {
		headless: true,
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage",
			"--disable-accelerated-2d-canvas",
			"--no-first-run",
			"--no-zygote",
			"--disable-gpu",
			"--disable-extensions",
			"--disable-default-apps",
			"--disable-translate",
			"--disable-sync",
			"--disable-background-networking",
			"--metrics-recording-only",
			"--mute-audio",
			"--no-default-browser-check",
			"--safebrowsing-disable-auto-update",
		],
		executablePath: process.env.CHROME_PATH || undefined,
		timeout: 60000,
		defaultViewport: null,
	},
})

// Debug: Log de todos os eventos
client.on("*", (event, ...args) => {
	console.log("\n=== Evento Detectado ===")
	console.log("Evento:", event)
	console.log("Argumentos:", args)
	console.log("==============================\n")
})

// Gera QR Code para autenticação
client.on("qr", (qr) => {
	console.log("\n=== QR Code Gerado ===")
	console.log("Escaneie o QR Code com seu WhatsApp:")
	qrcode.generate(qr, { small: true })
	console.log("==============================\n")
})

// Evento de autenticação bem-sucedida
client.on("authenticated", () => {
	console.log("\n✅ Cliente autenticado com sucesso!")
	console.log("==============================\n")
})

// Evento de pronto para uso
client.on("ready", () => {
	console.log("\n=== Cliente WhatsApp Pronto ===")
	console.log("Modo:", process.env.BOT_MODE || "development")
	console.log("Admin:", process.env.ADMIN_NUMBER)
	console.log("==============================\n")
})

// Evento de mensagem recebida
client.on("message", async (message) => {
	console.log("\n=== Nova Mensagem ===")
	console.log("De:", message.from)
	console.log("Conteúdo:", message.body)
	console.log("Tipo:", message.type)
	console.log("==============================\n")

	await handleMessage(message, client)
})

// Evento de mensagem criada
client.on("message_create", async (message) => {
	console.log("\n=== Mensagem Criada ===")
	console.log("De:", message.from)
	console.log("Conteúdo:", message.body)
	console.log("Tipo:", message.type)
	console.log("==============================\n")
})

// Evento de mudança de estado
client.on("change_state", (state) => {
	console.log("\n=== Mudança de Estado ===")
	console.log("Novo estado:", state)
	console.log("==============================\n")
})

// Evento de desconexão
client.on("disconnected", (reason) => {
	console.log("\n❌ Cliente desconectado:", reason)
	console.log("==============================\n")
})

// Função para inicializar o cliente com retry
async function initializeWithRetry(retryCount = 0) {
	try {
		console.log("\n=== Iniciando Bot WhatsApp ===")
		console.log("Tentativa:", retryCount + 1)
		await client.initialize()
	} catch (error) {
		console.error("\n❌ Erro ao inicializar cliente:", error)
		if (retryCount < 3) {
			console.log(
				`Tentando novamente em 5 segundos... (tentativa ${
					retryCount + 1
				}/3)`
			)
			setTimeout(() => initializeWithRetry(retryCount + 1), 5000)
		} else {
			console.log("Número máximo de tentativas atingido")
			process.exit(1)
		}
	}
}

// Inicializa o cliente
initializeWithRetry()
