import HistoryItem from './HistoryItem'

export default function History() {
	const days: Date[] = []
	const today = new Date()
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
					return (
						<HistoryItem key={key} date={d} />
					)
				})}
			</div>
		</div>
	)
}
