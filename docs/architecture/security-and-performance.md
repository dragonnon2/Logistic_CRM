# Security & Performance (ความปลอดภัยและประสิทธิภาพ)

  * **Security:**
      * **Row Level Security (RLS):** จะต้องเปิดใช้งานใน Supabase เพื่อกำหนดว่าใครสามารถเข้าถึงข้อมูลแถวไหนได้บ้าง (เช่น User เห็นได้เฉพาะ Order ของตัวเอง)
      * **Environment Variables:** เก็บ Key ทั้งหมดไว้ใน `.env` และใน Vercel Settings ห้าม hardcode ลงในโค้ดเด็ดขาด
  * **Performance:**
      * **Vercel CDN:** Frontend ของเราจะถูกกระจายไปทั่วโลกโดยอัตโนมัติ ทำให้โหลดเร็ว
      * **Database Indexing:** สร้าง Index ให้กับคอลัมน์ที่ถูกค้นหาบ่อยๆ ใน Supabase เพื่อเพิ่มความเร็ว