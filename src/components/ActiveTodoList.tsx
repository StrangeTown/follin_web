import { Trash2 } from 'lucide-react'
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
              <input
                type="checkbox"
                checked={false}
                onChange={() => onToggle(todo.id)}
                className="w-5 h-5"
              />
              <span className="flex-1">{todo.title}</span>
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