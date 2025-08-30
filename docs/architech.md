### **เอกสาร Fullstack Architecture Document: Logistics CRM (MVP)**

**เวอร์ชัน:** 0.1  
**วันที่:** 30 สิงหาคม 2025

### **1. Introduction (บทนำ)**

เอกสารนี้จะสรุปสถาปัตยกรรมแบบ Fullstack ทั้งหมดสำหรับโปรเจกต์ **Logistics CRM (MVP)** ซึ่งจะครอบคลุมทั้งระบบ Backend, Frontend, และการเชื่อมต่อระหว่างกัน เอกสารนี้จะเป็นแหล่งข้อมูลอ้างอิงหลักเพียงแหล่งเดียว (Single Source of Truth) สำหรับทีม Developer เพื่อให้การพัฒนาเป็นไปในทิศทางเดียวกัน

  * **Starter Template:** โปรเจกต์นี้จะสร้างขึ้นมาใหม่ (Greenfield) โดยใช้ **Vite + React (TypeScript)** เป็น Template พื้นฐานสำหรับฝั่ง Frontend จากนั้นจะทำการติดตั้งและเชื่อมต่อกับ **shadcn/ui** สำหรับ UI และ **Supabase** สำหรับ Backend และฐานข้อมูล

### **2. High-Level Architecture (สถาปัตยกรรมภาพรวม)**

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

### **3. Tech Stack (เทคโนโลยีที่ใช้)**

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | ~5.2.2 | เพิ่มความน่าเชื่อถือและลดข้อผิดพลาด |
| **Frontend Framework**| React | ~18.2.0 | UI Library ยอดนิยม |
| **Build Tool** | Vite | ~5.2.0 | เครื่องมือสร้างโปรเจกต์ที่รวดเร็ว |
| **UI Library** | shadcn/ui | latest | ชุด UI ที่สวยงามและปรับแต่งง่าย |
| **Styling** | Tailwind CSS | ~3.4.1 | CSS Framework สำหรับการดีไซน์ |
| **State Management**| Zustand | ~4.5.2 | จัดการ State ที่เรียบง่ายและทรงพลัง |
| **Backend** | Supabase | latest | BaaS Platform |
| **Database** | PostgreSQL | 15.1 | ฐานข้อมูลหลักที่มาพร้อม Supabase |
| **Authentication** | Supabase Auth | latest | ระบบยืนยันตัวตน |
| **Frontend Testing**| Vitest, RTL | latest | สำหรับ Unit & Component Testing |
| **CI/CD** | GitHub Actions | latest | ระบบ Deploy อัตโนมัติ |

### **4. Data Models (โมเดลข้อมูล)**

  * **Order (ออเดอร์)**
      * **Purpose:** เก็บข้อมูลการจัดส่งสินค้า
      * **TypeScript Interface:**
        ```typescript
        export interface Order {
          id: string; // UUID
          created_at: string;
          customer_name: string;
          destination: string;
          truck_id: string; // Foreign Key to Truck
          status: 'Pending' | 'In Transit' | 'Delivered' | 'Urgent';
        }
        ```
  * **Truck (รถขนส่ง)**
      * **Purpose:** เก็บข้อมูลรถและคนขับ
      * **TypeScript Interface:**
        ```typescript
        export interface Truck {
          id: string; // UUID
          plate_number: string;
          driver_name: string;
          // อาจจะมีข้อมูลตำแหน่ง lat, lon ในอนาคต
        }
        ```

### **5. API Specification (รายละเอียด API)**

เนื่องจากเราใช้ Supabase เป็น BaaS (Backend as a Service) เราจะไม่ได้สร้าง REST API ขึ้นมาเอง แต่จะใช้ Library `supabase-js` ในการสื่อสารกับฐานข้อมูลโดยตรง ซึ่ง Supabase จะสร้าง API ให้เราอัตโนมัติ

  * **การเชื่อมต่อ:** จะมีไฟล์ `supabaseClient.ts` กลางสำหรับตั้งค่าการเชื่อมต่อ
  * **ตัวอย่างการใช้งาน:**
    ```typescript
    // การดึงข้อมูล Orders ทั้งหมด
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*');

    // การเพิ่ม Order ใหม่
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { customer_name: 'ลูกค้าใหม่', destination: 'ปลายทาง', status: 'Pending' },
      ]);
    ```

### **6. Database Schema (โครงสร้างฐานข้อมูล)**

นี่คือคำสั่ง SQL สำหรับสร้างตารางในฐานข้อมูล PostgreSQL ของ Supabase

```sql
-- ตารางเก็บข้อมูลรถ
CREATE TABLE trucks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plate_number TEXT NOT NULL,
  driver_name TEXT
);

-- ตารางเก็บข้อมูลออเดอร์
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT now(),
  customer_name TEXT NOT NULL,
  destination TEXT,
  truck_id UUID REFERENCES trucks(id),
  status TEXT NOT NULL DEFAULT 'Pending'
);

-- NOTE: อย่าลืมเปิดใช้งาน Row Level Security (RLS) บนตารางเหล่านี้ใน Supabase Dashboard เพื่อความปลอดภัย
```

### **7. Unified Project Structure (โครงสร้างโปรเจกต์)**

เราจะใช้ Monorepo ด้วย npm Workspaces โดยมีโครงสร้างดังนี้:

```
/logistics-crm/
|-- /apps/
|   |-- /web/                 # โปรเจกต์ React (Vite)
|       |-- /src/
|       |   |-- /components/  # UI Components
|       |   |-- /data/
|       |   |-- /hooks/
|       |   |-- /pages/       # หน้าต่างๆ ของเว็บ
|       |   |-- /lib/         # supabaseClient.ts
|       |-- package.json
|-- /packages/
|   |-- /shared-types/        # ที่เก็บ TypeScript Interfaces ที่ใช้ร่วมกัน
|       |-- /src/index.ts
|       |-- package.json
|-- package.json              # ไฟล์หลักสำหรับจัดการ Workspaces
```

### **8. Deployment Architecture (สถาปัตยกรรมการ Deploy)**

  * **Frontend (React App):**
      * Deploy ที่ **Vercel** โดยเชื่อมต่อกับ GitHub Repository
      * Vercel จะทำการ Build และ Deploy อัตโนมัติเมื่อมีการ Push Code ไปยัง Branch `main`
      * Environment variables (เช่น `VITE_SUPABASE_URL`) จะถูกตั้งค่าใน Vercel Project Settings
  * **Backend (Supabase):**
      * Supabase จัดการส่วนนี้ให้ทั้งหมด เราแค่สร้าง Project และนำ URL/Key มาใช้งาน

### **9. Security & Performance (ความปลอดภัยและประสิทธิภาพ)**

  * **Security:**
      * **Row Level Security (RLS):** จะต้องเปิดใช้งานใน Supabase เพื่อกำหนดว่าใครสามารถเข้าถึงข้อมูลแถวไหนได้บ้าง (เช่น User เห็นได้เฉพาะ Order ของตัวเอง)
      * **Environment Variables:** เก็บ Key ทั้งหมดไว้ใน `.env` และใน Vercel Settings ห้าม hardcode ลงในโค้ดเด็ดขาด
  * **Performance:**
      * **Vercel CDN:** Frontend ของเราจะถูกกระจายไปทั่วโลกโดยอัตโนมัติ ทำให้โหลดเร็ว
      * **Database Indexing:** สร้าง Index ให้กับคอลัมน์ที่ถูกค้นหาบ่อยๆ ใน Supabase เพื่อเพิ่มความเร็ว

### **10. Testing Strategy (กลยุทธ์การทดสอบ)**

  * **Unit & Component Tests:** ใช้ **Vitest** และ **React Testing Library** ในการทดสอบ Logic และ Components ของฝั่ง Frontend
  * **เป้าหมาย:** ในช่วง MVP จะเน้นการทดสอบฟังก์ชันหลักๆ ของ Dashboard เพื่อให้แน่ใจว่าการแสดงผลและ Logic พื้นฐานทำงานถูกต้อง

