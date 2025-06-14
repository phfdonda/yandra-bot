import { Client } from "whatsapp-web.js"

/**
 * Agenda uma mensagem para ser enviada em um horário específico
 * @param {Client} client - Cliente do WhatsApp
 * @param {string} to - Número de destino
 * @param {string} message - Mensagem a ser enviada
 * @param {Date} scheduledTime - Horário agendado
 * @returns {Promise<void>}
 */
export async function scheduleMessage(client, to, message, scheduledTime) {
	try {
		const now = new Date()
		const delay = scheduledTime.getTime() - now.getTime()

		if (delay < 0) {
			console.error("Horário agendado já passou")
			return
		}

		console.log(`Mensagem agendada para ${scheduledTime.toLocaleString()}`)

		setTimeout(async () => {
			try {
				await client.sendMessage(to, message)
				console.log("Mensagem agendada enviada com sucesso")
			} catch (error) {
				console.error("Erro ao enviar mensagem agendada:", error)
			}
		}, delay)
	} catch (error) {
		console.error("Erro ao agendar mensagem:", error)
	}
}
