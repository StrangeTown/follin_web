import { Trash2, Circle } from 'lucide-react'
import { Todo } from '../types/todo'
import TagDot from './TagDot'

interface ActiveTodoListProps {
  items: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

function ActiveTodoList({ items, onToggle, onRemove }: ActiveTodoListProps) {
  // Sort items by createdAt date, newest first
  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA; // Descending order (newest first)
  });

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No active tasks</p>
      ) : (
        <ul className="space-y-4">
          {sortedItems.map(todo => (
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
                      <TagDot key={tag.id} tag={tag} />
                    ))}
                  </div>
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
      )}
    </div>
  )
}

export default ActiveTodoList