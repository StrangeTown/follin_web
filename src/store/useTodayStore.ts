import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Todo } from '../types/todo'

interface TodayStore {
  date: string
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
  clearTodos: () => void
  updateDate: () => void
  addTodo: (todo: Todo) => void
  removeTodo: (id: string) => void
}

const useTodayStore = create<TodayStore>()(
  persist(
    (set) => ({
      date: new Date().toISOString().split('T')[0],
      todos: [],
      
      setTodos: (todos: Todo[]) => set(() => ({
        todos,
        date: new Date().toISOString().split('T')[0]
      })),
      
      clearTodos: () => set(() => ({
        todos: [],
        date: new Date().toISOString().split('T')[0]
      })),
      
      updateDate: () => set((state) => {
        const today = new Date().toISOString().split('T')[0]
        if (state.date !== today) {
          return {
            date: today,
            todos: []
          }
        }
        return state
      }),

      addTodo: (todo: Todo) => set((state) => ({
        todos: [...state.todos, todo]
      })),

      removeTodo: (id: string) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }))
    }),
    {
      name: 'today-storage',
      partialize: (state) => ({ 
        date: state.date,
        todos: state.todos 
      }),
    }
  )
)

export default useTodayStore