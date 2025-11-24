// App constants

export const TECH_STACK = [
  { name: 'React', icon: '⚛️' },
  { name: 'Grok-4', icon: '🤖' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Python', icon: '🐍' },
  { name: 'TruffleHog', icon: '🔍' },
  { name: 'Semgrep', icon: '🛡️' },
]

export const LOADING_MESSAGES = [
  'Grok is sharpening the roasting knife... 🔪',
  'Scanning for vibe-coded vulnerabilities... 🕵️',
  'Finding those "it works on my machine" bugs... 💻',
  'Checking if your API keys are public... 🔑',
  'Detecting hardcoded passwords... 🤦',
  'Looking for SQL injection spots... 💉',
  'Finding XSS vulnerabilities... 🦠',
  'Checking for insecure temp files... 📁',
  'Grok is laughing at your code... 😂',
  'Preparing the roast... 🔥',
]

export const SCORE_LEVELS = {
  CRITICAL: { min: 0, max: 3, label: 'Critical 🚨', color: 'error', emoji: '☠️' },
  BAD: { min: 4, max: 5, label: 'Bad 😬', color: 'warning', emoji: '😬' },
  MEH: { min: 6, max: 7, label: 'Meh 😐', color: 'info', emoji: '😐' },
  GOOD: { min: 8, max: 9, label: 'Good ✅', color: 'success', emoji: '✅' },
  PERFECT: { min: 10, max: 10, label: 'Perfect 🏆', color: 'success', emoji: '🏆' },
}

export const EXAMPLE_REPOS = [
  'https://github.com/Gramz10/vibe-roaster',
  'https://github.com/facebook/react',
  'https://github.com/vercel/next.js',
]

export const GIPHY_API_KEY = 'gsk_your_giphy_api_key_here' // Replace with actual key

export const SHARE_TEXT = (score, repoName) => 
  `I just got my ${repoName} repo roasted by Vibe-Roaster 🔥 Score: ${score}/10! Get yours at`

export const VULNERABILITY_ICONS = {
  'SQL Injection': '💉',
  'XSS': '🦠',
  'Secrets': '🔑',
  'Hardcoded': '🔒',
  'Insecure': '⚠️',
  'B108': '📁',
  'B104': '🌐',
  'B103': '🔐',
  'default': '🐛',
}

