import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"

dotenv.config()

// Verifica se a API key está definida
if (!process.env.GOOGLE_API_KEY) {
	console.error("❌ GOOGLE_API_KEY não está definida no arquivo .env")
	process.exit(1)
}

console.log(
	"API Key encontrada:",
	process.env.GOOGLE_API_KEY.substring(0, 5) +
		"..." +
		process.env.GOOGLE_API_KEY.substring(
			process.env.GOOGLE_API_KEY.length - 5
		)
)

// Inicializa o cliente do Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

// Configuração do modelo Gemini
const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
	generationConfig: {
		temperature: 0.7,
		topK: 40,
		topP: 0.95,
		maxOutputTokens: 1024,
	},
})

// Contexto inicial para o modelo
const CONTEXT = `Você é um assistente virtual da Professora Yandra Gomes, professora particular de matemática e outras disciplinas exatas.
Seu objetivo é ajudar os alunos e seus responsáveis com dúvidas e agendamentos de aulas.
Mantenha um tom profissional mas amigável. Use emojis para melhorar a experiência do usuário.
Seja conciso e direto nas respostas.
Para agendamentos, sempre direcione para o link do Calendly: https://calendly.com/phfdonda/aula-de-90min`

// Verifica conexão com Gemini
async function verificarConexaoGemini() {
	try {
		console.log("\n=== Verificando conexão com Gemini AI ===")
		console.log("Modelo:", model.model)
		console.log("Configurações:", model.generationConfig)

		const result = await model.generateContent("Teste de conexão")
		const response = await result.response
		console.log("✅ Conexão com Gemini AI estabelecida com sucesso!")
		console.log("Resposta de teste:", response.text())
		console.log("=======================================\n")
		return true
	} catch (error) {
		console.error("❌ Erro ao conectar com Gemini AI:", error)
		if (error.message.includes("API key not valid")) {
			console.error(
				"A API key parece estar inválida. Por favor, verifique se:"
			)
			console.error("1. A API key está correta no arquivo .env")
			console.error("2. A API key tem permissões para usar o Gemini API")
			console.error("3. A API key não expirou")
		}
		console.log("=======================================\n")
		return false
	}
}

// Inicia verificação de conexão
verificarConexaoGemini()

/**
 * Gera uma resposta usando o Google Gemini AI
 * @param {string} message - Mensagem do usuário
 * @returns {Promise<string>} Resposta gerada
 */
export async function generateResponse(message) {
	try {
		// Adiciona o contexto à mensagem
		const prompt = `${CONTEXT}\n\nMensagem do usuário: ${message}`

		// Gera a resposta
		const result = await model.generateContent(prompt)
		const response = await result.response
		const text = response.text()

		console.log("Resposta gerada:", text)
		return text
	} catch (error) {
		console.error("Erro ao gerar resposta:", error)
		if (error.message.includes("API key not valid")) {
			return "Desculpe, estou tendo problemas técnicos com minha conexão. Por favor, tente novamente mais tarde ou entre em contato com a professora Yandra."
		}
		return "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde."
	}
}

/**
 * Analisa a mensagem para determinar se é uma dúvida acadêmica
 * @param {string} message - A mensagem do usuário
 * @returns {Promise<boolean>} Verdadeiro se for uma dúvida acadêmica
 */
export async function isAcademicQuestion(message) {
	try {
		console.log("\n=== Analisando se é dúvida acadêmica ===")
		console.log("Mensagem:", message)

		const prompt = `Analise se a seguinte mensagem é uma dúvida acadêmica sobre matemática ou outras disciplinas exatas: "${message}"
        Responda apenas com "sim" ou "não".`

		const result = await model.generateContent(prompt)
		const response = await result.response
		const resposta = response.text().toLowerCase()

		console.log("Resposta da análise:", resposta)
		console.log("É dúvida acadêmica:", resposta.includes("sim"))
		console.log("=======================================\n")

		return resposta.includes("sim")
	} catch (error) {
		console.error("Erro ao analisar mensagem:", error)
		return false
	}
}
