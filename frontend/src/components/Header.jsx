import { Link, useLocation } from 'react-router-dom'
import { FiSun, FiMoon, FiGithub } from 'react-icons/fi'
import { HiOutlineFire } from 'react-icons/hi'

function Header({ theme, toggleTheme }) {
  const location = useLocation()
  
  return (
    <header className="navbar bg-base-200 sticky top-0 z-50 backdrop-blur-md bg-opacity-90 border-b border-base-300">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl gap-2">
          <HiOutlineFire className="text-primary text-2xl" />
          <span className="hidden sm:inline">Vibe-Roaster</span>
          <span className="sm:hidden">VR</span>
        </Link>
      </div>
      
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/scan" 
              className={location.pathname === '/scan' ? 'active' : ''}
            >
              Scan
            </Link>
          </li>
          <li>
            <a 
              href="https://github.com/Gramz10/vibe-roaster" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Docs
            </a>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        <a
          href="https://github.com/Gramz10/vibe-roaster"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle"
          aria-label="GitHub"
        >
          <FiGithub className="text-xl" />
        </a>
        
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <FiSun className="text-xl" />
          ) : (
            <FiMoon className="text-xl" />
          )}
        </button>
      </div>
    </header>
  )
}

export default Header

