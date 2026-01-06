# Didishuna - Interactive Memory Story

A cinematic, interactive web experience telling the story of sibling bond through animated scenes and beautiful photography.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/didishuna)

### Deployment Steps

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

That's it! Your site will be live in ~2 minutes.

## 🛠️ Local Development

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
didishuna/
├── src/
│   ├── components/
│   │   ├── Characters.jsx    # SVG character animations
│   │   ├── Scenes.jsx         # Scene components
│   │   └── TextOverlay.jsx    # Text animation component
│   ├── App.jsx                # Main application
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── public/
│   └── media/                 # Images and videos
└── package.json
```

## ✨ Features

- 15 interactive story scenes
- Smooth GSAP-powered transitions
- Responsive design (mobile + desktop)
- Character animations
- Image lightbox for collage scene
- Keyboard navigation support
- Auto-play with manual controls

## 🎨 Technologies

- **React** - UI framework
- **Vite** - Build tool
- **GSAP** - Animations
- **Tailwind CSS** - Styling

## 📱 Mobile Optimized

The entire experience is optimized for mobile with:
- Vertical layout on small screens
- Touch-friendly controls
- Optimized font sizes and spacing
- Responsive character scaling

## ⌨️ Keyboard Shortcuts

- `Space` - Play/Pause story
- `→` - Next scene
- `←` - Previous scene

## 🎯 Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## 📄 License

Personal project - All rights reserved

## 💝 Credits

Created with love for Didishuna
