import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import useStore from '../store/useStore'
import TagDot from './TagDot'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { todos } = useStore()
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  const filteredTodos = searchTerm.trim() === '' 
    ? [] 
    : todos.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.tags?.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Search Todos</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search by title or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        
        {searchTerm.trim() !== '' && (
          <div className="max-h-80 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No results found</p>
            ) : (
              <ul className="space-y-2">
                {filteredTodos.map(todo => (
                  <li key={todo.id} className="p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-start gap-2">
                      <span className={todo.completed ? "line-through text-gray-400" : ""}>
                        {todo.title}
                      </span>
                      {todo.completed && (
                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                          Completed
                        </span>
                      )}
                    </div>
                    {todo.tags && todo.tags.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {todo.tags.map(tag => (
                          <TagDot key={tag.id} tag={tag} />
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchModal