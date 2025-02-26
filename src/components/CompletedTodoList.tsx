import { Trash2 } from 'lucide-react'
import { Todo } from '../store/useStore'

interface CompletedTodoListProps {
  items: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

function CompletedTodoList({ items, onToggle, onRemove }: CompletedTodoListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No completed tasks</p>
      ) : (
        <ul className="space-y-4">
          {items.map(todo => (
            <li key={todo.id} className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={true}
                onChange={() => onToggle(todo.id)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <span className="line-through text-gray-400">{todo.title}</span>
                {todo.completedAt && (
                  <div className="text-sm text-gray-500">
                    Completed: {new Date(todo.completedAt).toLocaleString()}
                  </div>
                )}
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

export default CompletedTodoList