import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import Todos from './pages/Todos'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App