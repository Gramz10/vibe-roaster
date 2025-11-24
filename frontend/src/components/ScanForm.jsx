import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub } from 'react-icons/fi'
import { HiOutlineFire } from 'react-icons/hi'
import { EXAMPLE_REPOS } from '../utils/constants'

function ScanForm({ onScan, error }) {
  const [repoUrl, setRepoUrl] = useState('')
  const [isValid, setIsValid] = useState(true)

  const validateGithubUrl = (url) => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/
    return githubRegex.test(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateGithubUrl(repoUrl)) {
      setIsValid(false)
      return
    }

    setIsValid(true)
    onScan(repoUrl)
  }

  const handleInputChange = (e) => {
    setRepoUrl(e.target.value)
    setIsValid(true)
  }

  const handleExampleClick = (url) => {
    setRepoUrl(url)
    setIsValid(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          <span className="text-gradient">Roast</span> Your Repo
        </h1>
        <p className="text-xl opacity-80">
          Paste your GitHub repository URL and let Grok tear it apart 🔥
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="card bg-base-200 shadow-2xl"
      >
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold flex items-center gap-2">
                  <FiGithub className="text-xl" />
                  GitHub Repository URL
                </span>
              </label>
              <input
                type="text"
                placeholder="https://github.com/username/repository"
                className={`input input-bordered input-lg w-full ${
                  !isValid || error ? 'input-error' : ''
                }`}
                value={repoUrl}
                onChange={handleInputChange}
                required
              />
              {!isValid && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Please enter a valid GitHub repository URL
                  </span>
                </label>
              )}
              {error && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {error}
                  </span>
                </label>
              )}
            </div>

            {/* Examples */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Try an example:</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_REPOS.map((url, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExampleClick(url)}
                    className="btn btn-sm btn-outline btn-secondary"
                  >
                    {url.split('/').slice(-1)[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-full gap-2 text-xl"
              disabled={!repoUrl.trim()}
            >
              <HiOutlineFire className="text-2xl" />
              Start Roasting
            </button>
          </form>

          {/* Info */}
          <div className="alert mt-6">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                <span className="text-2xl">ℹ️</span>
                What happens next?
              </h3>
              <ul className="text-sm mt-2 space-y-1 opacity-80">
                <li>• We clone your repo temporarily (deleted after scan)</li>
                <li>• Run TruffleHog, Semgrep, Bandit, and dependency scans</li>
                <li>• Grok-4 analyzes findings and crafts a hilarious roast</li>
                <li>• Results ready in 2-3 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-4 mt-8"
      >
        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <span className="text-3xl mb-2">🔒</span>
            <h3 className="font-semibold">Private & Secure</h3>
            <p className="text-sm opacity-70">Repos deleted after scan</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <span className="text-3xl mb-2">⚡</span>
            <h3 className="font-semibold">Lightning Fast</h3>
            <p className="text-sm opacity-70">Results in 2-3 minutes</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body items-center text-center">
            <span className="text-3xl mb-2">💯</span>
            <h3 className="font-semibold">Always Free</h3>
            <p className="text-sm opacity-70">Open source forever</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ScanForm

