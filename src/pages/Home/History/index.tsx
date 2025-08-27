import HistoryItem from './HistoryItem'

export default function History() {
	const days: Date[] = []
	const today = new Date()
	const todayKey = today.toISOString().slice(0, 10)
	for (let i = 0; i < 3; i++) {
		const dt = new Date(today)
		dt.setDate(today.getDate() - i)
		days.push(dt)
	}

	return (
		<div className="space-y-2">
			<div className="flex gap-2 items-stretch">
				{days.map((d) => {
					const key = d.toISOString()
					const isToday = key.slice(0, 10) === todayKey
					return (
						<HistoryItem key={key} date={d} isToday={isToday} />
					)
				})}
			</div>
		</div>
	)
}
