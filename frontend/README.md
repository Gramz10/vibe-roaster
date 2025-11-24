# 🔥 Vibe-Roaster Frontend

Beautiful, modern React + Vite frontend for Vibe-Roaster - the AI-powered security roaster.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
│   └── fire.svg        # Favicon
├── src/
│   ├── components/     # React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── ScanForm.jsx
│   │   ├── ScanResults.jsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   └── Scan.jsx
│   ├── utils/          # Utilities
│   │   ├── api.js      # API client
│   │   └── constants.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎨 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **DaisyUI** - Component library
- **Framer Motion** - Animations
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# API URL (leave blank for development proxy)
VITE_API_URL=
```

### Development Proxy

The Vite dev server proxies `/api` requests to `http://localhost:8000` automatically.

No need to configure CORS or API URLs in development!

### Production

For production, set `VITE_API_URL` to your backend URL:

```bash
VITE_API_URL=https://api.vibe-roaster.com
```

## 🎯 Features

### Landing Page (/)
- Hero section with animated elements
- Live demo with mock roast
- Tech stack badges
- Features showcase
- Call-to-action

### Scan Page (/scan)
- GitHub repo URL input with validation
- Loading state with funny messages
- Results display:
  - Security score (1-10)
  - AI-generated roast
  - Vulnerability findings
  - Suggested fixes
- Share buttons (Twitter, Reddit, Copy link)
- Responsive design
- Dark mode toggle

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
4. Deploy!

### Build & Deploy Manually

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
# Upload to any static host (Netlify, Vercel, Cloudflare Pages, etc.)
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: '#FF6B6B',    // Main brand color
  secondary: '#4ECDC4',  // Secondary brand color
  accent: '#FFE66D',     // Accent color
}
```

### Fonts

Edit `index.html` to change Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font" rel="stylesheet">
```

Then update `tailwind.config.js`:

```js
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
}
```

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎭 Dark Mode

Dark mode is enabled by default and toggleable via the header.

Theme is persisted in `localStorage`.

## 🚨 Error Handling

- API errors show toast notifications
- Form validation with helpful messages
- Network error handling
- Graceful loading states

## 📈 Performance

- Code splitting with React Router
- Lazy loading for images
- Optimized bundle size
- Fast refresh in development
- Service worker ready (can be added)

## 🤝 Contributing

See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](../LICENSE)

---

Built with ❤️ by [Gerardo Ramirez](https://github.com/Gramz10)

