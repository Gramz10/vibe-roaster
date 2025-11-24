import { motion } from 'framer-motion'
import { FiZap, FiShield, FiSmile, FiGithub } from 'react-icons/fi'

const features = [
  {
    icon: <FiZap className="text-4xl" />,
    title: 'Lightning Fast',
    description: 'Scan repos in minutes with parallel security tools. TruffleHog, Semgrep, and Bandit working in harmony.',
    color: 'primary',
  },
  {
    icon: <FiShield className="text-4xl" />,
    title: 'Comprehensive',
    description: 'Detects secrets, SAST issues, insecure configs, and more. Covers OWASP Top 10 vulnerabilities.',
    color: 'secondary',
  },
  {
    icon: <FiSmile className="text-4xl" />,
    title: 'Actually Funny',
    description: 'Grok-4 delivers savage yet helpful roasts. Learn security while laughing at your mistakes.',
    color: 'accent',
  },
  {
    icon: <FiGithub className="text-4xl" />,
    title: 'Open Source',
    description: 'Fully transparent. Check the code, contribute, or self-host. MIT licensed for everyone.',
    color: 'info',
  },
]

function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Vibe-Roaster?
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Security scanning doesn't have to be boring. Get real insights with a side of humor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="card-body items-center text-center">
                <div className={`text-${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="card-title text-2xl mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

