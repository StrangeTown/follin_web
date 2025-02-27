import React, { useState } from 'react'
import { X, Plus } from 'lucide-react'
import CreateTemplateModal from './CreateTemplateModal'

import useStore from '../store/useStore'
import useTemplateStore from '../store/useTemplateStore'

interface ImportFromTemplateModalProps {
  isOpen: boolean
  onClose: () => void
}

function ImportFromTemplateModal({ isOpen, onClose }: ImportFromTemplateModalProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const { templates } = useTemplateStore()
  const { addTodo } = useStore()

  const toggleTemplate = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const handleImportSelected = () => {
    selectedTemplates.forEach(templateId => {
      const template = templates.find(t => t.id === templateId)
      if (template) {
        addTodo({
          title: template.title,
          tags: template.tags
        })
      }
    })
    setSelectedTemplates([])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import from Template</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="p-1 hover:bg-gray-100 rounded-full text-blue-600"
              title="Create new template"
            >
              <Plus className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {templates.length === 0 ? (
          <p className="text-gray-500 text-center">No templates available</p>
        ) : (
          <>
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
            {selectedTemplates.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={handleImportSelected}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Import Selected ({selectedTemplates.length})
                </button>
              </div>
            )}
          </>
        )}

        <CreateTemplateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  )
}

export default ImportFromTemplateModal