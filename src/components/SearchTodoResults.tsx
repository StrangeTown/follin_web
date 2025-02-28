import React from 'react'
import { Todo } from '../types/todo'
import TagDot from './TagDot'

interface SearchTodoResultsProps {
  todos: Todo[]
  searchTerm: string
}

function SearchTodoResults({ todos, searchTerm }: SearchTodoResultsProps) {
  if (searchTerm.trim() === '') {
    return null
  }

  return (
    <div>
      <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-2">Todos</h3>
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No todos found</p>
      ) : (
        <ul className="space-y-1">
          {todos.map(todo => (
            <li key={todo.id} className="p-2 hover:bg-gray-50 rounded">
              <div className="flex items-start gap-2">
                <span className={todo.completed ? "line-through text-gray-400" : ""}>
                  {todo.title}
                </span>
                {todo.completed && (
                  <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                    Completed
                  </span>
                )}
              </div>
              {todo.tags && todo.tags.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {todo.tags.map(tag => (
                    <TagDot key={tag.id} tag={tag} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchTodoResults