export class Conversa {
	constructor(nomeCliente, removerConversaCallback) {
		this.nomeCliente = nomeCliente || "aluno querido" // Nome do cliente ou fallback
		this.mensagens = [] // Lista de mensagens trocadas
		this.removerConversaCallback = removerConversaCallback // Callback para remover a conversa
		this.timeout = null // Referência ao temporizador
	}

	adicionarMensagem(mensagem) {
		this.mensagens.push(mensagem) // Adiciona a mensagem à lista
		this.resetarTimeout() // Reinicia o temporizador a cada mensagem
	}

	resetarTimeout() {
		// Cancela o temporizador anterior, se existir
		if (this.timeout) {
			clearTimeout(this.timeout)
		}

		// Configura um novo temporizador para encerrar a conversa após 30 minutos
		this.timeout = setTimeout(() => {
			if (this.removerConversaCallback) {
				this.removerConversaCallback() // Remove a conversa do cache
			}
			console.log(
				`Conversa com ${this.nomeCliente} foi encerrada por inatividade.`
			)
		}, 30 * 60 * 1000) // 30 minutos
	}
}
