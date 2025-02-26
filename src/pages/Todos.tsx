import React, { useState } from 'react'
import { PlusCircle, Trash2 } from 'lucide-react'
import useStore from '../store/useStore'
import CreateTodoModal from '../components/CreateTodoModal'

function Todos() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { todos, addTodo, toggleTodo, removeTodo } = useStore()

  const undoneTodos = todos.filter(todo => !todo.completed)
  const doneTodos = todos.filter(todo => todo.completed)

  const TodoList = ({ items, title }: { items: typeof todos, title: string }) => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No {title.toLowerCase()}</p>
      ) : (
        <ul className="space-y-4">
          {items.map(todo => (
            <li key={todo.id} className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.title}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

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

      <TodoList items={undoneTodos} title="Active Tasks" />
      <TodoList items={doneTodos} title="Completed Tasks" />

      <CreateTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTodo}
      />
    </div>
  )
}

export default Todos