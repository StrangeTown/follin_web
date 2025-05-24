import { Circle, Target, XCircle, ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { cn } from '../lib/utils'
import { Todo } from '../types/todo'
import useTodayStore, { TodayTodo } from '../store/useTodayStore'
import TagDot from './TagDot'
import useMilestoneStore from '../store/useMilestoneStore'
import useStore from '../store/useStore'
import { useEffect } from 'react'

interface TodayTodoListProps {
  onToggle: (id: string) => void
}

function TodayTodoList({ onToggle }: TodayTodoListProps) {
  const { milestones } = useMilestoneStore()
  const { todos: todayTodos, updateDate, clearTodos, removeTodo, togglePriority } = useTodayStore()
  const { todos: allTodos } = useStore()
  
  // Update date to ensure we're showing today's items
  useEffect(() => {
    updateDate()
  }, [updateDate])
  
  // Filter todos that are in today's list and get their current status from allTodos
  const todayItems = todayTodos.map(todayTodo => {
    const mainTodo = allTodos.find(t => t.id === todayTodo.id)
    return {
      ...(mainTodo || todayTodo),
      priority: todayTodo.priority // Preserve the priority from todayTodo
    } as TodayTodo
  })
  
  // Sort items by createdAt date, newest first
  const sortedItems = [...todayItems].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return dateB - dateA
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {todayItems.length > 0 && (
          <button
            onClick={clearTodos}
            className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1"
            title="Clear all tasks"
          >
            <XCircle className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>
      {todayItems.length === 0 ? (
        <p className="text-gray-500 text-center py-2">No tasks for today</p>
      ) : (
        <ul className="space-y-4">
          {sortedItems.map(todo => (
            <li 
              key={todo.id} 
              className={`flex items-center gap-4 p-2 rounded transition-colors hover:bg-gray-50 ${
                todo.priority ? 'bg-yellow-50' : ''
              }`}
            >
              <button
                onClick={() => onToggle(todo.id)}
                className={`${todo.completed ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'}`}
              >
                {todo.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <span className={`mr-2 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                      {todo.title}
                    </span>
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
                onClick={() => togglePriority(todo.id)}
                className={`p-1 rounded ${
                  todo.priority
                    ? 'text-yellow-500 hover:text-yellow-600'
                    : 'text-gray-300 hover:text-yellow-500'
                }`}
                title={todo.priority ? "Remove priority" : "Mark as priority"}
              >
                <Zap
                  size={16}
                  strokeWidth={1.5}  // Reduced from default 2 to make it thinner
                  className={cn(
                    "h-4 w-4 transition-colors",
                    todo.priority ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-500"
                  )}
                />
              </button>
              <button
                onClick={() => removeTodo(todo.id)}
                className="p-1 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                title="Remove from Today"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodayTodoList