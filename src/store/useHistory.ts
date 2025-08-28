import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HistoryDate } from "../types/todo";
import useStore from "./useStore";

interface HistoryStore {
	history: HistoryDate[];
	setHistory: (h: HistoryDate[]) => void;
	addHistoryDate: (date: string, todoIds?: string[]) => void;
	addTodoToDate: (date: string, todoId: string) => void;
	removeTodoFromDate: (date: string, todoId: string) => void;
	getByDate: (date: string) => HistoryDate | undefined;
	// last time the history was checked
	lastCheckDate?: string | null;
	updateLastCheckDateToToday: () => void;
	checkHistoryTodos: () => void;
}

const useHistory = create<HistoryStore>()(
	persist(
		(set, get) => ({
			history: [],
			lastCheckDate: null,

			setHistory: (h: HistoryDate[]) => set(() => ({ history: h })),

			addHistoryDate: (date: string, todoIds: string[] = []) =>
				set((state) => {
					const exists = state.history.find((h) => h.date === date);
					if (exists) return state;
					return { history: [...state.history, { date, todoIds }] };
				}),

			addTodoToDate: (date: string, todoId: string) =>
				set((state) => {
					console.log("Adding todo", todoId, "to date", date);
					const history = state.history.map((h) => {
						if (h.date !== date) return h;
						if (h.todoIds.includes(todoId)) return h;
						return { ...h, todoIds: [...h.todoIds, todoId] };
					});
					// if date not found, create it
					const found = history.find((h) => h.date === date);
					if (!found) history.push({ date, todoIds: [todoId] });
					return { history };
				}),

			removeTodoFromDate: (date: string, todoId: string) =>
				set((state) => ({
					history: state.history
						.map((h) =>
							h.date === date
								? { ...h, todoIds: h.todoIds.filter((id) => id !== todoId) }
								: h
						)
						.filter((h) => h.todoIds.length > 0),
				})),

			getByDate: (date: string) => get().history.find((h) => h.date === date),
			updateLastCheckDateToToday: () =>
				set(() => ({ lastCheckDate: new Date().toISOString() })),
			checkHistoryTodos: () => {
				const lastIso = get().lastCheckDate;
				const last = lastIso ? new Date(lastIso) : null;
				const today = new Date();
				const isSameDay =
					last &&
					last instanceof Date &&
					last.toDateString() === today.toDateString();
				if (!isSameDay) {
					console.log("history.checkHistoryTodos: lastCheckDate is not today");

					// compute yesterday's date string in YYYY-MM-DD to match HistoryDate.date format
					const yesterday = new Date(today);
					yesterday.setDate(today.getDate() - 1);
					const yStr = yesterday.toISOString().slice(0, 10);

					const yEntry = get().history.find((h) => h.date === yStr);
					if (yEntry) {
						// get current todos from the main store and keep only completed ones
						const todos = useStore.getState().todos;
						const completedIds = new Set(
							todos.filter((t) => t.completed).map((t) => t.id)
						);
						const newTodoIds = yEntry.todoIds.filter((id) =>
							completedIds.has(id)
						);
						if (newTodoIds.length !== yEntry.todoIds.length) {
							// update history entry for yesterday; remove entry if no ids remain
							set((state) => ({
								history: state.history
									.map((h) =>
										h.date === yStr ? { ...h, todoIds: newTodoIds } : h
									)
									.filter((h) => h.todoIds.length > 0),
							}));
						}
					}
				}

				// always update lastCheckDate to today
				// always update lastCheckDate to today (stored as ISO string)
				set(() => ({ lastCheckDate: today.toISOString() }));
			},
		}),
		{
			name: "history-storage",
			partialize: (state) => ({
				history: state.history,
				lastCheckDate: state.lastCheckDate,
			}),
		}
	)
);

export default useHistory;
