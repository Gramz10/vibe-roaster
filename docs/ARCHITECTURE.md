# Vibe-Roaster Architecture

**Version:** 1.0  
**Last Updated:** November 22, 2025

---

## 📐 System Overview

Vibe-Roaster follows a modern **three-tier architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (Frontend)                   │
│         React + TypeScript + Tailwind + DaisyUI             │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS/REST API
┌────────────────────▼────────────────────────────────────────┐
│                   Application Layer (Backend)                │
│              FastAPI + Python 3.11 + Celery                 │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──────┐ ┌──▼──────┐ ┌──▼─────────┐
│  PostgreSQL  │ │  Redis  │ │ OpenAI API │
│   Database   │ │  Cache  │ │  (GPT-4)   │
└──────────────┘ └─────────┘ └────────────┘
```

---

## 🏗️ Component Architecture

### Frontend Application

#### Technology Choices

**React 18 with TypeScript**
- Strong typing prevents runtime errors
- Component-based architecture for reusability
- Rich ecosystem and community support

**Vite**
- Lightning-fast hot module replacement (HMR)
- Optimized production builds
- Modern ES module support

**Tailwind CSS + DaisyUI**
- Utility-first CSS for rapid development
- DaisyUI provides beautiful, accessible components
- Consistent design system with minimal custom CSS

**Zustand for State Management**
- Lightweight alternative to Redux
- Simple, boilerplate-free API
- TypeScript-first design

**TanStack Query (React Query)**
- Intelligent data fetching and caching
- Automatic background refetching
- Optimistic updates for better UX

#### Component Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer, Sidebar
│   │   ├── analysis/         # Analysis-specific components
│   │   ├── roast/            # Roast display components
│   │   └── shared/           # Reusable UI components
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Analyze.tsx
│   │   └── Report.tsx
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API client services
│   ├── stores/               # Zustand state stores
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Helper functions
├── public/                   # Static assets
└── tests/                    # Component and E2E tests
```

#### Key Design Patterns

1. **Container/Presenter Pattern**
   - Smart containers handle data fetching
   - Presentational components focus on UI

2. **Custom Hooks for Logic Reuse**
   - `useAnalysis()` - Manage analysis state
   - `useGitHubAuth()` - Handle GitHub OAuth
   - `useRoastIntensity()` - Manage user preferences

3. **Code Splitting**
   - Lazy-load routes for optimal performance
   - Dynamic imports for large dependencies

---

### Backend API

#### Technology Choices

**FastAPI**
- High performance (comparable to Node.js/Go)
- Automatic API documentation (OpenAPI/Swagger)
- Built-in request validation with Pydantic
- Native async/await support
- Type hints for better code quality

**Celery + Redis**
- Asynchronous task processing for code analysis
- Background job queue for long-running operations
- Prevents API timeouts for large repositories

**SQLAlchemy + Alembic**
- ORM for database interactions
- Type-safe queries with mypy
- Database migrations with version control

**Pydantic**
- Data validation and serialization
- Automatic API request/response schemas
- Runtime type checking

#### Application Structure

```
backend/
├── app/
│   ├── main.py               # FastAPI application entry
│   ├── config.py             # Configuration management
│   ├── dependencies.py       # Dependency injection
│   │
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.py       # Authentication endpoints
│   │   │   ├── analysis.py   # Analysis CRUD operations
│   │   │   ├── repos.py      # GitHub repository endpoints
│   │   │   └── health.py     # Health check endpoints
│   │   └── middleware/
│   │       ├── cors.py       # CORS configuration
│   │       ├── auth.py       # JWT authentication
│   │       └── rate_limit.py # Rate limiting
│   │
│   ├── core/
│   │   ├── analyzer/
│   │   │   ├── scanner.py    # Main scanning orchestrator
│   │   │   ├── parsers/      # Language-specific parsers
│   │   │   ├── rules/        # Security rule definitions
│   │   │   └── patterns.py   # Vulnerability patterns
│   │   ├── ai/
│   │   │   ├── roaster.py    # GPT-4 integration
│   │   │   └── prompts.py    # AI prompt templates
│   │   └── github/
│   │       ├── oauth.py      # GitHub OAuth flow
│   │       └── client.py     # GitHub API client
│   │
│   ├── models/               # SQLAlchemy models
│   ├── schemas/              # Pydantic schemas
│   ├── services/             # Business logic layer
│   ├── tasks/                # Celery background tasks
│   └── utils/                # Helper functions
│
├── tests/                    # Test suite
├── alembic/                  # Database migrations
└── requirements.txt          # Python dependencies
```

#### API Design Principles

1. **RESTful Conventions**
   - Standard HTTP methods (GET, POST, PUT, DELETE)
   - Resource-based URL structure
   - Proper status codes (200, 201, 400, 401, 404, 500)

