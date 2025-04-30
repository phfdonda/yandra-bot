export function foraDoHorarioComercial(startHour = 9, endHour = 20) {
	const now = new Date()
	const currentHour = now.getHours()

	return !(currentHour >= startHour && currentHour < endHour)
}
