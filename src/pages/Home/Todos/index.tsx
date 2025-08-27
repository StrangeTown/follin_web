import useStore from "../../../store/useStore";
import { CalendarPlus, CalendarMinus } from "lucide-react";
import useHistory from "../../../store/useHistory";
import CreateTodo from '../CreateTodo'

export default function Todos() {
	// subscribe to the raw todos array and derive the uncompleted todos locally
	const allTodos = useStore((s) => s.todos);
	const todos = allTodos.filter(t => !t.completed);
	// display newest first
	const displayTodos = [...todos].reverse();
	const addTodoToDate = useHistory((s) => s.addTodoToDate);
	const removeTodoFromDate = useHistory((s) => s.removeTodoFromDate);
	const todayKey = new Date().toISOString().slice(0, 10);
	// subscribe to today's history entry so the UI updates when todos are added for today
	const todayEntry = useHistory((s) =>
		s.history.find((h) => h.date === todayKey)
	);

	if (todos.length === 0) {
		return <div className="p-2 text-gray-600">No todos yet</div>;
	}

	return (
		<div>
			<div className="flex flex-wrap gap-2">
				{/* create control placed first */}
				<div className="shrink-0">
					<CreateTodo />
				</div>
				{displayTodos.map((todo) => {
					const inToday = !!todayEntry && todayEntry.todoIds.includes(todo.id);
					return (
						<div
							key={todo.id}
							className={`inline-flex items-center rounded-sm px-3 py-1 text-sm bg-white/80 border-b border-gray-200 ${
								todo.completed ? "line-through text-gray-400" : "text-gray-800"
							} ${inToday ? "opacity-30" : ""} group cursor-pointer relative`}
							onClick={() =>
								inToday
									? removeTodoFromDate(todayKey, todo.id)
									: addTodoToDate(todayKey, todo.id)
							}
						>
							<span className="block px-1">{todo.title}</span>
							{/* overlay shown on hover */}
							<div className="absolute inset-0 flex items-center justify-center rounded-sm bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
								{inToday ? (
									<CalendarMinus
										className="w-4 h-4 cursor-pointer text-gray-600"
										aria-label="remove from calendar"
									/>
								) : (
									<CalendarPlus
										className="w-4 h-4 cursor-pointer text-gray-600"
										aria-label="open calendar"
									/>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
