#!/bin/bash

# Test script for Vibe-Roaster backend

echo "🔥 Testing Vibe-Roaster API"
echo "==========================="
echo ""

BASE_URL="http://localhost:8000"

# Test 1: Health check
echo "Test 1: Health Check"
echo "--------------------"
curl -s "$BASE_URL/health" | python3 -m json.tool
echo ""
echo ""

# Test 2: Scan a repository
echo "Test 2: Repository Scan"
echo "-----------------------"
echo "Scanning a small test repository..."
echo ""

curl -s -X POST "$BASE_URL/scan" \
  -H "Content-Type: application/json" \
  -d '{"repo_url": "https://github.com/Gramz10/vibe-roaster"}' \
  | python3 -m json.tool

echo ""
echo ""
echo "✅ Tests complete!"

