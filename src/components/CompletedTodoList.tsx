import { Trash2 } from 'lucide-react'
import { Todo } from '../types/todo'

interface CompletedTodoListProps {
  items: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

function CompletedTodoList({ items, onToggle, onRemove }: CompletedTodoListProps) {
  const groupedTodos = items.reduce((groups, todo) => {
    if (!todo.completedAt) return groups
    const date = new Date(todo.completedAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    })
    return {
      ...groups,
      [date]: [...(groups[date] || []), todo]
    }
  }, {} as Record<string, Todo[]>)

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No completed tasks</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTodos).map(([date, todos]) => (
            <div key={date}>
              <h3 className="text-md font-medium text-gray-600 mb-3">{date}</h3>
              <ul className="space-y-4">
                {todos.map(todo => (
                  <li key={todo.id} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => onToggle(todo.id)}
                      className="w-5 h-5"
                    />
                    <div className="flex-1">
                      <span className="line-through text-gray-400">{todo.title}</span>
                      <div className="text-sm text-gray-500">
                        Completed: {new Date(todo.completedAt!).toLocaleTimeString()}
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CompletedTodoList