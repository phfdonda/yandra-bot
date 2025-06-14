import { AuthService } from "../types"
import { config } from "../config"

export class Auth implements AuthService {
	/**
	 * Verifica se uma mensagem é de um grupo
	 * @param phoneNumber - Número do telefone
	 * @returns boolean
	 */
	isGroupMessage(phoneNumber: string): boolean {
		return phoneNumber.endsWith("@g.us")
	}

	/**
	 * Verifica se um número está autorizado a interagir com o bot
	 * @param phoneNumber - Número do telefone
	 * @returns boolean
	 */
	isAuthorized(phoneNumber: string): boolean {
		// Ignora mensagens de grupos
		if (this.isGroupMessage(phoneNumber)) {
			console.log("Mensagem ignorada - é de um grupo")
			return false
		}

		// Em desenvolvimento, apenas o admin pode interagir
		if (config.isDevelopment) {
			return this.isAdmin(phoneNumber)
		}

		// Em produção, qualquer número pode interagir
		return true
	}

	/**
	 * Verifica se um número é o admin do bot
	 * @param phoneNumber - Número do telefone
	 * @returns boolean
	 */
	isAdmin(phoneNumber: string): boolean {
		// Remove caracteres especiais para comparação
		const normalizedPhone = phoneNumber.replace(/[^0-9]/g, "")
		const normalizedAdmin = config.adminNumber.replace(/[^0-9]/g, "")

		console.log("Comparando números:")
		console.log("Número recebido:", normalizedPhone)
		console.log("Número admin:", normalizedAdmin)

		return normalizedPhone === normalizedAdmin
	}
}
