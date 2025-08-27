import { useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onCreate: (title: string) => void
}

export default function CreateTodoModal({ open, onClose, onCreate }: Props) {
  const [title, setTitle] = useState('')

  if (!open) return null

  function submit() {
    const value = title.trim()
    if (!value) return
    onCreate(value)
    setTitle('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-white rounded shadow-lg w-full max-w-lg mx-4 p-6 z-10">
        <h2 className="text-lg font-semibold mb-3">Create Todo</h2>

        <label className="block">
          <span className="text-sm text-gray-600">Title</span>
          <input
            className="mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
            placeholder="Enter a todo title"
          />
        </label>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
