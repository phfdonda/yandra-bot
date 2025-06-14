"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const config_1 = require("./config");
const gemini_1 = require("./services/gemini");
const messageHandler_1 = require("./handlers/messageHandler");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function main() {
    try {
        console.log("🚀 Iniciando bot...");
        // Verifica se existe uma sessão salva
        const sessionPath = path_1.default.join(process.cwd(), ".wwebjs_auth");
        const hasSession = fs_1.default.existsSync(sessionPath);
        // Inicializa o cliente do WhatsApp
        const client = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.LocalAuth(),
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
        });
        // Inicializa o Gemini
        const gemini = new gemini_1.Gemini();
        const isConnected = await gemini.verifyConnection();
        if (!isConnected) {
            throw new Error("Falha ao conectar com Gemini");
        }
        // Inicializa o manipulador de mensagens
        const messageHandler = new messageHandler_1.WhatsAppMessageHandler();
        // Configura o contexto do bot
        const context = {
            client,
            gemini,
            config: config_1.config,
        };
        // Evento de QR Code
        client.on("qr", (qr) => {
            if (!hasSession) {
                console.log("QR Code recebido, escaneie com seu WhatsApp:");
                qrcode_terminal_1.default.generate(qr, { small: true });
            }
        });
        // Evento de autenticação
        client.on("authenticated", () => {
            console.log("✅ Autenticado com sucesso!");
        });
        // Evento de pronto
        client.on("ready", () => {
            console.log("✅ Cliente WhatsApp pronto!");
        });
        // Evento de mensagem
        client.on("message", async (message) => {
            await messageHandler.handleMessage(message, context);
        });
        // Evento de erro
        client.on("auth_failure", (error) => {
            console.error("❌ Falha na autenticação:", error);
        });
        // Evento de desconexão
        client.on("disconnected", (reason) => {
            console.log("❌ Cliente desconectado:", reason);
        });
        // Inicializa o cliente
        await client.initialize();
        console.log("✅ Bot iniciado com sucesso!");
    }
    catch (error) {
        console.error("❌ Erro ao iniciar bot:", error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map