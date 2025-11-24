import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import DemoSection from '../components/DemoSection'
import TechStack from '../components/TechStack'
import Features from '../components/Features'
import CTA from '../components/CTA'

function Home() {
  const [showConfetti, setShowConfetti] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Show confetti on page load
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {showConfetti && <Confetti />}
      
      <Hero navigate={navigate} />
      <DemoSection />
      <Features />
      <TechStack />
      <CTA navigate={navigate} />
    </div>
  )
}

// Confetti component
function Confetti() {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181']
  const confettiCount = 50

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(confettiCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: 0,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default Home

