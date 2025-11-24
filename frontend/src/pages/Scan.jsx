import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import ScanForm from '../components/ScanForm'
import LoadingState from '../components/LoadingState'
import ScanResults from '../components/ScanResults'
import { scanRepository } from '../utils/api'

function Scan() {
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleScan = async (repoUrl) => {
    setIsScanning(true)
    setError(null)
    setResults(null)

    try {
      const data = await scanRepository(repoUrl)
      setResults(data)
      toast.success('Scan completed! 🔥')
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to scan repository'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Scan error:', err)
    } finally {
      setIsScanning(false)
    }
  }

  const handleReset = () => {
    setResults(null)
    setError(null)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {!isScanning && !results && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ScanForm onScan={handleScan} error={error} />
            </motion.div>
          )}

          {isScanning && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingState />
            </motion.div>
          )}

          {results && !isScanning && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ScanResults results={results} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Scan

