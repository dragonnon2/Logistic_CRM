# High-Level Architecture (สถาปัตยกรรมภาพรวม)

  * **Technical Summary:**
    สถาปัตยกรรมนี้เป็นแบบ **Jamstack** โดยมี Frontend ที่สร้างด้วย React (Vercel) เชื่อมต่อโดยตรงกับ Backend as a Service (Supabase) ซึ่งให้บริการทั้งฐานข้อมูล (PostgreSQL), การยืนยันตัวตน, และ API ทั้งหมดนี้ถูกจัดการในโครงสร้างแบบ **Monorepo** เพื่อให้การพัฒนาทำได้ง่ายและรวดเร็ว ตอบโจทย์การสร้าง MVP ที่ต้องการความเร็วและประสิทธิภาพ

  * **Platform and Infrastructure:**

      * **Platform:** **Vercel** สำหรับ Hosting Frontend และ **Supabase** สำหรับ Backend
      * **Key Services:**
          * **Vercel:** Static Site Hosting, CDN, Serverless Functions
          * **Supabase:** Authentication, PostgreSQL Database, Storage, Auto-generated APIs
      * **Deployment Regions:** Vercel (Global CDN), Supabase (Singapore/Asia Pacific)

  * **Repository Structure:**

      * **Structure:** **Monorepo**
      * **Tool:** **npm Workspaces** (มาพร้อมกับ npm, ไม่ต้องติดตั้งเพิ่ม)
      * **Package Organization:** แบ่งเป็น `apps` (สำหรับแอปพลิเคชัน) และ `packages` (สำหรับโค้ดที่ใช้ร่วมกัน)

  * **Architecture Diagram:**

    ```mermaid
    graph TD
        User[User] --> Vercel[Vercel Hosting]
        Vercel --> ReactApp[React App (Vite)]
        ReactApp --> Supabase[Supabase]
        Supabase --> Auth[Auth]
        Supabase --> DB[PostgreSQL DB]
        Supabase --> Storage[Storage]
    ```

  * **Architectural Patterns:**
      * **Jamstack:** ใช้ Frontend ที่เป็น Static/Pre-rendered เพื่อประสิทธิภาพสูงสุด และเรียกใช้ API ผ่าน JavaScript
      * **Component-Based UI:** สร้าง UI จากชิ้นส่วนเล็กๆ ที่นำกลับมาใช้ใหม่ได้ (React).
      * **Backend as a Service (BaaS):** ใช้ Supabase เพื่อลดเวลาในการพัฒนา Backend ลงอย่างมาก