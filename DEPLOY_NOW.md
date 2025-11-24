# 🚀 DEPLOY VIBE-ROASTER NOW - 5 MINUTE GUIDE

## ⚡ Super Quick Deploy (Vercel)

### Step 1: Test Locally (2 minutes)

```bash
# Start backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# In a new terminal, start frontend
cd frontend
npm install
npm run dev
```

Visit: http://localhost:3000 🎉

---

### Step 2: Deploy Frontend to Vercel (3 minutes)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete Vibe-Roaster web app"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your `vibe-roaster` repo
   - **Configure:**
     - Root Directory: `frontend`
     - Framework Preset: `Vite`
     - Environment Variables:
       ```
       VITE_API_URL=http://localhost:8000
       ```
       (Change to production URL later)
   - Click **"Deploy"**

3. **Done!** Your app is live at `your-project.vercel.app` ✨

---

### Step 3: Deploy Backend (Optional - Later)

Choose one:

**Option A: Railway**
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select `vibe-roaster` repo
4. Root directory: `backend`
5. Add environment variables (GROK_API_KEY, etc.)
6. Deploy!

**Option B: Render**
1. Go to https://render.com
2. New Web Service
3. Connect GitHub repo
4. Root directory: `backend`
5. Build command: `pip install -r requirements.txt`
6. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Add environment variables
8. Deploy!

**Option C: Fly.io**
```bash
cd backend
fly launch
fly deploy
```

---

## 🔑 Environment Variables You Need

### Backend
```bash
GROK_API_KEY=xai-your-key-here
OPENAI_API_KEY=sk-your-key-here  # Fallback
HOST=0.0.0.0
PORT=8000
```

### Frontend
```bash
VITE_API_URL=https://your-backend-url.com
```

---

## ✅ Pre-Deploy Checklist

- [ ] Backend runs locally (`uvicorn app.main:app`)
- [ ] Frontend runs locally (`npm run dev`)
- [ ] API keys configured in `.env`
- [ ] GitHub repo is public or accessible
- [ ] Code is pushed to GitHub
- [ ] README has your info (not mine!)

---

## 🎯 What You Get

✅ **Frontend on Vercel:**
- Custom domain: `vibe-roaster.vercel.app`
- SSL/HTTPS automatic
- CDN edge caching
- CI/CD on every push

✅ **Backend on Railway/Render:**
- Live API endpoint
- Auto-scaling
- Environment variables secure
- Logs & monitoring

---

## 📱 Social Sharing

Once deployed, update these:

### README.md
```markdown
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://vibe-roaster.vercel.app)
```

### LinkedIn
> "Just shipped Vibe-Roaster 🔥 - an AI-powered security scanner that roasts vulnerable code with humor. Built with React, FastAPI, Grok-4, and deployed to production. Try it live!"

### Twitter
> "Built an AI that roasts your code for security vulnerabilities 🔥
> 
> Tech: React + Vite + FastAPI + Grok-4
> Try it: vibe-roaster.vercel.app
> 
> #buildinpublic #react #ai"

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Check `VITE_API_URL` is set correctly
- Verify backend is running
- Check CORS settings in backend

### "npm install fails"
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node version (need 18+)

### "Vercel build fails"
- Check build logs in Vercel dashboard
- Verify `vite.config.js` is correct
- Check all imports are valid

---

## 🎉 You're Live!

Your app is now:
- ✅ Deployed to Vercel
- ✅ Accessible worldwide
- ✅ Resume-ready
- ✅ Portfolio-worthy

**Add it to:**
- Resume
- LinkedIn
- GitHub profile
- Portfolio website

---

## 💪 Next Level

### Week 1
- [ ] Add custom domain
- [ ] Deploy backend to production
- [ ] Update `VITE_API_URL` to production backend
- [ ] Test end-to-end with real backend

### Week 2
- [ ] Add analytics (Plausible/Google Analytics)
- [ ] Create OG image (1200x630px)
- [ ] Add sitemap.xml
- [ ] Submit to Google Search Console

### Week 3
- [ ] Add blog section
- [ ] Write launch post
- [ ] Share on Hacker News/Reddit
- [ ] Collect feedback

---

<div align="center">

## 🚀 **DEPLOY NOW!** 🚀

**Your app is production-ready.**  
**Ship it and show the world! 🌍**

</div>

