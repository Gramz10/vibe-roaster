# Vibe-Roaster Backend

**FastAPI-based API server for security analysis and AI roasting**

---

## 🏗️ Architecture

The backend is built with:
- **FastAPI** - Modern, fast web framework
- **SQLAlchemy** - ORM for database operations
- **Alembic** - Database migrations
- **Celery** - Asynchronous task processing
- **Redis** - Task queue and caching
- **PostgreSQL** - Primary database
- **OpenAI API** - GPT-4 for roast generation

---

## 📋 Prerequisites

- Python 3.11 or higher
- PostgreSQL 15+ (or use Docker)
- Redis 7+ (or use Docker)
- OpenAI API key (for AI features)
- GitHub OAuth App credentials (for authentication)

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# From project root
docker-compose up

# Backend will be available at:
# - API: http://localhost:8000
# - API Docs: http://localhost:8000/docs
```

### Option 2: Local Development

#### 1. Set Up Python Environment

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Install dev dependencies (for testing and linting)
pip install -r requirements-dev.txt
```

#### 2. Set Up Database

**Using Docker:**
```bash
# Start PostgreSQL
docker run --name vibroast-db \
  -e POSTGRES_USER=vibroast \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=vibroast \
  -p 5432:5432 \
  -d postgres:15

# Start Redis
docker run --name vibroast-redis \
  -p 6379:6379 \
  -d redis:7-alpine
```

**Using Local Installation:**
```bash
# macOS (using Homebrew)
brew install postgresql@15 redis
brew services start postgresql@15
brew services start redis

# Create database
createdb vibroast

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql-15 redis-server
sudo systemctl start postgresql redis-server
```

#### 3. Configure Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your values
```

**Required Environment Variables:**

```bash
# Database
DATABASE_URL=postgresql://vibroast:your_password@localhost:5432/vibroast

# Redis
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-secret-key-here-use-something-random-and-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
GITHUB_REDIRECT_URI=http://localhost:5173/auth/callback

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4

# Environment
ENVIRONMENT=development  # development, staging, or production
DEBUG=True
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Logging
LOG_LEVEL=INFO
```

#### 4. Run Database Migrations

```bash
# Run all migrations
alembic upgrade head

# To create a new migration after changing models:
alembic revision --autogenerate -m "Description of changes"
```

#### 5. Start the Development Server

```bash
# Start FastAPI server with hot reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or use the convenience script:
python -m app.main
```

#### 6. Start Celery Worker (Optional, for background tasks)

```bash
# In a new terminal (with venv activated)
celery -A app.tasks.celery_app worker --loglevel=info

# On Windows, you may need:
celery -A app.tasks.celery_app worker --pool=solo --loglevel=info
```

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration management
│   ├── dependencies.py      # Dependency injection
│   │
│   ├── api/                 # API routes
│   │   ├── routes/
│   │   │   ├── auth.py      # Authentication endpoints
│   │   │   ├── analysis.py  # Analysis CRUD
│   │   │   ├── repos.py     # GitHub repository endpoints
│   │   │   └── health.py    # Health check
│   │   └── middleware/
│   │       ├── cors.py      # CORS configuration
│   │       ├── auth.py      # JWT authentication middleware
│   │       └── rate_limit.py
│   │
│   ├── core/                # Business logic
│   │   ├── analyzer/
│   │   │   ├── scanner.py   # Main scanning orchestrator
│   │   │   ├── parsers/     # Language-specific parsers
│   │   │   │   ├── python_parser.py
│   │   │   │   ├── javascript_parser.py
│   │   │   │   └── typescript_parser.py
│   │   │   ├── rules/       # Security rule definitions
│   │   │   │   ├── sql_injection.py
│   │   │   │   ├── xss.py
│   │   │   │   ├── secrets.py
│   │   │   │   └── auth.py
│   │   │   └── patterns.py  # Vulnerability patterns
│   │   ├── ai/
│   │   │   ├── roaster.py   # GPT-4 integration
│   │   │   └── prompts.py   # AI prompt templates
│   │   └── github/
│   │       ├── oauth.py     # GitHub OAuth flow
│   │       └── client.py    # GitHub API client
│   │
│   ├── models/              # SQLAlchemy models
│   │   ├── user.py
│   │   ├── analysis.py
│   │   └── vulnerability.py
│   │
│   ├── schemas/             # Pydantic schemas
│   │   ├── user.py
│   │   ├── analysis.py
│   │   └── vulnerability.py
│   │
│   ├── services/            # Service layer
│   │   ├── analysis_service.py
│   │   ├── github_service.py
│   │   └── user_service.py
│   │
│   ├── tasks/               # Celery tasks
│   │   ├── celery_app.py
│   │   └── analysis_tasks.py
│   │
│   └── utils/               # Utility functions
│       ├── security.py      # Encryption, hashing
│       ├── logging.py       # Structured logging
│       └── helpers.py       # Misc helpers
│
├── alembic/                 # Database migrations
│   ├── versions/
│   └── env.py
│
├── tests/                   # Test suite
│   ├── conftest.py          # Pytest fixtures
│   ├── unit/
│   │   ├── test_analyzer.py
│   │   └── test_ai.py
│   ├── integration/
│   │   └── test_api.py
│   └── e2e/
│       └── test_full_flow.py
│
├── .env.example             # Example environment variables
├── .flake8                  # Flake8 configuration
├── .pylintrc                # Pylint configuration
├── mypy.ini                 # MyPy configuration
├── pytest.ini               # Pytest configuration
├── requirements.txt         # Production dependencies
├── requirements-dev.txt     # Development dependencies
├── Dockerfile               # Docker image definition
└── README.md                # This file
```

