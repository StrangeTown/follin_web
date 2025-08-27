import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { HistoryDate } from '../types/todo'

interface HistoryStore {
  history: HistoryDate[]
  setHistory: (h: HistoryDate[]) => void
  addHistoryDate: (date: string, todoIds?: string[]) => void
  addTodoToDate: (date: string, todoId: string) => void
  removeTodoFromDate: (date: string, todoId: string) => void
  getByDate: (date: string) => HistoryDate | undefined
}

const useHistory = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],

      setHistory: (h: HistoryDate[]) => set(() => ({ history: h })),

      addHistoryDate: (date: string, todoIds: string[] = []) => set((state) => {
        const exists = state.history.find(h => h.date === date)
        if (exists) return state
        return { history: [...state.history, { date, todoIds }] }
      }),

      addTodoToDate: (date: string, todoId: string) => set((state) => {
        console.log('Adding todo', todoId, 'to date', date)
        const history = state.history.map(h => {
          if (h.date !== date) return h
          if (h.todoIds.includes(todoId)) return h
          return { ...h, todoIds: [...h.todoIds, todoId] }
        })
        // if date not found, create it
        const found = history.find(h => h.date === date)
        if (!found) history.push({ date, todoIds: [todoId] })
        return { history }
      }),

      removeTodoFromDate: (date: string, todoId: string) => set((state) => ({
        history: state.history
          .map(h => h.date === date ? { ...h, todoIds: h.todoIds.filter(id => id !== todoId) } : h)
          .filter(h => h.todoIds.length > 0)
      })),

      getByDate: (date: string) => get().history.find(h => h.date === date)
    }),
    {
      name: 'history-storage',
      partialize: (state) => ({ history: state.history })
    }
  )
)

export default useHistory
