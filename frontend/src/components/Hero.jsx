import { motion } from 'framer-motion'
import { HiOutlineFire } from 'react-icons/hi'
import { FiGithub, FiStar } from 'react-icons/fi'

function Hero({ navigate }) {
  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badges */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <a
              href="https://github.com/Gramz10/vibe-roaster"
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-lg gap-2 bg-base-200 hover:bg-base-300 transition-all cursor-pointer"
            >
              <FiGithub /> Open Source
            </a>
            <a
              href="https://github.com/Gramz10/vibe-roaster"
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-lg gap-2 bg-base-200 hover:bg-base-300 transition-all cursor-pointer"
            >
              <FiStar /> Star on GitHub
            </a>
            <span className="badge badge-lg gap-2 bg-primary text-primary-content">
              🤖 Powered by Grok-4
            </span>
          </div>

          {/* Main heading */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              Get Your{' '}
              <span className="text-gradient inline-block">Vibe-Code</span>{' '}
              <br className="hidden md:block" />
              Roasted Before{' '}
              <span className="inline-flex items-center gap-2">
                Hackers Do
                <HiOutlineFire className="text-primary animate-pulse" />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-base-content/80 max-w-3xl mx-auto"
          >
            AI-powered security scanner that finds vulnerabilities in your code
            with humor. <br className="hidden md:block" />
            TruffleHog + Semgrep + Bandit + Grok = 🔥 savage roasts
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button
              onClick={() => navigate('/scan')}
              className="btn btn-primary btn-lg gap-2 text-lg shadow-lg hover:shadow-primary/50 transition-all"
            >
              <HiOutlineFire className="text-2xl" />
              Roast My Repo
            </button>
            <a
              href="https://github.com/Gramz10/vibe-roaster"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg gap-2 text-lg"
            >
              <FiGithub className="text-2xl" />
              View on GitHub
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="stats stats-vertical md:stats-horizontal shadow-xl mt-12 bg-base-200"
          >
            <div className="stat">
              <div className="stat-title">Repos Scanned</div>
              <div className="stat-value text-primary">1,234</div>
              <div className="stat-desc">And counting...</div>
            </div>
            <div className="stat">
              <div className="stat-title">Vulnerabilities Found</div>
              <div className="stat-value text-secondary">12.3K</div>
              <div className="stat-desc">Before hackers did</div>
            </div>
            <div className="stat">
              <div className="stat-title">Roasts Delivered</div>
              <div className="stat-value text-accent">9,876</div>
              <div className="stat-desc">🔥🔥🔥</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 left-10 text-6xl opacity-20"
      >
        🔥
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-10 text-6xl opacity-20"
      >
        🛡️
      </motion.div>
    </section>
  )
}

export default Hero

