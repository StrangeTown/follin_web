import React, { useState, useEffect } from 'react'
import { X, Plus, Import, CheckCircle2, Trash2 } from 'lucide-react'
import useStore from '../store/useStore'
import TagDot from './TagDot'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Command {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { todos } = useStore()
  
  // Define available commands
  const commands: Command[] = [
    {
      id: 'create',
      name: 'Create Todo',
      description: 'Create a new todo item',
      icon: <Plus className="w-4 h-4" />,
      action: () => {
        onClose();
        // You would need to implement this to open the create modal
        // For example: setIsCreateModalOpen(true)
      }
    },
    {
      id: 'import',
      name: 'Import from Template',
      description: 'Create todos from templates',
      icon: <Import className="w-4 h-4" />,
      action: () => {
        onClose();
        // You would need to implement this to open the import modal
        // For example: setIsImportModalOpen(true)
      }
    },
    {
      id: 'complete-all',
      name: 'Complete All',
      description: 'Mark all todos as completed',
      icon: <CheckCircle2 className="w-4 h-4" />,
      action: () => {
        // Implement complete all functionality
        onClose();
      }
    },
    {
      id: 'clear-completed',
      name: 'Clear Completed',
      description: 'Remove all completed todos',
      icon: <Trash2 className="w-4 h-4" />,
      action: () => {
        // Implement clear completed functionality
        onClose();
      }
    }
  ];
  
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
      
  const filteredCommands = searchTerm.trim() === ''
    ? commands
    : commands.filter(command => 
        command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.description.toLowerCase().includes(searchTerm.toLowerCase())
      )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search todos or commands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        
        <div className="max-h-80 overflow-y-auto">
          {/* Commands section */}
          {filteredCommands.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-2">Commands</h3>
              <ul className="space-y-1">
                {filteredCommands.map(command => (
                  <li 
                    key={command.id}
                    onClick={command.action}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded">
                      {command.icon}
                    </div>
                    <div>
                      <div className="font-medium">{command.name}</div>
                      <div className="text-xs text-gray-500">{command.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Todos section */}
          {searchTerm.trim() !== '' && (
            <div>
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-2">Todos</h3>
              {filteredTodos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No todos found</p>
              ) : (
                <ul className="space-y-1">
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
          
          {searchTerm.trim() !== '' && filteredTodos.length === 0 && filteredCommands.length === 0 && (
            <p className="text-gray-500 text-center py-4">No results found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal