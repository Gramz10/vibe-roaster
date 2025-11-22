<div align="center">

# 🔥 Vibe-Roaster

### *AI that roasts your code's security—so you can fix it before hackers do*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/gerardoramirez/vibe-roaster?style=social)](https://github.com/gerardoramirez/vibe-roaster)

[Live Demo](https://vibe-roaster.com) • [Documentation](docs/) • [Report Bug](https://github.com/Gramz10/vibe-roaster/issues) • [Request Feature](https://github.com/Gramz10/vibe-roaster/issues)

---

</div>

## 🎯 What is Vibe-Roaster?

**Vibe-Roaster** turns boring security audits into entertaining learning experiences. It's an AI-powered tool that scans your codebase for vulnerabilities, then delivers the findings with personality—think of it as a security-conscious friend who's not afraid to call out your sketchy code.

### Why does this exist?

- 🥱 Security reports are boring → Nobody reads them
- 😰 Security tools are intimidating → Developers avoid them  
- 📚 Learning secure coding is tedious → It feels like homework
- 🤖 AI makes everything better → Why not security reviews?

### What makes it different?

Instead of this:
```
[ERROR] SQL Injection vulnerability detected at line 42
```

You get this:
```
🔥 ROAST: Did you really just string concatenate user input into a SQL query? 
That's not "living dangerously," that's leaving your database door wide open 
with a neon "HACK ME" sign. Bobby Tables would have a field day with this.

💡 FIX: Use parameterized queries. Here's what it should look like...
```

---

## ✨ Features

- 🔍 **Deep Code Analysis** — Scans for SQL injection, XSS, exposed secrets, insecure auth, and more
- 🤖 **AI-Powered Roasts** — GPT-4 delivers findings with humor and personality
- 🎓 **Educational** — Every roast includes why it's bad and how to fix it
- 🎚️ **Adjustable Intensity** — From "gentle nudge" to "Gordon Ramsay mode"
- 🔗 **GitHub Integration** — Analyze any public or private repo in seconds
- ⚡ **Fast** — Results in under 2 minutes for most repositories
- 🎨 **Beautiful UI** — Because security tools don't have to look like Terminal from 1997
- 🔒 **Privacy-First** — Your code is analyzed in memory and never stored

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional but recommended)

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/gerardoramirez/vibe-roaster.git
cd vibe-roaster

# Copy environment variables
cp .env.example .env

# Add your OpenAI API key to .env
# OPENAI_API_KEY=sk-...

# Start everything with Docker Compose
docker-compose up

# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Manual Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

See [Backend README](backend/README.md) for detailed local development instructions.

---

## 🛠️ Tech Stack

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### DevOps
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📸 Demo

> 🚧 **Coming Soon!** Animated demo GIF showcasing the roast experience

<!--
![Vibe-Roaster Demo](docs/assets/demo.gif)
-->

**What you'll see:**
1. Connect your GitHub account
2. Select a repository to analyze
3. Watch the AI scan your code
4. Get roasted (but educated!)
5. Fix your security issues
6. Share the epic roasts with your team

---

## 🗺️ Roadmap

- [x] 🏗️ Project foundation and architecture
- [ ] 🔐 GitHub OAuth integration
- [ ] 🔍 Core security analysis engine
- [ ] 🤖 AI roast generation with GPT-4
- [ ] 🎨 Beautiful web dashboard
- [ ] 📊 Detailed vulnerability reports
- [ ] 🔄 CI/CD integration (GitHub Actions)
- [ ] 💻 CLI tool for local analysis
- [ ] 🔌 VS Code extension
- [ ] 👥 Team collaboration features
- [ ] 📈 Security score tracking over time
- [ ] 🌍 Multi-language support (Java, Go, Rust)

See [ROADMAP.md](docs/ROADMAP.md) for detailed plans.

---

## 🤝 Contributing

This is an **open-source project built in public**. Contributions are not just welcome—they're encouraged!

Whether you want to:
- 🐛 Fix a bug
- ✨ Add a feature
- 📝 Improve documentation
- 🎨 Design UI improvements
- 🧪 Write tests

Check out our [Contributing Guide](docs/CONTRIBUTING.md) to get started.

---

## 🔒 Security

Found a security vulnerability? Please **do not** open a public issue. See our [Security Policy](docs/SECURITY.md) for responsible disclosure procedures.

We take security seriously (ironically, that's the whole point of this project).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR:** You can use this for anything, anywhere, with attribution. Go wild.

---

## 🌟 Show Your Support

If Vibe-Roaster helped you write more secure code (or just made you laugh), give it a ⭐️!

[![GitHub Stars](https://img.shields.io/github/stars/gerardoramirez/vibe-roaster?style=social)](https://github.com/gerardoramirez/vibe-roaster)

---

## 📬 Contact & Social

**Built by:** Gerardo Ramirez

- 💼 LinkedIn: [linkedin.com/in/gram95](https://www.linkedin.com/in/gram95)
- 🐦 Twitter: [@grammz10](https://twitter.com/grammz10)
- ✉️ Email: gerardoram1010@gmail.com

---

## 💡 Inspiration

Built with inspiration from projects like:
- [Raycast](https://github.com/raycast) — Polish and attention to detail
- [tldraw](https://github.com/tldraw/tldraw) — Beautiful open-source execution
- [Cursor](https://cursor.sh) — AI-powered developer tools done right

---

<div align="center">

**Made with ❤️ and excessive amounts of coffee**

*Remember: The best time to fix security issues was yesterday. The second-best time is now—after getting roasted.*

</div>
