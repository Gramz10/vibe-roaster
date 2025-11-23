# Vibe-Roaster Backend

**FastAPI-based API server for AI-powered security analysis with personality 🔥**

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+** (required)
- **pip** (Python package manager)
- **TruffleHog** (for secret scanning)
- **Semgrep** (for SAST scanning)
- **AI API Key** (xAI Grok or OpenAI)

### Installation

#### 1. Install Python Dependencies

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### 2. Install Security Scanning Tools

**TruffleHog** (for detecting exposed secrets):
```bash
# Using pip
pip install trufflehog

# Or using brew (macOS)
brew install trufflehog

# Or using Go
go install github.com/trufflesecurity/trufflehog/v3@latest
```

**Semgrep** (for SAST - Static Application Security Testing):
```bash
# Using pip (recommended)
pip install semgrep

# Or using brew (macOS)
brew install semgrep

# Or using Docker
docker pull returntocorp/semgrep
```

#### 3. Configure Environment Variables

```bash
# Copy example env file
cp env.example .env

# Edit .env with your API keys
nano .env  # or use your preferred editor
```

**Minimum required configuration:**
```bash
# At least ONE of these is required:
GROK_API_KEY=xai-xxx  # Recommended - Grok gives savage, witty roasts
# OR
OPENAI_API_KEY=sk-xxx  # Fallback - Uses GPT-4o
```

**Get your API keys:**
- **xAI Grok**: https://console.x.ai/ (recommended - free beta available!)
- **OpenAI GPT**: https://platform.openai.com/api-keys

#### 4. Run the Server

```bash
# Development mode (with hot reload)
uvicorn app.main:app --reload

# Or using Python directly
python -m app.main
```

The API will be available at:
- **API:** http://localhost:8000
- **Interactive Docs:** http://localhost:8000/docs
- **Health Check:** http://localhost:8000/health

---

## 📖 API Usage

### Health Check

```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "roasting 🔥",
  "version": "0.1.0",
  "ai_configured": true
}
```

### Scan a Repository

```bash
curl -X POST http://localhost:8000/scan \
  -H "Content-Type: application/json" \
  -d '{
    "repo_url": "https://github.com/username/repo"
  }'
```

**Response:**
```json
{
  "score": 6,
  "roast": "Your API keys are exposed like a streaker at a football game! You've got secrets scattered around like confetti at a parade, and your SQL queries look like they were written by Bobby Tables himself. Time to read the OWASP Top 10 before someone pwns you.",
  "findings": [
    {
      "type": "Exposed Secret",
      "severity": "critical",
      "file_path": "config/settings.py",
      "line_number": null,
      "description": "Detected AWS API Key exposed in code",
      "code_snippet": "AWS_SECRET_KEY = 'AKIAIOSFODNN7EXAMPLE'"
    }
  ],
  "suggested_fixes": [
    {
      "finding_type": "Exposed Secret",
      "fix": "Move all secrets to environment variables and use a secrets manager like AWS Secrets Manager or HashiCorp Vault",
      "example": null
    }
  ],
  "repo_url": "https://github.com/username/repo",
  "scan_timestamp": "2025-11-23T10:30:00.000Z"
}
```

### Rate Limiting

**Default:** 5 scans per minute per IP address

If you exceed the rate limit:
```json
{
  "error": "Rate limit exceeded: 5 per 1 minute"
}
```

---

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Configuration management
│   ├── schemas.py              # Pydantic request/response models
│   │
│   └── services/
│       ├── __init__.py
│       ├── git_service.py      # Git repository cloning
│       ├── scanner_service.py  # TruffleHog + Semgrep integration
│       └── ai_service.py       # Claude/OpenAI roast generation
│
├── requirements.txt            # Production dependencies
├── env.example                 # Environment variable template
└── README.md                   # This file
```

---

## 🔧 Configuration

All configuration is done via environment variables in `.env`:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROK_API_KEY` | Yes* | - | xAI Grok API key (recommended) |
| `OPENAI_API_KEY` | Yes* | - | OpenAI GPT-4o API key (fallback) |
| `ENVIRONMENT` | No | `development` | Environment (development/staging/production) |
| `DEBUG` | No | `True` | Enable debug mode |
| `ALLOWED_ORIGINS` | No | `http://localhost:5173,http://localhost:3000` | CORS allowed origins |
| `RATE_LIMIT_SCANS_PER_MINUTE` | No | `5` | Max scans per minute per IP |
| `MAX_REPO_SIZE_MB` | No | `500` | Maximum repository size to scan |
| `TEMP_DIR` | No | `/tmp/vibe-roaster` | Temporary directory for clones |
| `LOG_LEVEL` | No | `INFO` | Logging level |

\* At least one AI API key is required

---

## 🧪 Testing

### Manual Testing

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test scan with a real repo (use a small, public repo)
curl -X POST http://localhost:8000/scan \
  -H "Content-Type: application/json" \
  -d '{"repo_url": "https://github.com/Gramz10/vibe-roaster"}'

# Test rate limiting (run 6+ times quickly)
for i in {1..6}; do
  curl -X POST http://localhost:8000/scan \
    -H "Content-Type: application/json" \
    -d '{"repo_url": "https://github.com/username/repo"}'
  echo ""
