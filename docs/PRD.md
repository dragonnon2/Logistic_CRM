### **เอกสาร Product Requirements Document (PRD): Logistics CRM (MVP)**

**เวอร์ชัน:** 0.1  
**วันที่:** 30 สิงหาคม 2025

### **1. Goals and Background Context (เป้าหมายและที่มา)**

#### **Goals (เป้าหมาย)**
* **สำหรับธุรกิจ:**
    * เพิ่มประสิทธิภาพในการดำเนินงานของพนักงานประสานงาน (Dispatcher)
    * ลดเวลาที่เสียไปกับการรวบรวมข้อมูลสถานะงานจากหลายแหล่ง (โทรศัพท์, เอกสาร)
* **สำหรับผู้ใช้:**
    * พนักงานประสานงานสามารถเข้าใจภาพรวมสถานะของรถและออเดอร์ทั้งหมดได้ภายใน 5 นาทีแรกที่เริ่มใช้งานโปรแกรม

#### **Background Context (ที่มาและความสำคัญ)**
โปรเจกต์นี้มีเป้าหมายเพื่อสร้าง CRM เวอร์ชัน MVP สำหรับธุรกิจ Logistics ในรูปแบบเว็บไซต์ที่ใช้งานง่ายสำหรับผู้ใช้ที่ไม่เชี่ยวชาญด้านเทคโนโลยี. ระบบนี้ถูกออกแบบมาเพื่อแก้ปัญหาความไม่มีประสิทธิภาพและความผิดพลาดที่เกิดจากการที่พนักงานต้องจัดการข้อมูลจากหลายแหล่งที่ไม่เชื่อมต่อกัน. โซลูชันหลักคือการสร้าง Dashboard ที่เป็นศูนย์กลาง แสดงข้อมูลที่สำคัญที่สุดอย่างชัดเจน เพื่อให้สามารถตัดสินใจและดำเนินการได้อย่างรวดเร็ว.

#### **Change Log (ประวัติการแก้ไข)**
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 30/08/2025 | 0.1 | Initial draft based on Project Brief | John (PM) |

### **2. Requirements (ข้อกำหนด)**

#### **Functional (ด้านฟังก์ชันการทำงาน)**
* **FR1:** ระบบจะต้องแสดงหน้า Dashboard เป็นหน้าแรกหลังจากการเข้าสู่ระบบ.
* **FR2:** Dashboard จะต้องแสดง "รายการรถที่ต้องจัดส่งวันนี้".
* **FR3:** Dashboard จะต้องแสดง "ออเดอร์ด่วนที่เข้ามาใหม่".
* **FR4:** Dashboard จะต้องแสดง "สถานะรถที่กำลังเดินทาง".
* **FR5:** ในส่วนของ "สถานะรถที่กำลังเดินทาง" จะต้องแสดงข้อมูลย่อยของรถแต่ละคันได้แก่: ชื่อคนขับ, ทะเบียนรถ, สินค้าที่บรรทุก, และตำแหน่งล่าสุดบนแผนที่.
* **FR6:** ผู้ใช้ต้องสามารถกด Action บางอย่างได้จากหน้าจอสถานะรถ เช่น "ติดต่อคนขับ" หรือ "บันทึกปัญหา".
* **FR7:** ในเวอร์ชันแรกนี้ ระบบจะใช้ข้อมูลจำลอง (Dummy Data) เพื่อการพัฒนาและตรวจสอบหน้าตาโปรแกรมก่อน.

#### **Non-Functional (ด้านอื่นๆ ที่ไม่ใช่ฟังก์ชัน)**
* **NFR1:** หน้าตาโปรแกรม (User Interface) ต้องเรียบง่ายและใช้งานสะดวก สำหรับผู้ใช้ที่ไม่มีความเชี่ยวชาญด้านคอมพิวเตอร์.
* **NFR2:** โปรแกรมนี้จะต้องเป็นเว็บไซต์ (Web Application).
* **NFR3:** เทคโนโลยีฝั่ง Frontend จะต้องเป็น React และใช้ `shadcn/ui` สำหรับ UI Components.
* **NFR4:** ระบบฐานข้อมูลและ Backend จะใช้บริการของ Supabase.
* **NFR5:** Key ที่มีความสำคัญ เช่น API Keys ของ Supabase จะต้องถูกเก็บไว้ในไฟล์ `.env` เท่านั้น.

### **3. User Interface Design Goals (เป้าหมายการออกแบบ UI/UX)**

* **Overall UX Vision:** หัวใจของการออกแบบคือ "ความเรียบง่ายและชัดเจน" (Simplicity and Clarity) ผู้ใช้ต้องสามารถเห็นข้อมูลที่สำคัญที่สุดและดำเนินการที่จำเป็นได้ทันที โดยมีจำนวนคลิกน้อยที่สุด.
* **Key Interaction Paradigms:** การใช้งานจะเน้นอยู่ที่หน้า Dashboard เป็นหลัก, ข้อมูลจะถูกจัดกลุ่มในรูปแบบ "การ์ด" และ "ตาราง", และปุ่ม Action จะอยู่ติดกับข้อมูลที่เกี่ยวข้องโดยตรง.
* **Core Screens and Views:** Login Screen, Main Dashboard, Trip Detail View (Pop-up).
* **Accessibility:** ยึดมาตรฐาน WCAG AA เป็นหลัก.
* **Branding:** ยังไม่มีข้อกำหนด สามารถตัดสินใจภายหลังได้.
* **Target Device and Platforms:** Web Responsive (คอมพิวเตอร์, แท็บเล็ต, มือถือ).

