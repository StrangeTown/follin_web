import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { TodoTag } from '../types/todo'
import useTagStore from '../store/useTagStore'

interface TagSelectorProps {
  selectedTags: TodoTag[]
  onTagsChange: (tags: TodoTag[]) => void
}

function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  const [newTagColor, setNewTagColor] = useState('#3B82F6')
  const { tags, addTag } = useTagStore()

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag = addTag(newTagName.trim(), newTagColor)
      onTagsChange([...selectedTags, newTag])
      setNewTagName('')
      setIsAddingTag(false)
    }
  }

  const toggleTag = (tag: TodoTag) => {
    onTagsChange(
      selectedTags.some(t => t.id === tag.id)
        ? selectedTags.filter(t => t.id !== tag.id)
        : [...selectedTags, tag]
    )
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">Tags</label>
        <button
          onClick={() => setIsAddingTag(true)}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Tag
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag)}
            className={`px-2 py-1 rounded text-sm flex items-center gap-1`}
            style={{
              backgroundColor: selectedTags.some(t => t.id === tag.id) 
                ? tag.color + '33' 
                : undefined,
              color: tag.color
            }}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {isAddingTag && (
        <div className="space-y-2">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Tag name"
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <input
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
              className="w-10 h-10"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-1"
            >
              Add Tag
            </button>
            <button
              onClick={() => setIsAddingTag(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TagSelector