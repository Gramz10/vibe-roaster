# 🚀 Setting Up Grok for Vibe-Roaster

**xAI's Grok** is now the primary AI for generating security roasts! Here's how to get it set up.

---

## 🎯 Why Grok?

- **🆓 Free during beta** - No credit card required!
- **😈 Savage personality** - Perfect for roasting insecure code
- **⚡ Fast** - Quick response times
- **🔧 OpenAI-compatible** - Easy to integrate

---

## 📝 Getting Your Grok API Key

### Step 1: Go to xAI Console

Visit: **https://console.x.ai/**

### Step 2: Sign Up / Log In

- You can sign in with your X/Twitter account
- Or create a new account

### Step 3: Get API Key

1. Once logged in, go to **API Keys** section
2. Click **"Create New API Key"**
3. Copy your key - it will look like: `xai-xxxxxxxxxxxxxxxxxx`
4. **Save it securely** - you won't be able to see it again!

### Step 4: Add to Your .env File

```bash
# In backend/.env
GROK_API_KEY=xai-your-key-here
```

---

## 🔧 Configuration

Your `backend/.env` should look like this:

```bash
# Primary AI (Recommended)
GROK_API_KEY=xai-xxxxxxxxxxxxxxxxxx

# Fallback AI (Optional but recommended)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxx

# App settings
ENVIRONMENT=development
DEBUG=True
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
RATE_LIMIT_SCANS_PER_MINUTE=5
```

---

## 🎭 How the Fallback Works

**Priority Order:**

1. **Grok** (if `GROK_API_KEY` is set) ← Primary
2. **OpenAI GPT-4o** (if `OPENAI_API_KEY` is set) ← Fallback
3. **Rule-based roasts** (if no API keys) ← Last resort

**Example flow:**
```
Request comes in
    ↓
Try Grok
    ↓ (if fails)
Try OpenAI
    ↓ (if fails)
Use rule-based roast
    ↓
Return response
```

---

## 🧪 Testing Your Setup

### 1. Start the Server

```bash
cd backend
./run.sh
```

### 2. Check Health

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "roasting 🔥",
  "version": "0.1.0",
  "ai_configured": true  ← Should be true!
}
```

### 3. Test a Scan

```bash
curl -X POST http://localhost:8000/scan \
  -H "Content-Type: application/json" \
  -d '{"repo_url": "https://github.com/Gramz10/vibe-roaster"}'
```

You should get a response with a Grok-generated roast!

---

## 🎨 Example Roast from Grok

Here's what Grok's roasts look like:

```json
{
  "score": 6,
  "roast": "Oh boy, where do I even start? Your code is leaking secrets like a sieve in a rainstorm, and that SQL query looks like it was written by Bobby Tables himself on a dare. If security were a game, you'd be playing on Easy Mode with god mode OFF. Time to patch this mess before someone turns your database into a public bulletin board! 🚨",
  "findings": [...],
  "suggested_fixes": [...]
}
```

**Grok's personality:**
- Sarcastic and witty
- Uses internet culture references
- Direct and brutally honest
- Actually helpful with specific fixes

---

## 💡 Pro Tips

### 1. Rate Limits

**Grok Beta:**
- Generous rate limits during beta
- No cost during beta period
- Check https://docs.x.ai/ for current limits

### 2. Model Selection

Currently using: `grok-beta`

To change the model, edit `backend/app/services/ai_service.py`:
```python
response = client.chat.completions.create(
    model="grok-beta",  # Change this if new models are released
    ...
)
```

### 3. Temperature Setting

Current setting: `0.8` (good balance of creativity and accuracy)

- **Lower (0.3-0.5)**: More consistent, less creative
- **Higher (0.8-1.0)**: More creative, might be too wild
- **Current (0.8)**: Sweet spot for funny but accurate roasts

---

## 🔥 Why This Matters for Your Resume

Using Grok shows you:

1. **Stay current with tech** - Grok just launched (2024)
2. **Can work with multiple AI providers** - Not locked into one vendor
3. **Understand API abstraction** - OpenAI-compatible interface
4. **Implement graceful fallbacks** - Production-ready error handling
5. **Prompt engineering skills** - Crafting effective prompts for different models

**In interviews, you can say:**
> "I integrated xAI's Grok as the primary AI, with OpenAI as a fallback. I used the OpenAI-compatible API endpoint, which made it easy to switch between providers while maintaining a consistent interface."

---

## 🆘 Troubleshooting

### "ai_configured": false

**Problem:** The health check shows AI is not configured.

**Solution:**
```bash
# Check your .env file
cat backend/.env | grep GROK_API_KEY

# Make sure it's set and not empty
GROK_API_KEY=xai-your-actual-key-here
```

### "Failed to generate roast"

**Problem:** Scan completes but roast generation fails.

**Possible causes:**
1. **Invalid API key** - Double-check your key
2. **Rate limit hit** - Wait a minute and try again
3. **Network issue** - Check your internet connection

**Solution:**
```bash
# Check server logs for specific error
# The error will show in the terminal where you ran ./run.sh

# Example output:
# "Error generating roast with Grok: Invalid API key"
```

### Roast seems generic / not from Grok

**Problem:** The roast doesn't have Grok's signature personality.

**Cause:** Probably using the fallback (OpenAI or rule-based).

**Check:**
```bash
# Look at server logs - you'll see:
"🤖 Generating roast with AI..."

# Then one of:
"✅ Roast generated with Grok"        ← Using Grok
"⚠️ Fell back to OpenAI"              ← Using OpenAI
"⚠️ Using rule-based roast"           ← No AI keys
```

---

## 📚 Additional Resources

- **xAI Documentation**: https://docs.x.ai/
- **xAI Console**: https://console.x.ai/
- **API Status**: https://status.x.ai/
- **Grok on X/Twitter**: https://twitter.com/xai

---

## 🎉 You're All Set!

Once you've added your `GROK_API_KEY`, you're ready to start roasting insecure code with AI-powered humor!

**Next steps:**
1. ✅ Get your Grok API key
2. ✅ Add it to `.env`
3. ✅ Run `./run.sh`
4. ✅ Test with `/scan` endpoint
5. 🔥 **Start roasting repos!**

---

<div align="center">

**Powered by xAI's Grok** 🚀

*Making security reviews hilarious, one roast at a time* 🔥

</div>