done
```

### Interactive API Documentation

Visit http://localhost:8000/docs for Swagger UI where you can:
- See all available endpoints
- Test endpoints directly in your browser
- View request/response schemas

---

## 🛡️ How It Works

### Scan Process

1. **Validate Request**
   - Check that the URL is a valid GitHub repository
   - Verify rate limits haven't been exceeded

2. **Clone Repository**
   - Shallow clone (depth=1) for speed
   - Check repository size doesn't exceed limits
   - Store in temporary directory (`/tmp/vibe-roaster`)

3. **Run Security Scans**
   - **TruffleHog**: Scans for exposed secrets (API keys, passwords, tokens)
   - **Semgrep**: Runs SAST rules for common vulnerabilities (SQL injection, XSS, etc.)

4. **Generate AI Roast**
   - Sends findings to Claude 3.5 Sonnet (or GPT-4 as fallback)
   - AI generates a humorous but accurate 3-sentence roast
   - AI provides specific fix suggestions for each finding

5. **Calculate Security Score**
   - Weighted scoring based on severity:
     - Critical: -3.0 points
     - High: -2.0 points
     - Medium: -1.0 points
     - Low: -0.5 points
   - Score ranges from 1 (terrible) to 10 (perfect)

6. **Cleanup**
   - **ALWAYS** deletes the cloned repository
   - No code is ever permanently stored
   - Privacy-first design

---

## 🔒 Security & Privacy

### Privacy Guarantees

- ✅ **No code storage** - Repositories are analyzed in memory only
- ✅ **Immediate cleanup** - Cloned repos deleted after each scan
- ✅ **No logging of code** - Only metadata is logged
- ✅ **Temporary directories** - All analysis in `/tmp` (cleared on reboot)

### Security Features

- ✅ **Rate limiting** - Prevents abuse (5 scans/min per IP)
- ✅ **Input validation** - Pydantic schemas validate all inputs
- ✅ **Size limits** - Repositories over 500MB are rejected
- ✅ **Timeout protection** - Scans timeout after 5 minutes
- ✅ **Error handling** - Graceful degradation on failures
- ✅ **CORS protection** - Only allowed origins can access the API

### What Data Goes to AI Providers?

**Sent to Claude/OpenAI:**
- Finding summaries (type, severity, file paths)
- Vulnerability descriptions
- NO full source code

**Example of what's sent:**
```
1. Exposed Secret (critical) in config/settings.py: Detected AWS API Key exposed in code
2. SQL Injection (high) in app/database.py: SQL query uses string concatenation
```

**NOT sent:**
- Your entire codebase
- Personally identifiable information
- Proprietary business logic

---

## 🚨 Troubleshooting

### "Module not found" errors

```bash
# Make sure you're in the virtual environment
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### TruffleHog or Semgrep not found

```bash
# Verify they're installed and in PATH
which trufflehog
which semgrep

# If not found, install them:
pip install trufflehog semgrep
```

### "AI not configured" error

```bash
# Check your .env file
cat .env | grep API_KEY

# Make sure at least one AI key is set:
GROK_API_KEY=xai-xxx
# OR
OPENAI_API_KEY=sk-xxx
```

### Repository clone fails

Common issues:
- **Private repos**: Currently only public repos are supported
- **Large repos**: Repositories over 500MB are rejected
- **Network issues**: Check your internet connection
- **Rate limiting**: GitHub may rate limit anonymous clones

### Permission denied on /tmp/vibe-roaster

```bash
# Create the directory with proper permissions
mkdir -p /tmp/vibe-roaster
chmod 755 /tmp/vibe-roaster

# Or change TEMP_DIR in .env to a directory you own
TEMP_DIR=./temp
```

---

## 🔧 Advanced Configuration

### Using Docker

```bash
# Build image
docker build -t vibe-roaster-backend .

# Run container
docker run -p 8000:8000 \
  -e ANTHROPIC_API_KEY=your-key \
  vibe-roaster-backend
```

### Custom AI Models

Edit `app/services/ai_service.py` to use different models:

```python
# For Grok
model="grok-beta"       # Default - free during beta!

# For OpenAI
model="gpt-4o"          # Default - faster and better than GPT-4
# model="gpt-4-turbo"   # Alternative
# model="gpt-3.5-turbo" # Cheaper option
```

### Adjusting Rate Limits

In `.env`:
```bash
# Allow 10 scans per minute
RATE_LIMIT_SCANS_PER_MINUTE=10

# Disable rate limiting entirely (not recommended)
RATE_LIMIT_ENABLED=False
```

---

## 📊 Performance

### Typical Scan Times

| Repository Size | Average Time |
|----------------|--------------|
| Small (< 1MB) | 10-20 seconds |
| Medium (1-10MB) | 20-45 seconds |
| Large (10-100MB) | 45-90 seconds |
| Very Large (100-500MB) | 2-5 minutes |

**Bottlenecks:**
1. Git clone (depends on network speed)
2. Semgrep analysis (depends on code size)
3. AI generation (1-3 seconds)

### Resource Usage

- **Memory**: ~200-500MB per scan
- **CPU**: Moderate (scanning is CPU-intensive)
- **Disk**: Temporary (cleaned up immediately)
- **Network**: Repository size + AI API calls

---

## 🤝 Contributing

This is part of a larger project. See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for guidelines.

**Areas that need help:**
- Additional language support (Java, Go, Rust)
- More security rules for Semgrep
- Better AI prompt engineering
- Performance optimizations
- Test coverage

---

## 📄 License

MIT License - See [LICENSE](../LICENSE) for details.

---

## 📞 Support

- **Issues**: https://github.com/Gramz10/vibe-roaster/issues
- **Email**: gerardoram1010@gmail.com
- **Documentation**: https://github.com/Gramz10/vibe-roaster/tree/main/docs

---

<div align="center">

**Built with FastAPI, Claude 3.5 Sonnet, TruffleHog, and Semgrep**

*Making security reviews fun, one roast at a time* 🔥

</div>
