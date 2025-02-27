import React, { useState } from 'react'
import { X, Plus } from 'lucide-react'
import CreateTemplateModal from './CreateTemplateModal'
import TemplateList from './TemplateList'
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

  // Remove toggleTemplate function as it's no longer needed

  const handleImportSelected = () => {
    selectedTemplates.forEach(templateId => {
      const template = templates.find(t => t.id === templateId)
      if (template) {
        addTodo({
          title: template.title,
          tags: template.tags,
          templateId: template.id
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

        <TemplateList
          templates={templates}
          selectedTemplates={selectedTemplates}
          onSelectedTemplatesChange={setSelectedTemplates}
        />

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

        <div className="flex flex-wrap gap-2 mt-4">
          {Array.from(
            new Map(
              templates.flatMap(t => t.tags || [])
                .map(tag => [tag.id, tag])
            ).values()
          ).map(tag => (
            <button
              key={tag.id}
              onClick={() => {
                const templatesWithTag = templates.filter(t => 
                  t.tags?.some(tTag => tTag.id === tag.id)
                )
                templatesWithTag.forEach(template => {
                  addTodo({
                    title: template.title,
                    tags: template.tags,
                    templateId: template.id
                  })
                })
                onClose()
              }}
              className="px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: tag.color + '33',
                color: tag.color,
                border: `1px solid ${tag.color}`
              }}
            >
              Import all "{tag.name}"
            </button>
          ))}
        </div>

        <CreateTemplateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  )
}

export default ImportFromTemplateModal