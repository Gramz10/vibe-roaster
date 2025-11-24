import { motion } from 'framer-motion'
import { HiOutlineFire } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'

function CTA({ navigate }) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-2xl"
        >
          <div className="card-body items-center text-center py-16">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl md:text-8xl mb-6"
            >
              🔥
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Ready to Get Roasted?
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl">
              Find vulnerabilities before hackers do. Get savage security insights powered by Grok-4.
            </p>
            
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => navigate('/scan')}
                className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none gap-2 text-xl shadow-xl"
              >
                <HiOutlineFire className="text-2xl" />
                Roast My Repo Now
              </button>
              
              <a
                href="https://github.com/Gramz10/vibe-roaster"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary gap-2 text-xl"
              >
                <FiGithub className="text-2xl" />
                Star on GitHub
              </a>
            </div>
            
            <div className="mt-8 text-sm opacity-75">
              <p>🔒 Your code stays private • 🚀 Results in 2-3 minutes • 💯 Free forever</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA

