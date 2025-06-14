import dotenv from "dotenv"

dotenv.config()

// Configurações de autorização
const BOT_MODE = process.env.BOT_MODE || "development"
const ADMIN_NUMBER = process.env.ADMIN_NUMBER

/**
 * Verifica se a mensagem é de um grupo
 * @param {string} phoneNumber - Número de telefone no formato do WhatsApp
 * @returns {boolean} Verdadeiro se for mensagem de grupo
 */
export function isGroupMessage(phoneNumber) {
	return phoneNumber.endsWith("@g.us")
}

/**
 * Normaliza um número de telefone para comparação
 * @param {string} phoneNumber - Número de telefone no formato do WhatsApp
 * @returns {string} Número normalizado
 */
export function normalizePhoneNumber(phoneNumber) {
	// Remove o sufixo @c.us do número do WhatsApp
	return phoneNumber.replace("@c.us", "")
}

/**
 * Verifica se um número está autorizado a interagir com o bot
 * @param {string} phoneNumber - Número de telefone do usuário
 * @returns {boolean} Verdadeiro se o número estiver autorizado
 */
export function isAuthorized(phoneNumber) {
	// Ignora imediatamente mensagens de grupos
	if (isGroupMessage(phoneNumber)) {
		console.log("Mensagem ignorada - é de um grupo")
		return false
	}

	const normalizedNumber = normalizePhoneNumber(phoneNumber)
	console.log("=== Verificação de Autorização ===")
	console.log("Número recebido:", phoneNumber)
	console.log("Número normalizado:", normalizedNumber)
	console.log("Número admin:", ADMIN_NUMBER)
	console.log("Modo:", BOT_MODE)

	// Em modo de desenvolvimento, apenas o admin pode interagir
	if (BOT_MODE === "development") {
		const isAdmin = normalizedNumber === ADMIN_NUMBER
		console.log("É admin:", isAdmin)
		console.log("==============================\n")
		return isAdmin
	}

	// Em modo de produção, todos os números são autorizados
	console.log("Modo produção - número autorizado")
	console.log("==============================\n")
	return true
}

/**
 * Verifica se o número é do administrador
 * @param {string} phoneNumber - Número de telefone do usuário
 * @returns {boolean} Verdadeiro se for o número do administrador
 */
export function isAdmin(phoneNumber) {
	const normalizedNumber = normalizePhoneNumber(phoneNumber)
	return normalizedNumber === ADMIN_NUMBER
}
