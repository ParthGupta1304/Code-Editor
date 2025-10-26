# Code Editor - Deployment Guide

This guide covers deploying your Code Editor project to production.

## Architecture

- **Frontend**: React + Vite + Tailwind CSS (client/)
- **Backend**: Node.js + Express + MongoDB (server/)

## Prerequisites

1. MongoDB Atlas account (free tier works)
2. Accounts on deployment platforms (choose one for each):
   - Frontend: Vercel or Netlify
   - Backend: Render, Railway, or Vercel

---

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (all IPs) for production
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/code-editor?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend (Choose One Platform)

### Option A: Deploy to Render (Recommended - Free Tier)

1. **Push code to GitHub** (if not already)

2. **Go to [Render](https://render.com)**

3. **Create New Web Service**
   - Connect your GitHub repository
   - Root Directory: `server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables:**
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   NODE_ENV=production
   PORT=10000
   CORS_ORIGIN=<your-frontend-url>
   ```
   (You'll update CORS_ORIGIN after deploying frontend)

5. **Deploy** - Copy your backend URL (e.g., `https://your-app.onrender.com`)

### Option B: Deploy to Railway

1. **Go to [Railway](https://railway.app)**
2. **New Project** → Deploy from GitHub
3. **Select your repository** → Choose `server` directory
4. **Add Environment Variables** (same as above)
5. **Generate Domain** - Copy your backend URL

### Option C: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **From server directory:**
   ```bash
   cd server
   vercel
   ```

3. **Add Environment Variables** in Vercel dashboard
4. **Deploy:**
   ```bash
   vercel --prod
   ```

---

## Step 3: Deploy Frontend (Choose One Platform)

### Option A: Deploy to Vercel (Recommended)

1. **Create `.env` file in client directory:**
   ```bash
   cd ../client
   cp .env.example .env
   ```

2. **Edit `.env`:**
   ```
   VITE_API_URL=<your-backend-url>
   ```
   Example: `VITE_API_URL=https://your-app.onrender.com`

3. **Install Vercel CLI** (if not already):
   ```bash
   npm install -g vercel
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   Follow prompts, then:
   ```bash
   vercel --prod
   ```

5. **Or use Vercel Dashboard:**
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Root Directory: `client`
   - Framework Preset: Vite
   - Add Environment Variable: `VITE_API_URL=<your-backend-url>`
   - Deploy

### Option B: Deploy to Netlify

1. **Create `.env` file:**
   ```bash
   cd client
   cp .env.example .env
   ```
   Add: `VITE_API_URL=<your-backend-url>`

2. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

3. **Build locally:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```
   Choose `dist` as publish directory

5. **Or use Netlify Dashboard:**
   - Go to [Netlify](https://www.netlify.com)
   - Import repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL`

---

## Step 4: Update CORS Settings

After deploying frontend, update your backend CORS_ORIGIN:

1. Go to your backend deployment platform
2. Update `CORS_ORIGIN` environment variable to your frontend URL
   Example: `https://your-app.vercel.app`
3. Redeploy or restart the backend service

---

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Navigate to the Editor page
3. Write some code and click "Run Code"
4. Verify output appears correctly

---

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` in backend matches your frontend URL exactly (no trailing slash)
- Check browser console for exact error

### API Connection Failed
- Verify `VITE_API_URL` is set correctly in frontend
- Check backend logs for errors
- Ensure MongoDB connection string is correct

### Code Execution Fails
- Check if `node` and `python3` are available on your backend platform
- Render and Railway support both by default
- Vercel has limitations on code execution - use Render/Railway for backend

### Build Fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node version compatibility (use Node 18+)

---

## Environment Variables Summary

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Cost Estimate

- **MongoDB Atlas**: Free (512MB)
- **Render**: Free tier available (may sleep after inactivity)
- **Railway**: $5/month credit (free tier)
- **Vercel/Netlify**: Free for personal projects

**Total**: $0-5/month

---

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed with environment variables
- [ ] Frontend deployed with API_URL configured
- [ ] CORS_ORIGIN updated in backend
- [ ] Test code execution in production
- [ ] Check error handling
- [ ] Monitor logs for issues

---

## Recommended Setup

For best results:
- **Frontend**: Vercel (fast, free, great DX)
- **Backend**: Render (free tier, supports code execution)
- **Database**: MongoDB Atlas (free tier)

This combination is 100% free and production-ready!

---

## Quick Deploy Commands

```bash
# Backend (Render - use dashboard)
# or Railway CLI
cd server
railway login
railway init
railway up

# Frontend (Vercel)
cd client
vercel --prod
```

---

## Support

If you encounter issues:
1. Check platform status pages
2. Review deployment logs
3. Verify all environment variables
4. Test locally first with `npm run dev`

Happy deploying! 🚀