### **4. Technical Assumptions (ข้อตกลงเบื้องต้นด้านเทคนิค)**

* **Repository Structure:** Monorepo (เก็บโค้ดไว้ในที่เดียวเพื่อการพัฒนาที่รวดเร็ว).
* **Service Architecture:** Serverless via BaaS (ใช้ Supabase เป็น Backend สำเร็จรูป).
* **Testing Requirements:** เน้น Unit Testing สำหรับฟังก์ชันสำคัญในช่วง MVP.
* **Additional Assumptions:**
    * **Frontend Framework:** React (Vite) + TypeScript.
    * **UI Library:** shadcn/ui.
    * **Backend & Database:** Supabase.
    * **Initial Data Strategy:** เริ่มต้นด้วย Dummy Data.

### **5. Epic List (ภาพรวมของกลุ่มงานหลัก)**

* **Epic 1: Foundation & Core Dashboard Setup**
    * **Goal:** วางโครงสร้างพื้นฐานทางเทคนิคทั้งหมดของโปรเจกต์ และสร้างหน้า Dashboard หลักที่สามารถแสดงผลข้อมูลสำคัญด้าน Logistics ได้
* **Epic 2: Vehicle Status, Interaction & Authentication**
    * **Goal:** พัฒนาระบบแสดงสถานะรถแบบ Real-time บน Dashboard และเพิ่มเครื่องมือที่จำเป็นให้พนักงานสามารถจัดการรถแต่ละคันได้ทันที พร้อมทั้งเพิ่มระบบ Login

### **Epic 1: Foundation & Core Dashboard Setup**

#### **Story 1.1: Project Initialization & UI Setup**
* **As a** developer, **I want** to initialize a new React (Vite + TS) project and integrate shadcn/ui, **so that** we have a clean, standardized foundation for building the application.
* **Acceptance Criteria:** โปรเจกต์ Vite ถูกสร้าง, ติดตั้ง dependencies, ติดตั้ง shadcn/ui, เพิ่ม components ที่จำเป็น, และ dev server ทำงานได้ปกติ.

#### **Story 1.2: Create Dummy Data & Types**
* **As a** developer, **I want** to define TypeScript interfaces and create a dummy data file for orders, **so that** the frontend has a clear and consistent data structure to build against.
* **Acceptance Criteria:** มีไฟล์ `dummies.ts`, มี Type `Order`, มีข้อมูล `dummyOrders` อย่างน้อย 4-5 รายการ, และ export ออกมาอย่างถูกต้อง.

#### **Story 1.3: Build the Static Dashboard Layout**
* **As a** user, **I want** to see the main dashboard layout with empty state cards and tables, **so that** I can understand the application's structure.
* **Acceptance Criteria:** มีหน้า `Dashboard.tsx`, แสดงหัวข้อ, มี Card 3 ใบ และ Table พร้อม Header ที่ถูกต้อง.

#### **Story 1.4: Display Dummy Data on the Dashboard**
* **As a** user, **I want** to see the dummy order data displayed on the dashboard, **so that** I can see a realistic representation of the application's functionality.
* **Acceptance Criteria:** หน้า Dashboard นำเข้า `dummyOrders`, การ์ดต่างๆ แสดงผลข้อมูลและจำนวนได้ถูกต้อง, และตารางแสดงข้อมูลได้ครบถ้วน.

### **Epic 2: Vehicle Status, Interaction & Authentication**

#### **Story 2.1: Implement Detailed Trip View**
* **As a** dispatcher, **I want** to click on an "en route" vehicle and see a detailed view, **so that** I can get more specific information.
* **Acceptance Criteria:** คลิกแล้วมี Pop-up แสดงขึ้นมา, แสดงข้อมูลสำคัญครบ, และมีปุ่มปิด.

#### **Story 2.2: Add Interactive Action Buttons**
* **As a** dispatcher, **I want** to have "Contact Driver" and "Log Issue" buttons, **so that** I can take immediate action.
* **Acceptance Criteria:** มีปุ่ม "ติดต่อคนขับ" และ "บันทึกปัญหา" แสดงในหน้าต่างรายละเอียด และกดใช้งานได้.

#### **Story 2.3: Integrate Map for Vehicle Location**
* **As a** dispatcher, **I want** to see the vehicle's location on a real map, **so that** I can visually track its progress.
* **Acceptance Criteria:** มีแผนที่จริงแสดงขึ้นมาแทนที่ของเดิม, มีหมุดปักตามตำแหน่ง, และแผนที่สามารถซูม/เลื่อนได้.

#### **Story 2.4: Implement User Authentication (Login)**
* **As a** user, **I want** to log in with a username and password, **so that** I can securely access the system.
* **Acceptance Criteria:** มีหน้า Login, กรอกข้อมูลได้, เมื่อ Login (จำลอง) สำเร็จจะไปที่หน้า Dashboard, ถ้าไม่สำเร็จจะแสดง Error.

