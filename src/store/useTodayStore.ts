import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Todo } from '../types/todo'

export interface TodayTodo extends Todo {
  priority?: boolean
}

interface TodayStore {
  date: string
  todos: TodayTodo[]
  setTodos: (todos: TodayTodo[]) => void
  clearTodos: () => void
  updateDate: () => void
  addTodo: (todo: Todo) => void
  removeTodo: (id: string) => void
  togglePriority: (id: string) => void
}

const useTodayStore = create<TodayStore>()(
  persist(
    (set) => ({
      date: new Date().toISOString().split('T')[0],
      todos: [],
      
      setTodos: (todos: TodayTodo[]) => set(() => ({
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
        todos: [...state.todos, { ...todo, priority: false }]
      })),

      removeTodo: (id: string) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),

      togglePriority: (id: string) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id
            ? { ...todo, priority: !todo.priority }
            : todo
        )
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