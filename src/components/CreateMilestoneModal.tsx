import React, { useState } from 'react'
import { X } from 'lucide-react'
import useMilestoneStore from '../store/useMilestoneStore'

interface CreateMilestoneModalProps {
  isOpen: boolean
  onClose: () => void
}

function CreateMilestoneModal({ isOpen, onClose }: CreateMilestoneModalProps) {
  const [title, setTitle] = useState('')
  const [longTermImpact, setLongTermImpact] = useState('')
  const { addMilestone } = useMilestoneStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (title.trim() === '') return
    
    addMilestone({
      title,
      longTermImpact,
      isActive: true,
      isCompleted: false
    })
    
    // Reset form and close modal
    setTitle('')
    setLongTermImpact('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Milestone</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter milestone title"
              autoFocus
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="longTermImpact" className="block text-sm font-medium text-gray-700 mb-1">
              Long-term Impact
            </label>
            <textarea
              id="longTermImpact"
              value={longTermImpact}
              onChange={(e) => setLongTermImpact(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="Describe the long-term impact of this milestone"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateMilestoneModal