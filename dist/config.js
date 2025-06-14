"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiConfig = exports.config = exports.BOT_PREFIX = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.BOT_PREFIX = "🤖 ";
exports.config = {
    adminNumber: process.env.ADMIN_NUMBER || "",
    isDevelopment: process.env.NODE_ENV === "development",
    geminiApiKey: process.env.GEMINI_API_KEY || "",
};
exports.geminiConfig = {
    model: "gemini-1.5-flash",
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
};
// Validação das configurações
if (!exports.config.adminNumber) {
    throw new Error("ADMIN_NUMBER não configurado no .env");
}
if (!exports.config.geminiApiKey) {
    throw new Error("GEMINI_API_KEY não configurada no .env");
}
//# sourceMappingURL=config.js.map