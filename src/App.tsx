import './App.css'
import useStore from './store/useStore'

function App() {
  const { count, increment, decrement } = useStore()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-blue-600">
        Vite + React + Tailwind + Zustand
      </h1>
      <div className="flex items-center gap-4">
        <button 
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-2xl">{count}</span>
        <button 
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default App
