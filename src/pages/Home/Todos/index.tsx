import useStore from "../../../store/useStore";
import useHistory from "../../../store/useHistory";
import CreateTodo from '../CreateTodo'
import TodoItem from './Todo'

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
						<TodoItem
							key={todo.id}
							todo={todo}
							inToday={inToday}
							todayKey={todayKey}
							addTodoToDate={addTodoToDate}
							removeTodoFromDate={removeTodoFromDate}
						/>
					)
				})}
			</div>
		</div>
	);
}