2. **Authentication & Authorization**
   - JWT tokens for stateless auth
   - GitHub OAuth for user login
   - API key authentication for CLI/integrations

3. **Error Handling**
   - Consistent error response format
   - Detailed error messages in development
   - Generic messages in production (no stack traces)

4. **API Versioning**
   - URL-based versioning (`/api/v1/`)
   - Maintains backward compatibility

---

## 🔄 Data Flow

### Analysis Request Flow

```
1. User clicks "Analyze Repository" in UI
   │
   ▼
2. Frontend sends POST /api/analysis/start
   {
     "repo_url": "https://github.com/user/repo",
     "branch": "main",
     "intensity": "medium"
   }
   │
   ▼
3. Backend validates request and creates Analysis record
   - Status: "pending"
   - User ID from JWT
   - Unique analysis ID generated
   │
   ▼
4. Backend enqueues Celery task
   - Task ID returned to frontend
   - Returns 202 Accepted with analysis ID
   │
   ▼
5. Frontend polls GET /api/analysis/:id every 2 seconds
   │
   ▼
6. Celery worker processes task:
   a. Clone repository (shallow, specific branch)
   b. Detect languages and file types
   c. Run static analysis (AST parsing + pattern matching)
   d. Identify security vulnerabilities
   e. Send findings to OpenAI API
   f. Generate roast commentary
   g. Update Analysis record with results
   h. Set status to "completed"
   │
   ▼
7. Frontend receives completed analysis
   - Redirect to /report/:id
   - Display roast results with animations
```

### GitHub OAuth Flow

```
1. User clicks "Sign in with GitHub"
   │
   ▼
2. Frontend redirects to GitHub OAuth
   https://github.com/login/oauth/authorize?
     client_id=...&
     redirect_uri=https://vibe-roaster.com/auth/callback&
     scope=read:user,repo
   │
   ▼
3. User approves on GitHub
   │
   ▼
4. GitHub redirects to callback with code
   https://vibe-roaster.com/auth/callback?code=abc123
   │
   ▼
5. Frontend forwards code to backend
   POST /api/auth/github/callback { "code": "abc123" }
   │
   ▼
6. Backend exchanges code for access token
   - Calls GitHub API
   - Receives access_token
   │
   ▼
7. Backend creates/updates user record
   - Encrypts GitHub token
   - Generates JWT for our app
   │
   ▼
8. Backend returns JWT to frontend
   { "token": "eyJ...", "user": {...} }
   │
   ▼
9. Frontend stores JWT in localStorage
   - Sets Authorization header for future requests
   - Redirects to /dashboard
```

---

## 🗄️ Database Schema

### Core Tables

#### `users`
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    github_id INTEGER UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    avatar_url TEXT,
    github_token_encrypted TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP
);
```

#### `analyses`
```sql
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    repo_url TEXT NOT NULL,
    repo_name VARCHAR(255) NOT NULL,
    branch VARCHAR(255) DEFAULT 'main',
    status VARCHAR(50) NOT NULL, -- pending, processing, completed, failed
    intensity VARCHAR(50) DEFAULT 'medium',
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    error_message TEXT,
    total_files_scanned INTEGER,
    total_vulnerabilities INTEGER,
    results JSONB, -- Stores full analysis results
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analyses_user_id ON analyses(user_id);
CREATE INDEX idx_analyses_status ON analyses(status);
CREATE INDEX idx_analyses_created_at ON analyses(created_at DESC);
```

#### `vulnerabilities`
```sql
CREATE TABLE vulnerabilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    line_number INTEGER,
    vulnerability_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL, -- low, medium, high, critical
    description TEXT NOT NULL,
    roast_text TEXT NOT NULL,
    fix_suggestion TEXT,
    code_snippet TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vulnerabilities_analysis_id ON vulnerabilities(analysis_id);
