import React from 'react'
import { Template } from '../types/todo'
import { Trash2 } from 'lucide-react'
import TagDot from './TagDot'

interface TemplateListProps {
  templates: Template[]
  selectedTemplates: string[]
  onSelectedTemplatesChange: (selectedIds: string[]) => void
  onRemoveTemplate: (id: string) => void
}

function TemplateList({ 
  templates, 
  selectedTemplates, 
  onSelectedTemplatesChange,
  onRemoveTemplate
}: TemplateListProps) {
  
  const toggleTemplate = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      onSelectedTemplatesChange(selectedTemplates.filter(id => id !== templateId))
    } else {
      onSelectedTemplatesChange([...selectedTemplates, templateId])
    }
  }

  return (
    <div className="max-h-60 overflow-y-auto mb-4">
      {templates.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No templates available</p>
      ) : (
        <ul className="space-y-2">
          {templates.map(template => (
            <li 
              key={template.id} 
              className="flex items-center p-2 hover:bg-gray-50 rounded"
            >
              <input
                type="checkbox"
                checked={selectedTemplates.includes(template.id)}
                onChange={() => toggleTemplate(template.id)}
                className="mr-3"
              />
              <div className="flex-1">
                <div>{template.title}</div>
                <div className="flex gap-1 mt-1">
                  {template.tags?.map(tag => (
                    <TagDot key={tag.id} tag={tag} />
                  ))}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTemplate(template.id);
                }}
                className="p-1 text-red-300 hover:text-red-500 hover:bg-red-50 rounded"
                title="Remove template"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TemplateList