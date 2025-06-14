import dotenv from "dotenv"

dotenv.config()

// Configuração de horário comercial
const HORARIO_COMERCIAL = {
	dias: {
		1: { inicio: 0, fim: 0 }, // Segunda
		2: { inicio: 13, fim: 20 }, // Terça
		3: { inicio: 11, fim: 20 }, // Quarta
		4: { inicio: 11, fim: 18 }, // Quinta
		5: { inicio: 0, fim: 0 }, // Sexta
		6: { inicio: 0, fim: 0 }, // Sábado (fechado)
		0: { inicio: 0, fim: 0 }, // Domingo (fechado)
	},
	feriados: ["2025-06-19"], // Lista de feriados (formato: 'YYYY-MM-DD')
}

/**
 * Verifica se uma data é feriado
 * @param {Date} data - Data a ser verificada
 * @returns {boolean} Verdadeiro se for feriado
 */
function isFeriado(data) {
	const dataFormatada = data.toISOString().split("T")[0] // Formato: YYYY-MM-DD
	return HORARIO_COMERCIAL.feriados.includes(dataFormatada)
}

/**
 * Verifica se o horário atual está fora do horário comercial
 * @returns {boolean} Verdadeiro se estiver fora do horário comercial
 */
export function foraDoHorarioComercial() {
	const agora = new Date()
	const hora = agora.getHours()
	const dia = agora.getDay()

	// Verifica se é feriado
	if (isFeriado(agora)) {
		return true
	}

	// Obtém configuração do dia
	const configuracaoDia = HORARIO_COMERCIAL.dias[dia]

	// Se o dia não está configurado ou está fechado (início = fim = 0)
	if (
		!configuracaoDia ||
		(configuracaoDia.inicio === 0 && configuracaoDia.fim === 0)
	) {
		return true
	}

	// Verifica se está dentro do horário comercial
	return hora < configuracaoDia.inicio || hora >= configuracaoDia.fim
}

/**
 * Retorna o horário comercial formatado para exibição
 * @returns {string} Horário comercial formatado
 */
export function getHorarioComercialFormatado() {
	const dias = Object.entries(HORARIO_COMERCIAL.dias)
		.filter(([_, config]) => config.inicio !== 0 || config.fim !== 0)
		.map(([dia, config]) => {
			const nomeDia = [
				"Domingo",
				"Segunda",
				"Terça",
				"Quarta",
				"Quinta",
				"Sexta",
				"Sábado",
			][parseInt(dia)]
			return `${nomeDia}: ${config.inicio}h às ${config.fim}h`
		})
		.join("\n")

	return `Horário de Atendimento:\n${dias}\n\nExceto feriados.`
}
