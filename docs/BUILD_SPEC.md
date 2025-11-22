# Vibe-Roaster Build Specification

**Version:** 1.0  
**Last Updated:** November 22, 2025  
**Status:** Active Development

---

## 🎯 Project Vision

**Vibe-Roaster** is an AI-powered security analysis tool that reviews code repositories for common security vulnerabilities and bad practices—but with personality. Instead of dry security reports, Vibe-Roaster delivers entertaining, educational "roasts" that make developers actually want to fix their code.

### The Problem We're Solving

- Security tools are boring and intimidating
- Developers skip security reviews because they're tedious
- Learning secure coding practices feels like homework
- Static analysis tools produce walls of incomprehensible errors

### Our Solution

An AI that:
- Scans code for real security vulnerabilities (SQL injection, XSS, exposed secrets, etc.)
- Delivers findings with humor and personality
- Teaches secure coding through memorable roasts
- Makes security reviews something developers actually look forward to

---

## 🏗️ Architecture Overview

### Technology Stack

#### Backend (API Layer)
- **Framework:** FastAPI (Python 3.11+)
- **AI Integration:** OpenAI GPT-4 API
- **Code Analysis:** AST parsing + custom security rules
- **Database:** PostgreSQL (production), SQLite (development)
- **Task Queue:** Celery + Redis (for async repo analysis)
- **Authentication:** JWT tokens
- **Deployment:** Docker containers on Render/Railway

#### Frontend (Web UI)
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + DaisyUI
- **State Management:** Zustand
- **API Client:** TanStack Query (React Query)
- **Animations:** Framer Motion
- **Deployment:** Vercel/Netlify

#### Infrastructure
- **CI/CD:** GitHub Actions
- **Containerization:** Docker + Docker Compose
- **Monitoring:** Sentry (error tracking)
- **Analytics:** Plausible (privacy-friendly)

---

## 📋 Core Features (MVP)

### Phase 1: Core Analysis Engine
1. **GitHub Repository Integration**
   - OAuth authentication with GitHub
   - Clone and analyze public/private repos
   - Support for multiple languages (Python, JavaScript, TypeScript)

2. **Security Pattern Detection**
   - SQL injection vulnerabilities
   - XSS vulnerabilities
   - Hardcoded secrets/API keys
   - Insecure authentication patterns
   - Missing input validation
   - CORS misconfigurations
   - Insecure dependencies

3. **AI-Powered Roasting**
   - GPT-4 analyzes vulnerability context
   - Generates humorous but educational feedback
   - Includes code snippets and fix suggestions
   - Adjustable roast intensity (mild → savage)

4. **Web Dashboard**
   - View analysis results
   - Filter by severity
   - One-click fix suggestions
   - Share roasts publicly (optional)

### Phase 2: Enhanced Features (Post-MVP)
- CLI tool for local analysis
- IDE extensions (VS Code)
- Custom rule configuration
- Team collaboration features
- Continuous monitoring mode
- Integration with PR workflows

---

## 🔒 Security & Privacy

### Data Handling
- **No permanent storage of source code** (analyzed in memory only)
- Repository access tokens encrypted at rest
- All API communications over HTTPS
- Rate limiting on all endpoints
- Input sanitization and validation

### Compliance
- GDPR compliant (EU users)
- Clear privacy policy
- Responsible disclosure program
- Regular security audits

---

## 🎨 User Experience

### User Journey
1. **Sign in with GitHub** → OAuth flow
2. **Select a repository** → Browse repos or paste URL
3. **Start analysis** → Background job processes code
4. **View roast report** → See findings with humor
5. **Fix and re-scan** → Iterate until code is clean

### Design Principles
- **Humor without condescension** → Educational, not mean
- **Speed matters** → Results in < 2 minutes for typical repos
- **Beautiful UI** → Modern, playful, professional
- **Mobile-friendly** → Responsive design

---

## 📊 Technical Requirements

### Backend API

