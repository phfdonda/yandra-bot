/**
 * Classe que gerencia o estado de uma conversa com um aluno
 */
export class Conversa {
	/**
	 * @param {string} nomeCliente - Nome do aluno
	 * @param {Function} onEnd - Callback chamado quando a conversa termina
	 */
	constructor(nomeCliente, onEnd) {
		this.nomeCliente = nomeCliente
		this.onEnd = onEnd
		this.historico = []
		this.ultimaInteracao = Date.now()
		this.timeout = null

		// Configura timeout para limpar conversa inativa
		this.resetTimeout()
	}

	/**
	 * Adiciona uma mensagem ao histórico da conversa
	 * @param {string} mensagem - Mensagem do aluno
	 * @param {string} resposta - Resposta do bot
	 */
	adicionarMensagem(mensagem, resposta) {
		this.historico.push({
			timestamp: new Date(),
			mensagem,
			resposta,
		})

		// Mantém apenas as últimas 10 mensagens
		if (this.historico.length > 10) {
			this.historico.shift()
		}

		this.resetTimeout()
	}

	/**
	 * Reseta o timeout de inatividade
	 */
	resetTimeout() {
		if (this.timeout) {
			clearTimeout(this.timeout)
		}

		// Limpa a conversa após 30 minutos de inatividade
		this.timeout = setTimeout(() => {
			this.onEnd()
		}, 30 * 60 * 1000)
	}

	/**
	 * Retorna o contexto da conversa para o Gemini AI
	 * @returns {string} Contexto formatado
	 */
	getContexto() {
		return this.historico
			.map((h) => `Aluno: ${h.mensagem}\nBot: ${h.resposta}`)
			.join("\n\n")
	}
}
