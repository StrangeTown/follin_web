import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TodoTag } from '../types/todo'

interface TagStore {
  tags: TodoTag[]
  addTag: (name: string, color: string) => TodoTag
  updateTag: (id: string, updates: Partial<TodoTag>) => void
  removeTag: (id: string) => void
  getTag: (id: string) => TodoTag | undefined
}

const useTagStore = create<TagStore>()(
  persist(
    (set, get) => ({
      tags: [],
      
      addTag: (name: string, color: string) => {
        const newTag: TodoTag = {
          id: crypto.randomUUID(),
          name,
          color
        }
        set((state) => ({
          tags: [...state.tags, newTag]
        }))
        return newTag
      },

      updateTag: (id: string, updates: Partial<TodoTag>) => set((state) => ({
        tags: state.tags.map(tag => 
          tag.id === id ? { ...tag, ...updates } : tag
        )
      })),

      removeTag: (id: string) => set((state) => ({
        tags: state.tags.filter(tag => tag.id !== id)
      })),

      getTag: (id: string) => get().tags.find(tag => tag.id === id)
    }),
    {
      name: 'todo-tags-storage',
      partialize: (state) => ({ tags: state.tags }),
    }
  )
)

export default useTagStore