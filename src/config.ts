import { BotConfig, GeminiConfig } from "./types/index.js"
import dotenv from "dotenv"

dotenv.config()

export const BOT_PREFIX = "🤖 "

export const config: BotConfig = {
	adminNumber: process.env.ADMIN_NUMBER || "",
	isDevelopment: process.env.NODE_ENV === "development",
	geminiApiKey: process.env.GEMINI_API_KEY || "",
}

export const geminiConfig: GeminiConfig = {
	model: "gemini-1.5-flash",
	temperature: 0.7,
	topK: 40,
	topP: 0.95,
	maxOutputTokens: 1024,
}

// Validação das configurações
if (!config.adminNumber) {
	throw new Error("ADMIN_NUMBER não configurado no .env")
}

if (!config.geminiApiKey) {
	throw new Error("GEMINI_API_KEY não configurada no .env")
}
