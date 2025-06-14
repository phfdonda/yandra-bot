import { AuthService } from "../types";
export declare class Auth implements AuthService {
    /**
     * Verifica se uma mensagem é de um grupo
     * @param phoneNumber - Número do telefone
     * @returns boolean
     */
    isGroupMessage(phoneNumber: string): boolean;
    /**
     * Verifica se um número está autorizado a interagir com o bot
     * @param phoneNumber - Número do telefone
     * @returns boolean
     */
    isAuthorized(phoneNumber: string): boolean;
    /**
     * Verifica se um número é o admin do bot
     * @param phoneNumber - Número do telefone
     * @returns boolean
     */
    isAdmin(phoneNumber: string): boolean;
}
