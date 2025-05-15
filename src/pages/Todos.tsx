import React, { useState } from 'react'
import { PlusCircle, Import } from 'lucide-react'
import useStore from '../store/useStore'
import CreateTodoModal from '../components/CreateTodoModal'
import ImportFromTemplateModal from '../components/ImportFromTemplateModal'
import CreateMilestoneModal from '../components/CreateMilestoneModal'
import MilestoneList from '../components/MilestoneList'
import ActiveTodoList from '../components/ActiveTodoList'
import CompletedTodoList from '../components/CompletedTodoList'

function Todos() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isCreateMilestoneModalOpen, setIsCreateMilestoneModalOpen] = useState(false)
  const { todos, toggleTodo, removeTodo } = useStore()

  const undoneTodos = todos.filter(todo => !todo.completed)
  const doneTodos = todos.filter(todo => todo.completed)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex gap-6">
        {/* Today section */}
        <div className="w-1/4 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">Today</h2>
          <p className="text-gray-500 text-center py-2">No tasks for today</p>
        </div>

        {/* Main content section */}
        <div className="flex-1">
          {/* Milestones and Todos container */}
          <div className="space-y-6">
            <MilestoneList onCreateMilestone={() => setIsCreateMilestoneModalOpen(true)} />

            {/* Todo section */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-end items-start mb-4">
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
            </div>
          </div>
        </div>
      </div>

      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ImportFromTemplateModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
      <CreateMilestoneModal
        isOpen={isCreateMilestoneModalOpen}
        onClose={() => setIsCreateMilestoneModalOpen(false)}
      />
    </div>
  )
}

export default Todos