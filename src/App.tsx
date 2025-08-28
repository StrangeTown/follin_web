import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import useHistory from './store/useHistory'
// import Todos from './pages/Todos'
import './App.css'

function App() {
  const checkHistoryTodos = useHistory(state => state.checkHistoryTodos)

  useEffect(() => {
    checkHistoryTodos()
  }, [checkHistoryTodos])

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