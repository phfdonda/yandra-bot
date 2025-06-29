import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"
import { GeminiService } from "../types/index.js"
import { config, geminiConfig } from "../config.js"

export class Gemini implements GeminiService {
	private model: GenerativeModel

	constructor() {
		console.log("Inicializando serviço Gemini...")
		const genAI = new GoogleGenerativeAI(config.geminiApiKey)
		this.model = genAI.getGenerativeModel({
			model: geminiConfig.model,
			generationConfig: {
				temperature: geminiConfig.temperature,
				topK: geminiConfig.topK,
				topP: geminiConfig.topP,
				maxOutputTokens: geminiConfig.maxOutputTokens,
			},
		})
		console.log("✅ Serviço Gemini inicializado")
	}

	/**
	 * Verifica a conexão com a API do Gemini
	 * @returns Promise<boolean>
	 */
	async verifyConnection(): Promise<boolean> {
		try {
			console.log("Verificando conexão com Gemini...")
			const result = await this.model.generateContent("Teste de conexão")
			const response = await result.response
			console.log("✅ Conexão com Gemini estabelecida")
			return true
		} catch (error) {
			console.error("❌ Erro ao conectar com Gemini:", error)
			return false
		}
	}

	/**
	 * Gera uma resposta usando o Gemini
	 * @param prompt - Texto da pergunta
	 * @returns Promise<string>
	 */
	async generateResponse(prompt: string): Promise<string> {
		try {
			console.log("Gerando resposta para:", prompt)
			const result = await this.model.generateContent(prompt)
			const response = await result.response
			const text = response.text()
			console.log("Resposta gerada:", text)
			return text
		} catch (error) {
			console.error("Erro ao gerar resposta:", error)
			throw new Error("Falha ao gerar resposta com Gemini")
		}
	}
}
