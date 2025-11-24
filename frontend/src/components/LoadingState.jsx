import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LOADING_MESSAGES } from '../utils/constants'

function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 3000)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 5
      })
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-base-200 shadow-2xl"
      >
        <div className="card-body items-center text-center py-16">
          {/* Animated Fire */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-8xl mb-8"
          >
            🔥
          </motion.div>

          {/* Loading Message */}
          <motion.h2
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-full max-w-md">
            <div className="flex justify-between text-sm mb-2">
              <span>Scanning...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max="100"
            />
          </div>

          {/* Loading Dots */}
          <div className="loading-dots mt-8 text-primary">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Info */}
          <div className="mt-8 text-sm opacity-70 max-w-md">
            <p>
              Running security scans with TruffleHog, Semgrep, Bandit, and pip-audit.
              Grok is analyzing the results...
            </p>
          </div>

          {/* Scanner Steps */}
          <div className="mt-8 w-full max-w-md">
            <ul className="steps steps-vertical lg:steps-horizontal w-full">
              <li className={`step ${progress > 0 ? 'step-primary' : ''}`}>
                Clone Repo
              </li>
              <li className={`step ${progress > 33 ? 'step-primary' : ''}`}>
                Scan Security
              </li>
              <li className={`step ${progress > 66 ? 'step-primary' : ''}`}>
                Analyze with Grok
              </li>
              <li className={`step ${progress >= 95 ? 'step-primary' : ''}`}>
                Generate Roast
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="alert alert-info mt-6"
      >
        <div>
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold">Pro Tip</h3>
            <p className="text-sm">
              This usually takes 2-3 minutes. Perfect time to grab a coffee! ☕
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingState

