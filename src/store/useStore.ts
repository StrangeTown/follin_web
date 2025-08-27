import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoTag } from "../types/todo";

interface Store {
	count: number;
	todos: Todo[];
	increment: () => void;
	decrement: () => void;
	addTodo: (params: AddTodoParams) => void;
	toggleTodo: (id: string) => void;
	removeTodo: (id: string) => void;
	// selector: return todos in the same order as provided ids, skipping missing ids
	getTodosByIds: (ids: string[]) => Todo[];
	// selector: return all todos that are not completed
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