CREATE INDEX idx_vulnerabilities_severity ON vulnerabilities(severity);
```

---

## 🔐 Security Architecture

### Authentication

1. **GitHub OAuth 2.0**
   - Industry-standard OAuth flow
   - No password storage on our side
   - Secure token exchange

2. **JWT Tokens**
   - Stateless authentication
   - Short expiration (24 hours)
   - Refresh token support (future)

3. **Token Storage**
   - Frontend: localStorage (with XSS protections)
   - Backend: Encrypted GitHub tokens in database
   - Encryption: AES-256-GCM

### API Security

1. **Rate Limiting**
   - Per-IP and per-user limits
   - Prevents abuse and DDoS
   - Redis-backed sliding window

2. **Input Validation**
   - Pydantic schemas validate all inputs
   - SQL injection prevention via ORM
   - No direct string interpolation in queries

3. **CORS Configuration**
   - Whitelist specific origins
   - No wildcard (*) in production
   - Credential support only for allowed origins

4. **Secret Management**
   - Environment variables for all secrets
   - Never commit secrets to git
   - Different keys per environment

### Data Privacy

1. **Code Analysis**
   - Repositories cloned to ephemeral containers
   - No permanent storage of source code
   - Memory-only analysis
   - Immediate cleanup after completion

2. **User Data**
   - Minimal data collection
   - GitHub tokens encrypted at rest
   - No sharing with third parties (except OpenAI for analysis)

3. **OpenAI Integration**
   - Only vulnerability context sent (not full codebase)
   - No PII sent to OpenAI
   - Compliance with OpenAI's data usage policy

---

## 📊 Monitoring & Observability

### Application Monitoring

**Sentry** (Error Tracking)
- Frontend: JavaScript errors, unhandled rejections
- Backend: Python exceptions, API errors
- Automatic error grouping and alerting

### Logging Strategy

**Structured Logging** (JSON format)
```python
{
  "timestamp": "2025-11-22T10:30:00Z",
  "level": "INFO",
  "service": "analyzer",
  "user_id": "uuid",
  "analysis_id": "uuid",
  "message": "Analysis completed successfully",
  "duration_ms": 45203,
  "files_scanned": 127,
  "vulnerabilities_found": 12
}
```

**Log Levels**
- DEBUG: Detailed diagnostics (dev only)
- INFO: Business events (analysis started/completed)
- WARNING: Recoverable issues (rate limit approaching)
- ERROR: Failures requiring attention
- CRITICAL: System-wide failures

### Performance Monitoring

**Key Metrics**
- API response time (p50, p95, p99)
- Analysis completion time
- Database query performance
- Celery queue length
- OpenAI API latency

---

## 🚀 Deployment Architecture

### Development Environment

```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports: ["5173:5173"]
    volumes: ["./frontend:/app"]
    
  backend:
    build: ./backend
    ports: ["8000:8000"]
    volumes: ["./backend:/app"]
    depends_on: [db, redis]
    
  celery:
    build: ./backend
    command: celery -A app.tasks worker
    depends_on: [redis, db]
    
  db:
    image: postgres:15
    ports: ["5432:5432"]
    
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

### Production Environment

**Frontend** (Vercel/Netlify)
- Static site deployment
- CDN for global distribution
- Automatic HTTPS
- Preview deployments for PRs

**Backend** (Render/Railway/Fly.io)
- Docker container deployment
- Horizontal scaling (multiple instances)
- Load balancing
- Managed PostgreSQL and Redis

**CI/CD Pipeline**
- GitHub Actions for automation
- Run tests on every PR
- Deploy preview environments
- Auto-deploy on merge to main

---

## 🧪 Testing Strategy

### Frontend Tests

```typescript
// Component Tests (React Testing Library)
describe('RoastCard', () => {
  it('displays vulnerability information correctly', () => {
    render(<RoastCard vulnerability={mockVuln} />);
    expect(screen.getByText(/SQL Injection/)).toBeInTheDocument();
  });
});

// E2E Tests (Playwright)
test('user can complete full analysis flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Sign in with GitHub');
  // ... full flow test
});
```

### Backend Tests

```python
# Unit Tests (pytest)
def test_detect_sql_injection():
    code = "query = f'SELECT * FROM users WHERE id={user_id}'"
    vulnerabilities = analyzer.scan_code(code)
    assert len(vulnerabilities) == 1
    assert vulnerabilities[0].type == "SQL_INJECTION"

# Integration Tests
def test_analysis_endpoint(client, auth_headers):
    response = client.post(
        "/api/analysis/start",
        json={"repo_url": "https://github.com/test/repo"},
        headers=auth_headers
    )
    assert response.status_code == 202
    assert "id" in response.json()
```

---

## 📈 Scalability Considerations

### Current Architecture Limits
- Single database instance
- Celery workers on same machine as API
- OpenAI rate limits (tier-dependent)

### Future Scaling Strategies

**Database**
- Read replicas for analytics queries
- Connection pooling (PgBouncer)
- Partitioning for large tables

**Background Jobs**
- Dedicated Celery worker nodes
- Queue prioritization (premium users first)
- Job result expiration

**Caching**
- Redis for API responses
- Cache analysis results for public repos
- CDN for static assets

**Cost Optimization**
- Mock AI responses in development
- Cache AI responses for identical code
- Batch similar vulnerabilities to reduce API calls

---

## 🔮 Future Enhancements

### Planned Improvements
- WebSocket support for real-time analysis updates (vs polling)
- Multi-region deployment for lower latency
- GraphQL API alongside REST
- Plugin system for custom rules
- Self-hosted option for enterprise users

---

## 📚 Additional Resources

- [BUILD_SPEC.md](BUILD_SPEC.md) - Full project specification
- [API Documentation](http://localhost:8000/docs) - Interactive API docs (when running locally)
- [Database Migrations Guide](../backend/alembic/README.md) - How to manage schema changes

---

**Last Updated:** November 22, 2025  
**Maintained By:** Gerardo Ramirez

