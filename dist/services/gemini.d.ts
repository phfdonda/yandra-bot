import { GeminiService } from "../types/index.js";
export declare class Gemini implements GeminiService {
    private model;
    constructor();
    /**
     * Verifica a conexão com a API do Gemini
     * @returns Promise<boolean>
     */
    verifyConnection(): Promise<boolean>;
    /**
     * Gera uma resposta usando o Gemini
     * @param prompt - Texto da pergunta
     * @returns Promise<string>
     */
    generateResponse(prompt: string): Promise<string>;
}
