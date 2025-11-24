import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiCheck } from 'react-icons/fi'

function DemoSection() {
  const [demoInput, setDemoInput] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  const mockRoast = {
    score: 6,
    roast: "Your code has more holes than Swiss cheese at a rodent reunion. Rolling out the red carpet for hackers with that temp file usage, are we? And congrats on possibly binding your app to everything but your grandma's toaster - a true masterpiece of over-sharing! 🧀🐭",
    findings: [
      {
        type: 'Insecure temp file',
        severity: 'medium',
        file_path: 'app/config.py',
        line_number: 34,
      },
      {
        type: 'Binding to all interfaces',
        severity: 'medium',
        file_path: 'app/main.py',
        line_number: 223,
      },
    ],
  }

  const handleDemoScan = () => {
    if (demoInput.trim()) {
      setShowDemo(true)
    }
  }

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            See It In Action
          </h2>
          <p className="text-center text-lg mb-12 opacity-80">
            Enter any GitHub repo URL to see what Grok thinks about it
          </p>

          {/* Demo Input */}
          <div className="card bg-base-100 shadow-xl p-6 mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://github.com/username/repo"
                className="input input-bordered w-full"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleDemoScan()}
              />
              <button
                onClick={handleDemoScan}
                className="btn btn-primary gap-2"
                disabled={!demoInput.trim()}
              >
                <FiPlay /> Scan
              </button>
            </div>
          </div>

          {/* Demo Results */}
          {showDemo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card bg-base-100 shadow-2xl overflow-hidden"
            >
              {/* Score Badge */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
                <div className="text-6xl font-black text-white mb-2">
                  {mockRoast.score}/10
                </div>
                <div className="text-white/90 text-lg">Security Score</div>
              </div>

              <div className="p-6">
                {/* Roast */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    🔥 The Roast
                  </h3>
                  <p className="text-lg leading-relaxed bg-base-200 p-4 rounded-lg">
                    {mockRoast.roast}
                  </p>
                </div>

                {/* Findings */}
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    🐛 Vulnerabilities Found
                  </h3>
                  <div className="space-y-3">
                    {mockRoast.findings.map((finding, index) => (
                      <div
                        key={index}
                        className="alert alert-warning flex items-start"
                      >
                        <div className="flex-1">
                          <div className="font-semibold">{finding.type}</div>
                          <div className="text-sm opacity-70">
                            {finding.file_path}:{finding.line_number}
                          </div>
                        </div>
                        <span className="badge badge-warning">
                          {finding.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 text-center">
                  <p className="text-sm opacity-70 mb-3">
                    This is a demo. Get real results with actual scanning!
                  </p>
                  <a href="/scan" className="btn btn-primary btn-wide">
                    Scan Your Real Repo
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default DemoSection

