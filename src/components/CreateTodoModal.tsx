import React from 'react'
import { X } from 'lucide-react'

interface CreateTodoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string) => void
}

function CreateTodoModal({ isOpen, onClose, onSubmit }: CreateTodoModalProps) {
  const [title, setTitle] = React.useState('')

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim())
      setTitle('')
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
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
        />
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