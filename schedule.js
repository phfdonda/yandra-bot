export function emHorarioComercial(startHour = 9, endHour = 18) {
	const now = new Date()
	const currentHour = now.getHours()

	return currentHour >= startHour && currentHour < endHour
}
