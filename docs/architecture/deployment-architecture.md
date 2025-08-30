# Deployment Architecture (สถาปัตยกรรมการ Deploy)

  * **Frontend (React App):**
      * Deploy ที่ **Vercel** โดยเชื่อมต่อกับ GitHub Repository
      * Vercel จะทำการ Build และ Deploy อัตโนมัติเมื่อมีการ Push Code ไปยัง Branch `main`
      * Environment variables (เช่น `VITE_SUPABASE_URL`) จะถูกตั้งค่าใน Vercel Project Settings
  * **Backend (Supabase):**
      * Supabase จัดการส่วนนี้ให้ทั้งหมด เราแค่สร้าง Project และนำ URL/Key มาใช้งาน