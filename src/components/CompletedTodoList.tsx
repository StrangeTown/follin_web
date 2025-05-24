import { CheckCircle2 } from 'lucide-react'
import { Todo } from '../types/todo'
import TagDot from './TagDot'

interface CompletedTodoListProps {
  items: Todo[]
  onToggle: (id: string) => void
}

function CompletedTodoList({ items, onToggle }: CompletedTodoListProps) {
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

  // Sort dates in reverse chronological order (newest first)
  const sortedDates = Object.keys(groupedTodos).sort((a, b) => {
    // Convert date strings back to Date objects for comparison
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime(); // Descending order
  });

  return (
    <div className="bg-gray-50 rounded-lg shadow p-6 mb-6">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No completed tasks</p>
      ) : (
        <div className="space-y-16">
          {sortedDates.map(date => (
            <div key={date}>
              <h3 className="text-md font-medium text-gray-600 mb-3">{date}</h3>
              <ul className="space-y-4">
                {groupedTodos[date].map(todo => (
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
                            <TagDot key={tag.id} tag={tag} />
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