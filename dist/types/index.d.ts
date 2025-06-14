import { Client, Message } from "whatsapp-web.js";
export interface BotConfig {
    adminNumber: string;
    isDevelopment: boolean;
    geminiApiKey: string;
}
export interface GeminiConfig {
    model: string;
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
}
export interface BotContext {
    client: Client;
    gemini: GeminiService;
    config: BotConfig;
}
export interface MessageHandler {
    handleMessage(message: Message, context: BotContext): Promise<void>;
}
export interface AuthService {
    isAuthorized(phoneNumber: string): boolean;
    isAdmin(phoneNumber: string): boolean;
    isGroupMessage(phoneNumber: string): boolean;
}
export interface GeminiService {
    generateResponse(prompt: string): Promise<string>;
    verifyConnection(): Promise<boolean>;
}
