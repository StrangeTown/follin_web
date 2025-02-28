import React from 'react'
import { TodoTag } from '../types/todo'

interface TagDotProps {
  tag: TodoTag
}

function TagDot({ tag }: TagDotProps) {
  return (
    <div className="group relative">
      <span
        className="w-1.5 h-1.5 rounded-full block"
        style={{ backgroundColor: tag.color }}
      />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
        {tag.name}
      </div>
    </div>
  )
}

export default TagDot