import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiTwitter, FiCopy, FiRefreshCw } from 'react-icons/fi'
import { SiReddit } from 'react-icons/si'
import toast from 'react-hot-toast'
import { SCORE_LEVELS, VULNERABILITY_ICONS, SHARE_TEXT } from '../utils/constants'

function ScanResults({ results, onReset }) {
  const [copied, setCopied] = useState(false)

  const getScoreLevel = (score) => {
    for (const level of Object.values(SCORE_LEVELS)) {
      if (score >= level.min && score <= level.max) {
        return level
      }
    }
    return SCORE_LEVELS.MEH
  }

  const scoreLevel = getScoreLevel(results.score)
  const repoName = results.repo_url ? results.repo_url.split('/').slice(-1)[0] : 'repo'

  const handleShare = (platform) => {
    const shareUrl = window.location.href
    const text = SHARE_TEXT(results.score, repoName)
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      reddit: `https://reddit.com/submit?title=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
    }

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=550,height=420')
    }
  }

  const handleCopyLink = () => {
    const shareUrl = window.location.href
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success('Link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const getVulnerabilityIcon = (type) => {
    for (const key of Object.keys(VULNERABILITY_ICONS)) {
      if (type.includes(key)) {
        return VULNERABILITY_ICONS[key]
      }
    }
    return VULNERABILITY_ICONS.default
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header with Score */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Scan Results for{' '}
          <span className="text-gradient">{repoName}</span>
        </h1>
      </motion.div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`card bg-${scoreLevel.color} text-white shadow-2xl`}
      >
        <div className="card-body items-center text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-8xl md:text-9xl font-black mb-4"
          >
            {results.score}/10
          </motion.div>
          <div className="text-3xl font-bold flex items-center gap-2">
            {scoreLevel.label} {scoreLevel.emoji}
          </div>
          <p className="text-lg opacity-90 mt-2">Security Score</p>
        </div>
      </motion.div>

      {/* The Roast */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-base-200 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title text-3xl mb-4 flex items-center gap-2">
            <span className="text-4xl">🔥</span>
            The Roast
          </h2>
          <blockquote className="text-lg leading-relaxed bg-base-100 p-6 rounded-lg border-l-4 border-primary">
            "{results.roast}"
          </blockquote>
          <div className="card-actions justify-end mt-4">
            <div className="badge badge-lg gap-2">
              <span>🤖</span>
              Roasted by Grok-4
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vulnerabilities Found */}
      {results.findings && results.findings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card bg-base-200 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4 flex items-center gap-2">
              <span className="text-4xl">🐛</span>
              Vulnerabilities Found
              <span className="badge badge-error badge-lg">
                {results.findings.length}
              </span>
            </h2>
            <div className="space-y-3">
              {results.findings.map((finding, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`alert ${
                    finding.severity === 'high' || finding.severity === 'critical'
                      ? 'alert-error'
                      : finding.severity === 'medium'
                      ? 'alert-warning'
                      : 'alert-info'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-2xl">{getVulnerabilityIcon(finding.type)}</span>
                      {finding.type}
                    </div>
                    <div className="text-sm opacity-80 mt-1">
                      {finding.description}
                    </div>
                    {finding.file_path && (
                      <div className="text-xs font-mono mt-2 opacity-70">
                        {finding.file_path}
                        {finding.line_number && `:${finding.line_number}`}
                      </div>
                    )}
                    {finding.code_snippet && (
                      <pre className="text-xs bg-base-100 p-2 rounded mt-2 overflow-x-auto">
                        <code>{finding.code_snippet}</code>
                      </pre>
                    )}
                  </div>
                  <span className="badge badge-lg">
                    {finding.severity}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Suggested Fixes */}
      {results.suggested_fixes && results.suggested_fixes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card bg-success/10 border-2 border-success shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4 flex items-center gap-2 text-success">
              <span className="text-4xl">✨</span>
              Suggested Fixes
            </h2>
            <div className="space-y-4">
              {results.suggested_fixes.map((fix, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="bg-base-200 p-4 rounded-lg"
                >
                  <div className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="badge badge-success">{fix.finding_type}</span>
                  </div>
                  <p className="mb-2">{fix.fix}</p>
                  {fix.example && (
                    <pre className="text-sm bg-base-100 p-3 rounded overflow-x-auto">
                      <code>{fix.example}</code>
                    </pre>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Share & Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="card bg-base-200 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Share Your Results</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleShare('twitter')}
              className="btn btn-primary gap-2"
            >
              <FiTwitter className="text-xl" />
              Share on X
            </button>
            <button
              onClick={() => handleShare('reddit')}
              className="btn btn-secondary gap-2"
            >
              <SiReddit className="text-xl" />
              Share on Reddit
            </button>
            <button
              onClick={handleCopyLink}
              className={`btn ${copied ? 'btn-success' : 'btn-outline'} gap-2`}
            >
              <FiCopy className="text-xl" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Roast Another */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <button
          onClick={onReset}
          className="btn btn-lg btn-outline gap-2"
        >
          <FiRefreshCw className="text-xl" />
          Roast Another Repo
        </button>
      </motion.div>

      {/* Scan Metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="text-center text-sm opacity-60"
      >
        <p>
          Scanned: {new Date(results.scan_timestamp).toLocaleString()} •
          Repo: <a href={results.repo_url} target="_blank" rel="noopener noreferrer" className="link">{results.repo_url}</a>
        </p>
      </motion.div>
    </div>
  )
}

export default ScanResults

