#!/bin/bash

# Vibe-Roaster Backend Quick Start Script

set -e

echo "🔥 Vibe-Roaster Backend Quick Start"
echo "===================================="
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found!"
    echo "📝 Copying env.example to .env..."
    cp env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your API keys:"
    echo "   - ANTHROPIC_API_KEY (recommended)"
    echo "   - or OPENAI_API_KEY (fallback)"
    echo ""
    echo "Press Enter when you've added your API key..."
    read -r
fi

# Check if TruffleHog is installed
if ! command -v trufflehog &> /dev/null; then
    echo "⚠️  TruffleHog not found!"
    echo "📥 Installing TruffleHog..."
    pip install trufflehog
fi

# Check if Semgrep is installed
if ! command -v semgrep &> /dev/null; then
    echo "⚠️  Semgrep not found!"
    echo "📥 Installing Semgrep..."
    pip install semgrep
fi

# Check if Bandit is installed
if ! command -v bandit &> /dev/null; then
    echo "⚠️  Bandit not found!"
    echo "📥 Installing Bandit (Python security scanner)..."
    pip install bandit
fi

# Check if pip-audit is installed
if ! command -v pip-audit &> /dev/null; then
    echo "⚠️  pip-audit not found!"
    echo "📥 Installing pip-audit (dependency vulnerability scanner)..."
    pip install pip-audit
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Starting FastAPI server..."
echo ""
echo "   API:       http://localhost:8000"
echo "   Docs:      http://localhost:8000/docs"
echo "   Health:    http://localhost:8000/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

