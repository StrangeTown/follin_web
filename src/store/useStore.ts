import { create } from 'zustand'

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

const useStore = create<Store>((set) => ({
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
}))

export default useStore