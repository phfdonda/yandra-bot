"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const config_1 = require("../config");
class Auth {
    /**
     * Verifica se uma mensagem é de um grupo
     * @param phoneNumber - Número do telefone
     * @returns boolean
     */
    isGroupMessage(phoneNumber) {
        return phoneNumber.endsWith("@g.us");
    }
    /**
     * Verifica se um número está autorizado a interagir com o bot
     * @param phoneNumber - Número do telefone
     * @returns boolean
     */
    isAuthorized(phoneNumber) {
        // Ignora mensagens de grupos
        if (this.isGroupMessage(phoneNumber)) {
            console.log("Mensagem ignorada - é de um grupo");
            return false;
        }
        // Em modo de desenvolvimento, apenas o admin pode interagir
        if (config_1.config.isDevelopment) {
            return this.isAdmin(phoneNumber);
        }
        // Em produção, qualquer número pode interagir
        return true;
    }
    /**
     * Verifica se um número é o admin do bot
     * @param phoneNumber - Número do telefone
     * @returns boolean
     */
    isAdmin(phoneNumber) {
        // Remove caracteres especiais para comparação
        const normalizedPhone = phoneNumber.replace(/[^0-9]/g, "");
        const normalizedAdmin = config_1.config.adminNumber.replace(/[^0-9]/g, "");
        return normalizedPhone === normalizedAdmin;
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map