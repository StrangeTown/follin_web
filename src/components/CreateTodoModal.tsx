import React, { useState } from 'react'
import { X, Plus } from 'lucide-react'
import useStore from '../store/useStore'
import useTagStore from '../store/useTagStore'
import useMilestoneStore from '../store/useMilestoneStore'
import { TodoTag } from '../types/todo'
import TagSelector from './TagSelector'

interface CreateTodoModalProps {
  isOpen: boolean
  onClose: () => void
}

function CreateTodoModal({ isOpen, onClose }: CreateTodoModalProps) {
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<TodoTag[]>([])
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('')
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  const [newTagColor, setNewTagColor] = useState('#3B82F6')

  const { addTodo } = useStore()
  const { tags, addTag } = useTagStore()
  const { milestones } = useMilestoneStore()

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag = addTag(newTagName.trim(), newTagColor)
      setSelectedTags([...selectedTags, newTag])
      setNewTagName('')
      setIsAddingTag(false)
    }
  }

  const toggleTag = (tag: TodoTag) => {
    setSelectedTags(prev => 
      prev.some(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)
        : [...prev, tag]
    )
  }

  const handleSubmit = () => {
    if (title.trim()) {
      addTodo({
        title: title.trim(),
        tags: selectedTags,
        milestoneId: selectedMilestoneId || undefined
      })
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
          <h2 className="text-xl font-bold">Create New Todo</h2>
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
          placeholder="Todo title"
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

export default CreateTodoModal