import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Todos from './pages/Todos'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex gap-4">
            <Link to="/" className="hover:text-blue-300">Home</Link>
            <Link to="/todos" className="hover:text-blue-300">Todos</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App