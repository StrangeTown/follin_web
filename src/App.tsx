import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import useHistory from './store/useHistory'
// import Todos from './pages/Todos'
import './App.css'

function App() {
  const checkHistoryTodos = useHistory(state => state.checkHistoryTodos)

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        console.log('App is visible')
        checkHistoryTodos()
      }
    }

    // log initial state if already visible
    if (document.visibilityState === 'visible') {
      console.log('App is visible')
      checkHistoryTodos()
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
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