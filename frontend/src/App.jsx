import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Scan from './pages/Scan'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
      </main>
      
      <Footer />
      
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#16213E' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            border: '1px solid #FF6B6B',
          },
          success: {
            iconTheme: {
              primary: '#4ECDC4',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF6B6B',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

export default App

