import React from 'react'
import { Template } from '../types/todo'
import TagDot from './TagDot'

interface TemplateListProps {
  templates: Template[]
  selectedTemplates: string[]
  onSelectedTemplatesChange: (selectedIds: string[]) => void
}

function TemplateList({ templates, selectedTemplates, onSelectedTemplatesChange }: TemplateListProps) {
  const toggleTemplate = (templateId: string) => {
    onSelectedTemplatesChange(
      selectedTemplates.includes(templateId)
        ? selectedTemplates.filter(id => id !== templateId)
        : [...selectedTemplates, templateId]
    )
  }

  return (
    <div>
      {templates.length === 0 ? (
        <p className="text-gray-500 text-center">No templates available</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {templates.map(template => (
            <li 
              key={template.id}
              onClick={() => toggleTemplate(template.id)}
              className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer ${
                selectedTemplates.includes(template.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTemplates.includes(template.id)}
                  onChange={() => toggleTemplate(template.id)}
                  className="w-3 h-3"
                />
                <div>
                  <h3 className="text-sm font-medium">{template.title}</h3>
                  <div className="flex gap-1 mt-0.5">
                    {template.tags?.map(tag => (
                      <TagDot key={tag.id} tag={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TemplateList