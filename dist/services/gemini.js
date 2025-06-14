"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gemini = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_js_1 = require("../config.js");
class Gemini {
    constructor() {
        const genAI = new generative_ai_1.GoogleGenerativeAI(config_js_1.config.geminiApiKey);
        this.model = genAI.getGenerativeModel({
            model: config_js_1.geminiConfig.model,
            generationConfig: {
                temperature: config_js_1.geminiConfig.temperature,
                topK: config_js_1.geminiConfig.topK,
                topP: config_js_1.geminiConfig.topP,
                maxOutputTokens: config_js_1.geminiConfig.maxOutputTokens,
            },
        });
    }
    /**
     * Verifica a conexão com a API do Gemini
     * @returns Promise<boolean>
     */
    async verifyConnection() {
        try {
            console.log("Verificando conexão com Gemini...");
            const result = await this.model.generateContent("Teste de conexão");
            const response = await result.response;
            console.log("✅ Conexão com Gemini estabelecida");
            return true;
        }
        catch (error) {
            console.error("❌ Erro ao conectar com Gemini:", error);
            return false;
        }
    }
    /**
     * Gera uma resposta usando o Gemini
     * @param prompt - Texto da pergunta
     * @returns Promise<string>
     */
    async generateResponse(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            console.error("Erro ao gerar resposta:", error);
            throw new Error("Falha ao gerar resposta com Gemini");
        }
    }
}
exports.Gemini = Gemini;
//# sourceMappingURL=gemini.js.map