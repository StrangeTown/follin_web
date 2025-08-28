import { useEffect } from 'react'

type Props = {
  open: boolean
  message: string
  duration?: number
  onClose: () => void
}

export default function Toast({ open, message, duration = 3000, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const id = setTimeout(onClose, duration)
    return () => clearTimeout(id)
  }, [open, duration, onClose])

  if (!open) return null

  return (
    <div className="fixed right-4 bottom-6 z-50">
      <div className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg">{message}</div>
    </div>
  )
}
