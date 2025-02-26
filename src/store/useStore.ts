import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Todo {
  id: string
  title: string
  completed: boolean
}

interface Store {
  count: number
  todos: Todo[]
  increment: () => void
  decrement: () => void
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      count: 0,
      todos: [],
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      addTodo: (title: string) => set((state) => ({
        todos: [...state.todos, {
          id: crypto.randomUUID(),
          title,
          completed: false
        }]
      })),
      toggleTodo: (id: string) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),
      removeTodo: (id: string) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }))
    }),
    {
      name: 'todo-storage', // unique name for localStorage key
      partialize: (state) => ({ todos: state.todos }), // only persist todos
    }
  )
)

export default useStore