#### Core Endpoints
```
POST   /api/auth/github/callback     # OAuth callback
GET    /api/auth/me                  # Get current user
POST   /api/analysis/start            # Trigger new analysis
GET    /api/analysis/:id              # Get analysis results
GET    /api/analysis/                 # List user's analyses
DELETE /api/analysis/:id              # Delete analysis
GET    /api/repos/                    # List user's GitHub repos
```

#### Code Analysis Pipeline
1. **Clone Repository** (shallow clone, specific branch)
2. **Language Detection** (identify all file types)
3. **Static Analysis** (AST parsing, pattern matching)
4. **AI Enhancement** (GPT-4 generates roast commentary)
5. **Report Generation** (JSON response with findings)

#### Performance Targets
- API response time: < 200ms (p95)
- Analysis completion: < 2 minutes (typical repo)
- Concurrent analyses: 50+ simultaneous jobs
- Database queries: < 50ms (p95)

### Frontend Application

#### Key Pages
- `/` - Landing page with demo
- `/dashboard` - User's analysis history
- `/analyze` - New analysis interface
- `/report/:id` - Individual roast report
- `/settings` - User preferences

#### State Management
- User authentication state
- Analysis job status (polling/websockets)
- UI preferences (theme, roast intensity)

---

## 🧪 Testing Strategy

### Backend
- **Unit Tests:** 80%+ coverage
- **Integration Tests:** All API endpoints
- **E2E Tests:** Critical user flows
- **Security Tests:** OWASP Top 10 checks

### Frontend
- **Component Tests:** React Testing Library
- **E2E Tests:** Playwright
- **Accessibility Tests:** axe-core integration

### CI/CD Pipeline
- Automated testing on every PR
- Linting (Black, ESLint, Prettier)
- Type checking (mypy, TypeScript)
- Security scanning (Bandit, npm audit)

---

## 📈 Success Metrics

### Technical KPIs
- Analysis accuracy: > 90% true positive rate
- System uptime: 99.5%
- Average analysis time: < 2 minutes
- API error rate: < 0.5%

### User KPIs
- GitHub stars: 1,000+ in 6 months
- Monthly active users: 500+ in 3 months
- User retention: 40%+ (return for 2nd analysis)
- Shared roasts: 20%+ of analyses

---

## 🚀 Deployment Strategy

### Development Environment
- Local Docker Compose setup
- Hot reload for frontend/backend
- Mock AI responses (for cost savings)
- Sample repositories for testing

### Staging Environment
- Deployed on every merge to `main`
- Full feature parity with production
- Real AI integration (limited quota)

### Production Environment
- Zero-downtime deployments
- Automated rollbacks on failure
- Database migrations with Alembic
- Environment-based configuration

---

## 🗓️ Development Phases

### Phase 0: Foundation (Weeks 1-2)
- [x] Project skeleton and repository setup
- [ ] Basic FastAPI backend with health check
- [ ] React + Vite frontend scaffold
- [ ] Docker Compose development environment
- [ ] CI/CD pipeline configuration

### Phase 1: Core Analysis (Weeks 3-6)
- [ ] GitHub OAuth integration
- [ ] Repository cloning service
- [ ] Basic security rule engine
- [ ] OpenAI integration for roast generation
- [ ] Simple analysis results API

### Phase 2: User Interface (Weeks 7-9)
- [ ] Landing page with demo
- [ ] Dashboard with analysis history
- [ ] Analysis trigger interface
- [ ] Roast report viewer
- [ ] Responsive mobile design

### Phase 3: Polish & Launch (Weeks 10-12)
- [ ] Performance optimization
- [ ] Comprehensive testing
- [ ] Documentation completion
- [ ] Security audit
- [ ] Public beta launch

---

## 🤝 Contributing Guidelines

This is an open-source project built in public. We welcome:
- Bug reports and feature requests
- Code contributions (see CONTRIBUTING.md)
- Documentation improvements
- UI/UX feedback

See `docs/CONTRIBUTING.md` for detailed guidelines.

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 📞 Contact

**Maintainer:** Gerardo Ramirez  
**Email:** gerardoram1010@gmail.com  
**GitHub:** [@gerardoramirez](https://github.com/gerardoramirez)

---

**Note:** This specification is a living document and will evolve as the project develops. All major changes will be documented and versioned.

