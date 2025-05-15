import { Trash2, Circle, Target, ArrowLeft } from 'lucide-react'
import { Todo } from '../types/todo'
import TagDot from './TagDot'
import useMilestoneStore from '../store/useMilestoneStore'
import useTodayStore from '../store/useTodayStore'

interface ActiveTodoListProps {
  items: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

function ActiveTodoList({ items, onToggle, onRemove }: ActiveTodoListProps) {
  const { milestones } = useMilestoneStore();
  const { addTodo, todos: todayTodos } = useTodayStore();
  
  // Sort items by createdAt date, newest first
  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA; // Descending order (newest first)
  });

  // Check if a todo is already in today's list
  const isInToday = (todoId: string) => {
    return todayTodos.some(todo => todo.id === todoId);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No active tasks</p>
      ) : (
        <ul className="space-y-4">
          {sortedItems.map(todo => (
            <li 
              key={todo.id} 
              className="group flex items-center gap-4 p-2 rounded transition-colors hover:bg-gray-50"
            >
              <button
                onClick={() => addTodo(todo)}
                className={`p-1 rounded ${
                  isInToday(todo.id)
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-blue-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
                title={isInToday(todo.id) ? "Already in Today" : "Add to Today"}
                disabled={isInToday(todo.id)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => onToggle(todo.id)}
                className="text-gray-400 hover:text-blue-600"
              >
                <Circle className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className="mr-2">{todo.title}</span>
                    {todo.milestoneId && (
                      <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        <Target className="w-3 h-3 mr-1" />
                        <span>
                          {milestones.find(m => m.id === todo.milestoneId)?.title || 'Unknown milestone'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {todo.tags?.map(tag => (
                      <TagDot key={tag.id} tag={tag} />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRemove(todo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-300 hover:text-red-500 hover:bg-red-50 rounded"
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