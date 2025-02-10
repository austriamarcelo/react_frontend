import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import './App.css'
import Navbar from './components/Navbar'
import AppRoutes from './components/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div className="container">
        <Navbar/>
        <AppRoutes/>
        </div>
      </Router>
    </>
  )
}

export default App
