import React, { useState } from 'react'
import { PlusCircle, Import, Target, CheckCircle, Circle } from 'lucide-react'
import useStore from '../store/useStore'
import useMilestoneStore from '../store/useMilestoneStore'
import CreateTodoModal from '../components/CreateTodoModal'
import ImportFromTemplateModal from '../components/ImportFromTemplateModal'
import ActiveTodoList from '../components/ActiveTodoList'
import CompletedTodoList from '../components/CompletedTodoList'

function Todos() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const { todos, toggleTodo, removeTodo } = useStore()
  const { milestones, toggleMilestoneCompletion, toggleMilestoneActive } = useMilestoneStore()

  const undoneTodos = todos.filter(todo => !todo.completed)
  const doneTodos = todos.filter(todo => todo.completed)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Milestones section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Milestones</h2>
          <button
            className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
            title="Add milestone"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>

        {milestones.length === 0 ? (
          <p className="text-gray-500 text-center py-2">No milestones yet</p>
        ) : (
          <ul className="space-y-3">
            {milestones.map(milestone => (
              <li
                key={milestone.id}
                className={`p-3 rounded border-l-4 ${milestone.isCompleted
                    ? 'border-green-500 bg-green-50'
                    : milestone.isActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
              >
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.longTermImpact}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleMilestoneActive(milestone.id)}
                      className={`p-1 rounded-full ${milestone.isActive ? 'text-blue-600' : 'text-gray-400'
                        }`}
                      title={milestone.isActive ? "Mark as inactive" : "Mark as active"}
                    >
                      <Target className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleMilestoneCompletion(milestone.id)}
                      className={`p-1 rounded-full ${milestone.isCompleted ? 'text-green-600' : 'text-gray-400'
                        }`}
                      title={milestone.isCompleted ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {milestone.isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Todo section */}
      <div className="flex justify-end items-start mb-6">
        <div className="flex gap-2">
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
    </div>
  )
}

export default Todos