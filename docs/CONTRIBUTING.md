# Contributing to Vibe-Roaster

First off, thank you for considering contributing to Vibe-Roaster! 🎉

This project is **built in public** as a portfolio project, but that doesn't mean it's a solo effort. Whether you're fixing a typo, adding a feature, or improving documentation, your contributions are valued and appreciated.

---

## 🎯 Project Vision

Before diving in, it's helpful to understand what we're building:

**Vibe-Roaster** is an AI-powered security analysis tool that makes learning secure coding practices fun through humorous "roasts." We're building this to be:

- 🏆 **Resume/portfolio worthy** - Professional code quality
- 📚 **Educational** - For learners and contributors alike
- 😄 **Fun** - Security doesn't have to be boring
- 🌍 **Open-source** - Community-driven development

---

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Found a bug? Help us squash it!

**Before submitting:**
- Check [existing issues](https://github.com/gerardoramirez/vibe-roaster/issues) to avoid duplicates
- Make sure you're using the latest version
- Gather as much info as possible about the bug

**When submitting:**
1. Use the bug report template
2. Include clear steps to reproduce
3. Add screenshots/videos if applicable
4. Specify your environment (OS, browser, versions)

**Security vulnerabilities:** Please do NOT open a public issue. See [SECURITY.md](SECURITY.md) for responsible disclosure.

### ✨ Suggesting Features

Have an idea to make Vibe-Roaster better?

**Before suggesting:**
- Check [existing feature requests](https://github.com/gerardoramirez/vibe-roaster/issues?q=is%3Aissue+label%3Aenhancement)
- Review the [roadmap](ROADMAP.md) to see if it's already planned

**When suggesting:**
1. Use the feature request template
2. Clearly describe the problem it solves
3. Explain your proposed solution
4. Consider alternative approaches
5. Add mockups/examples if relevant

### 📝 Improving Documentation

Documentation is just as important as code!

**Good documentation PRs:**
- Fix typos or grammatical errors
- Clarify confusing instructions
- Add missing setup steps
- Include helpful diagrams or screenshots
- Improve code comments

### 💻 Contributing Code

Ready to write some code? Awesome!

**Good first issues:**
- Look for issues labeled `good first issue`
- These are specifically curated for newcomers
- Don't hesitate to ask questions!

**Process:**
1. Comment on the issue you want to work on
2. Wait for approval/assignment (prevents duplicate work)
3. Fork the repo and create a branch
4. Write your code following our standards (see below)
5. Submit a PR with a clear description
6. Respond to code review feedback
7. Celebrate when it's merged! 🎉

---

## 🏗️ Development Setup

### Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- Docker & Docker Compose (recommended)
- Git
- Code editor (VS Code recommended)

### Quick Start with Docker

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/vibe-roaster.git
cd vibe-roaster

# Copy environment variables
cp .env.example .env

# Add your OpenAI API key to .env
# (Optional for most development - we have mocks)

# Start everything
docker-compose up

# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Manual Setup (Without Docker)

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Dev dependencies

# Run database migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

See [backend/README.md](../backend/README.md) for more detailed setup instructions.

---

## 📋 Code Standards

We maintain high code quality standards—this is a portfolio project, after all!

### General Principles

- **Readability over cleverness** - Code is read more than written
- **Test your changes** - Include tests for new features/bug fixes
- **Document as you go** - Update docs when changing behavior
- **Keep it simple** - Prefer straightforward solutions
- **Think about security** - We're a security tool; lead by example

### Python (Backend)

**Style Guide:** PEP 8 with a few tweaks

```python
# Good: Clear, typed, documented
def analyze_repository(
    repo_url: str,
    branch: str = "main",
    intensity: RoastIntensity = RoastIntensity.MEDIUM
) -> AnalysisResult:
    """Analyze a repository for security vulnerabilities.
    
    Args:
        repo_url: GitHub repository URL
        branch: Git branch to analyze
        intensity: How harsh the roasts should be
        
    Returns:
        Analysis results with vulnerabilities and roasts
        
    Raises:
        InvalidRepoError: If repository URL is invalid
        GitHubAPIError: If unable to access repository
    """
    # Implementation...
    pass

# Bad: No types, no docs, unclear
def analyze(url, b="main"):
    # What does this do? What does it return?
    pass
```

**Type Hints:**
- Required for all function signatures
- Use `typing` module for complex types
- Run `mypy` to verify type correctness

**Testing:**
```python
# Use pytest
def test_detect_sql_injection():
    """Test that SQL injection vulnerabilities are detected."""
    code = "query = f'SELECT * FROM users WHERE id={user_id}'"
    vulnerabilities = scanner.scan(code)
    
    assert len(vulnerabilities) == 1
    assert vulnerabilities[0].type == VulnerabilityType.SQL_INJECTION
```

**Linting:**
```bash
# Format code
black .

# Sort imports
isort .

# Lint
flake8 .
pylint app/

# Type check
mypy app/
```

### TypeScript/React (Frontend)

**Style Guide:** Airbnb React/JSX Style Guide (with TypeScript)

```typescript
// Good: Typed props, clear component
interface RoastCardProps {
  vulnerability: Vulnerability;
  onFixClick?: () => void;
  className?: string;
}

export const RoastCard: React.FC<RoastCardProps> = ({
  vulnerability,
  onFixClick,
  className = ''
}) => {
  return (
    <div className={`card ${className}`}>
      <h3>{vulnerability.type}</h3>
      <p>{vulnerability.roastText}</p>
      {onFixClick && (
        <button onClick={onFixClick}>Show Fix</button>
      )}
    </div>
  );
};

// Bad: No types, inline styles, unclear structure
export const RoastCard = (props) => (
  <div style={{padding: "20px"}}>
    <h3>{props.vuln.type}</h3>
    {props.text}
  </div>
);
```

**Best Practices:**
- Use functional components with hooks
- Prefer TypeScript interfaces over types
- Extract custom hooks for reusable logic
- Keep components small and focused
- Use Tailwind classes (no inline styles)

**Testing:**
```typescript
// Use React Testing Library
describe('RoastCard', () => {
  it('displays vulnerability information', () => {
    const mockVuln = {
      type: 'SQL Injection',
      roastText: 'Did you really just...',
      severity: 'high'
    };
    
    render(<RoastCard vulnerability={mockVuln} />);
    
    expect(screen.getByText('SQL Injection')).toBeInTheDocument();
    expect(screen.getByText(/Did you really/)).toBeInTheDocument();
  });
});
```

**Linting:**
```bash
# Lint and fix
npm run lint
npm run lint:fix

# Type check
npm run type-check

# Format
npm run format
```

---

## 🔄 Git Workflow

### Branch Naming

```
feature/add-xss-detection     # New features
fix/sql-injection-false-positive  # Bug fixes
docs/update-contributing      # Documentation
refactor/simplify-analyzer    # Code refactoring
test/add-e2e-tests           # Test additions
chore/update-dependencies    # Maintenance
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <subject>

# Examples
feat(analyzer): add XSS vulnerability detection
fix(api): handle GitHub rate limiting properly
docs(readme): add installation instructions
test(analyzer): add tests for SQL injection patterns
refactor(roaster): simplify AI prompt generation
chore(deps): update FastAPI to 0.104.0
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `test`: Adding or updating tests
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Subject Line:**
- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at the end
- Max 72 characters

### Pull Request Process

1. **Before creating PR:**
   - Ensure tests pass: `npm test` / `pytest`
   - Run linters: `npm run lint` / `black . && flake8`
   - Update documentation if needed
   - Rebase on latest `main` if needed

2. **PR Title:** Same format as commit messages
   ```
   feat(analyzer): add detection for hardcoded secrets
   ```

3. **PR Description Template:**
   ```markdown
   ## What does this PR do?
   Brief description of changes
   
   ## Why is this needed?
   Explain the problem this solves
   
   ## How did you test this?
   - [ ] Unit tests added/updated
   - [ ] Integration tests pass
   - [ ] Manually tested locally
   
   ## Screenshots (if applicable)
   
   ## Related Issues
   Closes #123
   ```

4. **Review Process:**
   - At least one approval required
   - All CI checks must pass
   - Address all review comments
   - Maintain professional, friendly tone

5. **After Merge:**
   - Delete your branch
   - Update your local main: `git pull origin main`
   - 🎉 Celebrate your contribution!

---

## ✅ Checklist Before Submitting PR

- [ ] Code follows style guidelines (linters pass)
- [ ] Self-review of code completed
- [ ] Comments added to complex/unclear sections
- [ ] Documentation updated (if behavior changed)
- [ ] Tests added/updated (and passing)
- [ ] No new warnings introduced
- [ ] Dependent changes merged
- [ ] PR title follows conventional commit format
- [ ] PR description is clear and complete

---

## 🧪 Testing Guidelines

### What to Test

**Always test:**
- New features (happy path + edge cases)
- Bug fixes (regression test)
- API endpoints (request/response validation)
- Security-critical code (authentication, authorization)

**Consider testing:**
- Complex business logic
- Data transformations
- Error handling
- Performance-critical paths

### Testing Pyramid

```
       /\
      /  \     E2E Tests (few)
     /____\    
    /      \   Integration Tests (some)
   /________\  
  /          \ Unit Tests (many)
 /____________\
```

**Unit Tests:** Test individual functions/components in isolation
**Integration Tests:** Test interaction between components
**E2E Tests:** Test complete user flows through the UI

### Running Tests

```bash
# Backend
cd backend
pytest                          # All tests
pytest tests/test_analyzer.py  # Specific file
pytest -k "sql"                # Tests matching pattern
pytest --cov                   # With coverage

# Frontend
cd frontend
npm test                       # All tests
npm test -- RoastCard          # Specific component
npm run test:e2e              # E2E tests (Playwright)
```

---

## 🎨 UI/UX Contributions

### Design Philosophy

- **Playful but professional** - Fun without being unprofessional
- **Clarity over cleverness** - Users should understand immediately
- **Accessible** - WCAG 2.1 AA compliance minimum
- **Mobile-first** - Works great on all screen sizes

### Design Resources

- **Colors:** Tailwind default palette + DaisyUI themes
- **Typography:** Inter (sans-serif)
- **Icons:** Heroicons
- **Animations:** Framer Motion (subtle, purposeful)

### Accessibility Requirements

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators visible
- Screen reader tested

---

## 📞 Getting Help

Stuck? Have questions? We're here to help!

- 💬 [GitHub Discussions](https://github.com/gerardoramirez/vibe-roaster/discussions) - Ask questions, share ideas
- 🐛 [GitHub Issues](https://github.com/gerardoramirez/vibe-roaster/issues) - Report bugs, request features
- 📧 Email: gerardoram1010@gmail.com - Direct contact

**Tips for getting help:**
- Search existing issues/discussions first
- Provide context and details
- Include error messages and logs
- Be patient and respectful
- Share what you've already tried

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Expected Behavior

- ✅ Be respectful and inclusive
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ✅ Show empathy toward others

### Unacceptable Behavior

- ❌ Harassment, discrimination, or trolling
- ❌ Personal attacks or insults
- ❌ Publishing others' private information
- ❌ Other unprofessional conduct

### Enforcement

Violations may result in temporary or permanent ban from the project.

**Report issues to:** gerardoram1010@gmail.com

---

## 🏆 Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` file
- Release notes for significant contributions
- Project README (for major features)
- LinkedIn/portfolio references (with permission)

---

## 📚 Additional Resources

- [BUILD_SPEC.md](BUILD_SPEC.md) - Full project specification
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design and architecture
- [ROADMAP.md](ROADMAP.md) - Future plans
- [SECURITY.md](SECURITY.md) - Security policy
- [Backend README](../backend/README.md) - Backend development guide

---

## 📄 License

By contributing to Vibe-Roaster, you agree that your contributions will be licensed under the [MIT License](../LICENSE).

---

<div align="center">

**Thank you for contributing to Vibe-Roaster! 🔥**

*Every contribution, no matter how small, helps make security more accessible and fun.*

</div>

