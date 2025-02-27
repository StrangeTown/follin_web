import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Template, TodoTag } from '../types/todo'

interface TemplateStore {
  templates: Template[]
  addTemplate: (title: string, tags?: TodoTag[]) => Template
  updateTemplate: (id: string, updates: Partial<Template>) => void
  removeTemplate: (id: string) => void
  getTemplate: (id: string) => Template | undefined
}

const useTemplateStore = create<TemplateStore>()(
  persist(
    (set, get) => ({
      templates: [],
      
      addTemplate: (title: string, tags?: TodoTag[]) => {
        const newTemplate: Template = {
          id: crypto.randomUUID(),
          title,
          createdAt: new Date(),
          tags
        }
        set((state) => ({
          templates: [...state.templates, newTemplate]
        }))
        return newTemplate
      },

      updateTemplate: (id: string, updates: Partial<Template>) => set((state) => ({
        templates: state.templates.map(template => 
          template.id === id ? { ...template, ...updates } : template
        )
      })),

      removeTemplate: (id: string) => set((state) => ({
        templates: state.templates.filter(template => template.id !== id)
      })),

      getTemplate: (id: string) => get().templates.find(template => template.id === id)
    }),
    {
      name: 'todo-templates-storage',
      partialize: (state) => ({ templates: state.templates }),
    }
  )
)

export default useTemplateStore