---

## 🧪 Testing

### Run All Tests

```bash
# Run entire test suite
pytest

# Run with coverage report
pytest --cov=app --cov-report=html

# Open coverage report
open htmlcov/index.html  # macOS
xdg-open htmlcov/index.html  # Linux
start htmlcov/index.html  # Windows
```

### Run Specific Tests

```bash
# Run unit tests only
pytest tests/unit/

# Run integration tests
pytest tests/integration/

# Run specific test file
pytest tests/unit/test_analyzer.py

# Run specific test function
pytest tests/unit/test_analyzer.py::test_detect_sql_injection

# Run tests matching pattern
pytest -k "sql_injection"
```

### Watch Mode (Re-run on file changes)

```bash
# Install pytest-watch
pip install pytest-watch

# Run in watch mode
ptw
```

---

## 🔍 Code Quality

### Linting

```bash
# Format code with Black
black .

# Sort imports with isort
isort .

# Lint with flake8
flake8 .

# Lint with pylint
pylint app/

# Type check with mypy
mypy app/

# Run all quality checks
./scripts/lint.sh  # (create this script)
```

### Pre-commit Hooks (Recommended)

```bash
# Install pre-commit
pip install pre-commit

# Set up git hooks
pre-commit install

# Manually run on all files
pre-commit run --all-files
```

Create `.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.11.0
    hooks:
      - id: black
        language_version: python3.11

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort

  - repo: https://github.com/pycqa/flake8
    rev: 6.1.0
    hooks:
      - id: flake8

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.7.0
    hooks:
      - id: mypy
        additional_dependencies: [types-all]
```

---

## 🔐 Security Scanning

```bash
# Check for known vulnerabilities in dependencies
pip-audit

# Static security analysis with Bandit
bandit -r app/ -ll

# Check for exposed secrets
detect-secrets scan --all-files
```

---

## 📊 API Documentation

Once the server is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **OpenAPI JSON:** http://localhost:8000/openapi.json

### Example API Requests

```bash
# Health check
curl http://localhost:8000/health

# Start analysis (requires authentication)
curl -X POST http://localhost:8000/api/analysis/start \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "repo_url": "https://github.com/user/repo",
    "branch": "main",
    "intensity": "medium"
  }'

# Get analysis results
curl http://localhost:8000/api/analysis/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🐛 Debugging

### Using Python Debugger

```python
# Add breakpoint in code
import pdb; pdb.set_trace()

# Or use built-in breakpoint (Python 3.7+)
breakpoint()
```

### VS Code Launch Configuration

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI Server",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": [
        "app.main:app",
        "--reload",
        "--host", "0.0.0.0",
        "--port", "8000"
      ],
      "cwd": "${workspaceFolder}/backend",
      "envFile": "${workspaceFolder}/backend/.env"
    }
  ]
}
```

### Logging

```python
import logging

logger = logging.getLogger(__name__)

# Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
logger.info("Analysis started", extra={"analysis_id": analysis_id})
logger.error("Failed to clone repository", exc_info=True)
```

---

## 🚢 Deployment

### Environment-Specific Configuration

```bash
# Development
export ENVIRONMENT=development
export DEBUG=True

# Staging
export ENVIRONMENT=staging
export DEBUG=False

# Production
export ENVIRONMENT=production
export DEBUG=False
```

### Docker Build

```bash
# Build image
docker build -t vibe-roaster-backend .

# Run container
docker run -p 8000:8000 \
  --env-file .env \
  vibe-roaster-backend
```

### Database Migrations in Production

```bash
# Run migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# View migration history
alembic history
```

---

## 🔧 Common Issues

### Issue: `ModuleNotFoundError: No module named 'app'`

**Solution:** Make sure you're in the `backend` directory and your virtual environment is activated.

### Issue: Database connection errors

**Solution:** 
- Check PostgreSQL is running: `pg_isready`
- Verify `DATABASE_URL` in `.env`
- Ensure database exists: `createdb vibroast`

### Issue: Redis connection errors

**Solution:**
- Check Redis is running: `redis-cli ping` (should return "PONG")
- Verify `REDIS_URL` in `.env`

### Issue: Alembic migration errors

**Solution:**
```bash
# Reset migrations (CAUTION: destroys data)
alembic downgrade base
alembic upgrade head

# Or create fresh database
dropdb vibroast
createdb vibroast
alembic upgrade head
```

---

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [Celery Documentation](https://docs.celeryproject.org/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)

---

## 🤝 Contributing

See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for development guidelines.

---

## 📄 License

MIT License - See [LICENSE](../LICENSE) for details.

---

**Questions?** Open an issue or reach out to gerardoram1010@gmail.com

