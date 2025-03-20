import React, { useState } from 'react'
import { X } from 'lucide-react'
import useTemplateStore from '../store/useTemplateStore'
import useMilestoneStore from '../store/useMilestoneStore'
import { TodoTag } from '../types/todo'
import TagSelector from './TagSelector'

interface CreateTemplateModalProps {
  isOpen: boolean
  onClose: () => void
}

function CreateTemplateModal({ isOpen, onClose }: CreateTemplateModalProps) {
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<TodoTag[]>([])
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('')
  const { addTemplate } = useTemplateStore()
  const { milestones } = useMilestoneStore()

  const handleSubmit = () => {
    if (title.trim()) {
      addTemplate(title.trim(), selectedTags, selectedMilestoneId || undefined)
      setTitle('')
      setSelectedTags([])
      setSelectedMilestoneId('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Template</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Template title"
          className="w-full p-2 border rounded mb-4"
          autoFocus
        />

        <TagSelector
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />

        {/* Milestone selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Related Milestone
          </label>
          <select
            value={selectedMilestoneId}
            onChange={(e) => setSelectedMilestoneId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">None</option>
            {milestones.map(milestone => (
              <option key={milestone.id} value={milestone.id}>
                {milestone.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTemplateModal