# Technical Assumptions (ข้อตกลงเบื้องต้นด้านเทคนิค)

* **Repository Structure:** Monorepo (เก็บโค้ดไว้ในที่เดียวเพื่อการพัฒนาที่รวดเร็ว).
* **Service Architecture:** Serverless via BaaS (ใช้ Supabase เป็น Backend สำเร็จรูป).
* **Testing Requirements:** เน้น Unit Testing สำหรับฟังก์ชันสำคัญในช่วง MVP.
* **Additional Assumptions:**
    * **Frontend Framework:** React (Vite) + TypeScript.
    * **UI Library:** shadcn/ui.
    * **Backend & Database:** Supabase.
    * **Initial Data Strategy:** เริ่มต้นด้วย Dummy Data.