import useHistory from "../../../../store/useHistory";
import useStore from "../../../../store/useStore";

type Props = {
	date: Date;
	isToday?: boolean;
};

function formatDateLabel(d: Date) {
	return d.toLocaleDateString(undefined, {
		weekday: "short",
		month: "short",
		day: "numeric",
	});
}

export default function HistoryItem({ date, isToday }: Props) {
	const key = date.toISOString();
	const dateKey = date.toISOString().slice(0, 10);
	// subscribe to the specific history entry for this date so the component updates when history changes
	const historyEntry = useHistory((s) =>
		s.history.find((h) => h.date === dateKey)
	);
	// subscribe to the raw todos array and derive matching todos locally to avoid selector side-effects
	const allTodos = useStore((s) => s.todos);
	const todos = (historyEntry?.todoIds ?? [])
		.map((id) => allTodos.find((t) => t.id === id))
		.filter((t): t is NonNullable<typeof t> => !!t);

	const toggleTodo = useStore((s) => s.toggleTodo)

	return (
		<div
			key={key}
			className={`text-xs px-2 py-1 rounded-sm bg-white/80 text-gray-800 w-32`}
		>
			<div
				className={`inline-block px-1 rounded-sm ${
					isToday ? "text-blue-600 bg-blue-50" : ""
				}`}
			>
				{formatDateLabel(date)}
			</div>

			{todos && todos.length > 0 && (
				<div className="mt-1 flex flex-col gap-1">
					{todos.map((t) => (
						<div
							key={t.id}
							className={`w-full flex items-center rounded-sm px-2 py-1 text-sm bg-white/80 ${t.completed ? 'line-through text-gray-400 opacity-60' : 'text-gray-800'}`}
						>
							<input
								type="checkbox"
								checked={!!t.completed}
								onChange={() => toggleTodo(t.id)}
								className="mr-2"
							/>
							<span className={`truncate ${t.completed ? 'line-through' : ''}`}>{t.title}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
