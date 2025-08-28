import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoTag } from "../types/todo";

interface Store {
	count: number;
	todos: Todo[];
	// last time the app performed a check
	increment: () => void;
	decrement: () => void;
	addTodo: (params: AddTodoParams) => void;
	toggleTodo: (id: string) => void;
	removeTodo: (id: string) => void;


	 	// update a todo by id with a partial update
	 	updateTodo: (id: string, patch: Partial<Todo>) => void;

	// selector: return todos in the same order as provided ids, skipping missing ids
	getTodosByIds: (ids: string[]) => Todo[];
}
interface AddTodoParams {
	title: string;
	tags?: TodoTag[];
}

const useStore = create<Store>()(
	persist(
		(set, get) => ({
			count: 0,
			todos: [],
			increment: () => set((state) => ({ count: state.count + 1 })),
			decrement: () => set((state) => ({ count: state.count - 1 })),
			addTodo: (params: AddTodoParams) =>
				set((state) => ({
					todos: [
						...state.todos,
						{
							id: crypto.randomUUID(),
							title: params.title,
							completed: false,
							createdAt: new Date(),
							tags: params.tags || [],
						},
					],
				})),
			toggleTodo: (id: string) =>
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id
							? {
									...todo,
									completed: !todo.completed,
									completedAt: !todo.completed ? new Date() : undefined,
							  }
							: todo
					),
				})),
			removeTodo: (id: string) =>
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== id),
				})),
			updateTodo: (id: string, patch: Partial<Todo>) =>
				set((state) => ({
					todos: state.todos.map((todo) => {
						if (todo.id !== id) return todo
						const updated = { ...todo, ...patch }
						// if completed flag changed, keep completedAt in sync
						if (typeof patch.completed === 'boolean') {
							if (patch.completed && !todo.completed) {
								updated.completedAt = new Date()
							} else if (!patch.completed) {
								updated.completedAt = undefined
							}
						}
						return updated
					}),
				})),
			getTodosByIds: (ids: string[]) => {
				if (!ids || ids.length === 0) return [];
				const todos = get().todos;
				return ids
					.map((id) => todos.find((t) => t.id === id))
					.filter((t): t is Todo => !!t);
			},
		}),
		{
			name: "todo-storage",
			partialize: (state) => ({ todos: state.todos }),
		}
	)
);

export default useStore;
