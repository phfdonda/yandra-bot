import { Message } from "whatsapp-web.js";
import { MessageHandler, BotContext } from "../types";
export declare class WhatsAppMessageHandler implements MessageHandler {
    private auth;
    constructor();
    /**
     * Verifica se uma mensagem foi enviada pelo bot
     * @param message - Conteúdo da mensagem
     * @returns boolean
     */
    private isBotMessage;
    /**
     * Manipula as mensagens recebidas pelo bot
     * @param message - Objeto da mensagem recebida
     * @param context - Contexto do bot
     */
    handleMessage(message: Message, context: BotContext): Promise<void>;
}
