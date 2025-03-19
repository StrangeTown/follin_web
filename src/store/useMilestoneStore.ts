import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Milestone } from '../types/milestone'

interface MilestoneStore {
  milestones: Milestone[]
  addMilestone: (milestone: Omit<Milestone, 'id'>) => void
  updateMilestone: (id: string, updates: Partial<Milestone>) => void
  removeMilestone: (id: string) => void
  toggleMilestoneCompletion: (id: string) => void
  toggleMilestoneActive: (id: string) => void
}

const useMilestoneStore = create<MilestoneStore>()(
  persist(
    (set) => ({
      milestones: [],
      
      addMilestone: (milestoneData) => set((state) => ({
        milestones: [...state.milestones, {
          id: crypto.randomUUID(),
          ...milestoneData
        }]
      })),
      
      updateMilestone: (id, updates) => set((state) => ({
        milestones: state.milestones.map(milestone => 
          milestone.id === id ? { ...milestone, ...updates } : milestone
        )
      })),
      
      removeMilestone: (id) => set((state) => ({
        milestones: state.milestones.filter(milestone => milestone.id !== id)
      })),
      
      toggleMilestoneCompletion: (id) => set((state) => ({
        milestones: state.milestones.map(milestone => 
          milestone.id === id 
            ? { ...milestone, isCompleted: !milestone.isCompleted } 
            : milestone
        )
      })),
      
      toggleMilestoneActive: (id) => set((state) => ({
        milestones: state.milestones.map(milestone => 
          milestone.id === id 
            ? { ...milestone, isActive: !milestone.isActive } 
            : milestone
        )
      }))
    }),
    {
      name: 'milestone-storage',
      partialize: (state) => ({ milestones: state.milestones }),
    }
  )
)

export default useMilestoneStore