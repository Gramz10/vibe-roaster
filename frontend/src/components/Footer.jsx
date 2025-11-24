import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'
import { HiOutlineFire } from 'react-icons/hi'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content border-t border-base-300">
      <div>
        <HiOutlineFire className="text-primary text-5xl" />
        <p className="font-bold text-lg">
          Vibe-Roaster 🔥
        </p>
        <p className="text-sm opacity-70">
          AI-powered security roasting since 2025
        </p>
      </div>
      
      <div className="grid grid-flow-col gap-4">
        <a
          href="https://github.com/Gramz10"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle"
          aria-label="GitHub"
        >
          <FiGithub className="text-xl" />
        </a>
        <a
          href="https://twitter.com/grammz10"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle"
          aria-label="Twitter"
        >
          <FiTwitter className="text-xl" />
        </a>
        <a
          href="https://linkedin.com/in/gram95"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle"
          aria-label="LinkedIn"
        >
          <FiLinkedin className="text-xl" />
        </a>
        <a
          href="mailto:gerardoram1010@gmail.com"
          className="btn btn-ghost btn-circle"
          aria-label="Email"
        >
          <FiMail className="text-xl" />
        </a>
      </div>
      
      <div className="text-sm opacity-70">
        <p>
          Built with ❤️ by{' '}
          <a
            href="https://github.com/Gramz10"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            Gerardo Ramirez
          </a>
        </p>
        <p className="mt-2">
          © {currentYear} Vibe-Roaster. Open source under MIT License.
        </p>
      </div>
      
      <div className="flex gap-2 flex-wrap justify-center text-xs opacity-60">
        <a
          href="https://github.com/Gramz10/vibe-roaster/blob/main/docs/SECURITY.md"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Security Policy
        </a>
        <span>•</span>
        <a
          href="https://github.com/Gramz10/vibe-roaster/blob/main/docs/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Contributing
        </a>
        <span>•</span>
        <a
          href="https://github.com/Gramz10/vibe-roaster"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer

