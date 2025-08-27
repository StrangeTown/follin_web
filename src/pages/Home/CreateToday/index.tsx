import { useState } from 'react'
import { CalendarPlus } from 'lucide-react'

export default function CreateToday() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        aria-label="Create for today"
        className="p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <CalendarPlus className="w-4 h-4" />
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="bg-white p-4 rounded shadow z-10">Create for today (placeholder)</div>
        </div>
      )}
    </div>
  )
}
