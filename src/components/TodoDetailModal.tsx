import { Todo } from '../types/todo'

type Props = {
  open: boolean
  todo: Todo | null
  onClose: () => void
}

function formatTime(ts?: Date | number) {
  if (!ts) return 'unknown'
  if (ts instanceof Date) return ts.toLocaleString()
  return new Date(ts).toLocaleString()
}

export default function TodoDetailModal({ open, todo, onClose }: Props) {
  if (!open || !todo) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-white rounded shadow-lg w-full max-w-md mx-4 p-6 z-10">
        <h3 className="text-lg font-semibold mb-2">Todo details</h3>

        <div className="mb-4">
          <div className="text-sm text-gray-500">Title</div>
          <div className="text-base text-gray-800">{todo.title}</div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500">Created at</div>
          <div className="text-base text-gray-800">{formatTime(todo.createdAt)}</div>
        </div>

        <div className="flex justify-end">
          <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
