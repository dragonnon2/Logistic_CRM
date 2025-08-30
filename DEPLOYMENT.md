# 🚀 Logistics CRM Deployment Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Git repository (GitHub, GitLab, etc.)
- Vercel account for frontend deployment
- Supabase account for backend services

## 🔧 Production Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Frontend Deployment (Vercel)

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy from project root:**
```bash
vercel --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Connect repository to Vercel dashboard
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `apps/web/dist`
   - **Install Command:** `npm install`

## 🔐 Environment Variables (Vercel)

Configure these in Vercel dashboard or via CLI:

```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
```

## 🗄️ Backend Setup (Supabase)

### 1. Create Supabase Project
- Go to https://supabase.com
- Create new project
- Note your project URL and anon key

### 2. Database Schema (Future)
```sql
-- When migrating from mock authentication
-- User profiles, orders, trucks tables will be created here
```

### 3. Authentication Setup (Future)
- Enable email/password authentication
- Configure RLS policies
- Set up user roles

## 📊 Monitoring & Analytics

### Optional Integrations:
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics
- **Performance:** Vercel Analytics

## 🔄 CI/CD Pipeline

The project includes automated deployment via Vercel:
- Pushes to `main` branch trigger production deployments
- Pull requests create preview deployments
- Build failures prevent deployment

## 🚦 Health Checks

After deployment, verify:
- [ ] Login page loads correctly
- [ ] Authentication flow works
- [ ] Dashboard displays data
- [ ] Map integration functions
- [ ] Responsive design on mobile
- [ ] All Thai/English labels display

## 📞 Support

For deployment issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test production build locally first
4. Check browser console for errors

## 🎯 MVP Features Deployed

✅ User Authentication (Mock)  
✅ Dashboard with Order Overview  
✅ Trip Detail Modal with Actions  
✅ Interactive Map with Vehicle Tracking  
✅ Thai/English Bilingual Interface  
✅ Responsive Design  
✅ Comprehensive Test Coverage  

Ready for production use! 🎉