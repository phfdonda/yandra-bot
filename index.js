import qrcode from "qrcode-terminal"
import zapWeb from "whatsapp-web.js"
import { foraDoHorarioComercial } from "./horario.js"
import { Conversa } from "./conversa.js"

const { Client, LocalAuth } = zapWeb
const conversasAtivas = {}
const client = new Client({
	authStrategy: new LocalAuth(),
})

const mensagem = {
	introducao: "Oie, tudo bem? ☺️",
	resposta: "Vamos agendar sua aula?",
	foraDoHorario:
		"Boa tarde, tudo bem?\n\nRealizamos aulas on-line com todo o suporte e acompanhamento para o aluno.\n\n💬 Nosso horário de atendimento é de:\n\n🕗 Segunda a Quinta, das 09h às 19h\n\n🚫Exceto feriados\n\n😊 Te atenderemos assim que iniciar o expediente!",
	direcionamento:
		"Se quiser marcar uma aula, clique no link abaixo: \nhttps://calendly.com/phfdonda/aula-de-90min",
}

client.on("ready", () => {
	console.log("Client is ready!")
})

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true })
})
client.on("message_create", async (message) => {
	const clienteId = message.from
	let conversa = conversasAtivas[clienteId]
	if (message.body === "!TESTE") {
		if (!conversa) {
			// Obter informações do contato
			const contact = await message.getContact()
			console.log("contact", contact)

			const nomeCliente =
				contact.pushname ||
				contact.name ||
				contact.shortName ||
				"aluno querido"

			// Criar uma nova instância de Conversa
			conversa = new Conversa(nomeCliente, () => {
				delete conversasAtivas[clienteId] // Remove a conversa do cache
			})
			conversasAtivas[clienteId] = conversa

			console.log(`Nova conversa iniciada com ${nomeCliente}`)
		}
		if (foraDoHorarioComercial() && message.body !== "!TESTE") {
			client.sendMessage(clienteId, mensagem.foraDoHorario)
			client.sendMessage(clienteId, mensagem.direcionamento)
			return
		}
		console.log("Mensagem recebida: ", message.body)

		client.sendMessage(clienteId, mensagem.introducao)
		client.sendMessage(clienteId, mensagem.resposta)
	}
})

client.initialize()
