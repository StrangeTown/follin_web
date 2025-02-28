import React, { useState, useEffect } from 'react'
import { X, Plus, Import, CheckCircle2, Trash2 } from 'lucide-react'
import useStore from '../store/useStore'
import SearchTodoResults from './SearchTodoResults'
import SearchCommandResults from './SearchCommandResults'
import { getCommands } from '../data/commands'
import { COMMAND_IDS } from '../constants/commandIds'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { todos } = useStore()
  
  const handleCommandExecute = (commandId: string) => {
    // Handle different commands based on their IDs
    switch (commandId) {
      case COMMAND_IDS.CREATE_TODO:
        // Handle create todo action
        break;
      case COMMAND_IDS.IMPORT_FROM_TEMPLATE:
        // Handle import from template action
        break;
      case COMMAND_IDS.COMPLETE_ALL:
        // Handle complete all action
        break;
      case COMMAND_IDS.CLEAR_COMPLETED:
        // Handle clear completed action
        break;
    }
    
    // Close the modal after handling the command
    onClose();
  };
  
  // Get commands with the handler function
  const commands = getCommands(handleCommandExecute);
  
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
          {/* Commands section - replaced with component */}
          <SearchCommandResults commands={filteredCommands} />
          
          {/* Todos section */}
          <SearchTodoResults 
            todos={filteredTodos} 
            searchTerm={searchTerm} 
          />
          
          {searchTerm.trim() !== '' && filteredTodos.length === 0 && filteredCommands.length === 0 && (
            <p className="text-gray-500 text-center py-4">No results found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal