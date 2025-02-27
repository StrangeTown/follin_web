import { Trash2, Circle } from 'lucide-react'
import { Todo } from '../types/todo'

interface ActiveTodoListProps {
  items: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

function ActiveTodoList({ items, onToggle, onRemove }: ActiveTodoListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No active tasks</p>
      ) : (
        <ul className="space-y-4">
          {items.map(todo => (
            <li key={todo.id} className="flex items-center gap-4">
              <button
                onClick={() => onToggle(todo.id)}
                className="text-gray-400 hover:text-blue-600"
              >
                <Circle className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <span>{todo.title}</span>
                  <div className="flex gap-1">
                    {todo.tags?.map(tag => (
                      <div
                        key={tag.id}
                        className="group relative"
                      >
                        <span
                          className="w-2 h-2 rounded-full block"
                          style={{ backgroundColor: tag.color }}
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                          {tag.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRemove(todo.id)}
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
}

export default ActiveTodoList