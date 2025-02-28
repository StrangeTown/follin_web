import { Trash2, CheckCircle2 } from 'lucide-react'
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
                    <button
                      onClick={() => onToggle(todo.id)}
                      className="text-green-600"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <div className="flex-1 flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                        <span className="line-through text-gray-400">{todo.title}</span>
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
                      <div className="text-xs text-gray-400 ml-4">
                        {new Date(todo.completedAt!).toLocaleTimeString('en-US', {
                          hour12: false,
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(todo.id)}
                      className="p-1 text-red-300 hover:text-red-500 hover:bg-red-50 rounded"
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