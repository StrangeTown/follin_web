import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import useStore from '../store/useStore'
import CreateTodoModal from '../components/CreateTodoModal'
import ActiveTodoList from '../components/ActiveTodoList'
import CompletedTodoList from '../components/CompletedTodoList'

function Todos() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { todos, addTodo, toggleTodo, removeTodo } = useStore()

  const undoneTodos = todos.filter(todo => !todo.completed)
  const doneTodos = todos.filter(todo => todo.completed)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Todos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <PlusCircle className="w-8 h-8 text-blue-600" />
        </button>
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Todos