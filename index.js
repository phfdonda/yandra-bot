import qrcode from "qrcode-terminal"
import pkg from "whatsapp-web.js"
import { emHorarioComercial } from "./schedule.js"

const { Client, LocalAuth } = pkg
const client = new Client({
	authStrategy: new LocalAuth(),
})

const mensagem = {
	introducao: "Oie, tudo bem? ☺️",
	resposta: "Vamos agendar sua aula?",
}

client.on("ready", () => {
	console.log("Client is ready!")
})

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true })
})
client.on("message_create", (message) => {
	if (emHorarioComercial(9, 16)) {
		if (message.body === "Oi") {
			console.log("Mensagem recebida: ", message.body)

			client.sendMessage(message.from, mensagem.introducao)
			client.sendMessage(message.from, mensagem.resposta)
		}
	} else {
		client.sendMessage(
			message.from,
			"Desculpe, não estou disponível no momento. Por favor, entre em contato mais tarde."
		)
	}
})

client.initialize()
