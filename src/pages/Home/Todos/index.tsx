import useStore from '../../../store/useStore'
import { CalendarPlus } from 'lucide-react'
import useHistory from '../../../store/useHistory'

export default function Todos() {
	const todos = useStore((s) => s.todos)
	const addTodoToDate = useHistory((s) => s.addTodoToDate)
	const todayKey = new Date().toISOString().slice(0, 10)

	if (todos.length === 0) {
		return <div className="p-2 text-gray-600">No todos yet</div>
	}

	return (
		<div>
			<div className="flex flex-wrap gap-2">
				{todos.map((todo) => (
					<div
						key={todo.id}
						className={`inline-flex items-center rounded-sm px-3 py-1 text-sm bg-white/80 border-b border-gray-200 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'} group cursor-pointer relative`}
						onClick={() => addTodoToDate(todayKey, todo.id)}
					>
						<span className="block px-1">{todo.title}</span>
						{/* overlay shown on hover */}
						<div className="absolute inset-0 flex items-center justify-center rounded-sm bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
							<CalendarPlus
								className="w-4 h-4 cursor-pointer text-gray-600"
								aria-label="open calendar"
							/>
						</div>
					</div>
					))}
			</div>
		</div>
	)
}

