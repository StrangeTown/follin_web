import React, { useState } from 'react'
import { X, Plus } from 'lucide-react'
import useStore from '../store/useStore'
import useTagStore from '../store/useTagStore'
import { TodoTag } from '../types/todo'

interface CreateTodoModalProps {
  isOpen: boolean
  onClose: () => void
}

function CreateTodoModal({ isOpen, onClose }: CreateTodoModalProps) {
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<TodoTag[]>([])
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  const [newTagColor, setNewTagColor] = useState('#3B82F6')

  const { addTodo } = useStore()
  const { tags, addTag } = useTagStore()

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
        tags: selectedTags
      })
      setTitle('')
      setSelectedTags([])
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

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Tags</label>
            <button
              onClick={() => setIsAddingTag(true)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Tag
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-1 rounded text-sm flex items-center gap-1 ${
                  selectedTags.some(t => t.id === tag.id)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
                style={{
                  backgroundColor: selectedTags.some(t => t.id === tag.id) 
                    ? tag.color + '33' 
                    : undefined,
                  color: tag.color
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>

          {isAddingTag && (
            <div className="space-y-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Tag name"
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  className="w-10 h-10"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-1"
                >
                  Add Tag
                </button>
                <button
                  onClick={() => setIsAddingTag(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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