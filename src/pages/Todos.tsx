import React, { useState, useEffect } from 'react'
import { PlusCircle, Import, Search } from 'lucide-react'
import useStore from '../store/useStore'
import CreateTodoModal from '../components/CreateTodoModal'
import ImportFromTemplateModal from '../components/ImportFromTemplateModal'
import SearchModal from '../components/SearchModal'
import ActiveTodoList from '../components/ActiveTodoList'
import CompletedTodoList from '../components/CompletedTodoList'

function Todos() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const { todos, toggleTodo, removeTodo } = useStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault() // Prevent default browser behavior
        setIsSearchModalOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const undoneTodos = todos.filter(todo => !todo.completed)
  const doneTodos = todos.filter(todo => todo.completed)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-end items-center mb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
            title="Search todos"
          >
            <Search className="w-6 h-6 text-blue-600" />
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
            title="Import from templates"
          >
            <Import className="w-6 h-6 text-blue-600" />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            <PlusCircle className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>

      <ActiveTodoList 
        items={undoneTodos} 
        onToggle={toggleTodo} 
        onRemove={removeTodo}
      />
      <CompletedTodoList 
        items={doneTodos} 
        onToggle={toggleTodo} 
        onRemove={removeTodo}
      />

      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ImportFromTemplateModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  )
}

export default Todos