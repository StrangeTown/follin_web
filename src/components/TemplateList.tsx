import React from 'react'
import { Template } from '../types/todo'

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
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                selectedTemplates.includes(template.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedTemplates.includes(template.id)}
                  onChange={() => toggleTemplate(template.id)}
                  className="w-4 h-4"
                />
                <div>
                  <h3 className="font-medium">{template.title}</h3>
                  <div className="flex gap-1 mt-1">
                    {template.tags?.map(tag => (
                      <span
                        key={tag.id}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tag.color }}
                        title={tag.name}
                      />
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