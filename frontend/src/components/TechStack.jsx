import { motion } from 'framer-motion'
import { TECH_STACK } from '../utils/constants'

function TechStack() {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powered By Modern Tech
          </h2>
          <p className="text-lg opacity-80 mb-12 max-w-2xl mx-auto">
            Built with the latest tools for security scanning and AI-powered analysis
          </p>

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {TECH_STACK.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="badge badge-lg gap-2 p-5 bg-base-100 hover:bg-base-300 transition-all cursor-default text-lg"
              >
                <span className="text-2xl">{tech.icon}</span>
                {tech.name}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="alert alert-info max-w-2xl mx-auto shadow-lg">
              <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-bold">Built with xAI Grok-4</h3>
                  <p className="text-sm">
                    Elon's AI delivers the spiciest security roasts 🔥
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack

