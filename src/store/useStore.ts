import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Todo, TodoTag } from '../types/todo'

interface Store {
  count: number
  todos: Todo[]
  increment: () => void
  decrement: () => void
  addTodo: (params: AddTodoParams) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
}
interface AddTodoParams {
  title: string
  tags?: TodoTag[]
}
const useStore = create<Store>()(
  persist(
    (set) => ({
      count: 0,
      todos: [],
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      addTodo: (params: AddTodoParams) => set((state) => ({
        todos: [...state.todos, {
          id: crypto.randomUUID(),
          title: params.title,
          completed: false,
          tags: params.tags || []
        }]
      })),
      toggleTodo: (id: string) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id 
            ? { 
                ...todo, 
                completed: !todo.completed,
                completedAt: !todo.completed ? new Date() : undefined
              } 
            : todo
        )
      })),
      removeTodo: (id: string) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }))
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({ todos: state.todos }),
    }
  )
)

export default useStore