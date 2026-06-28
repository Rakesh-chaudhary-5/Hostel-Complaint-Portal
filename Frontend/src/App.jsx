import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Outlet } from 'react-router-dom'
import MyProvider from './Context/userContext'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MyProvider>
    <Navbar />
    <Outlet/>
    
    <ToastContainer
    position='top-right'
    autoClose={3000}
     />

    </MyProvider>
  )
}

export default App
