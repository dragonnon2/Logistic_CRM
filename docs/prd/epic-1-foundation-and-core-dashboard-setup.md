# Epic 1: Foundation & Core Dashboard Setup

## Story 1.1: Project Initialization & UI Setup
* **As a** developer, **I want** to initialize a new React (Vite + TS) project and integrate shadcn/ui, **so that** we have a clean, standardized foundation for building the application.
* **Acceptance Criteria:** โปรเจกต์ Vite ถูกสร้าง, ติดตั้ง dependencies, ติดตั้ง shadcn/ui, เพิ่ม components ที่จำเป็น, และ dev server ทำงานได้ปกติ.

## Story 1.2: Create Dummy Data & Types
* **As a** developer, **I want** to define TypeScript interfaces and create a dummy data file for orders, **so that** the frontend has a clear and consistent data structure to build against.
* **Acceptance Criteria:** มีไฟล์ `dummies.ts`, มี Type `Order`, มีข้อมูล `dummyOrders` อย่างน้อย 4-5 รายการ, และ export ออกมาอย่างถูกต้อง.

## Story 1.3: Build the Static Dashboard Layout
* **As a** user, **I want** to see the main dashboard layout with empty state cards and tables, **so that** I can understand the application's structure.
* **Acceptance Criteria:** มีหน้า `Dashboard.tsx`, แสดงหัวข้อ, มี Card 3 ใบ และ Table พร้อม Header ที่ถูกต้อง.

## Story 1.4: Display Dummy Data on the Dashboard
* **As a** user, **I want** to see the dummy order data displayed on the dashboard, **so that** I can see a realistic representation of the application's functionality.
* **Acceptance Criteria:** หน้า Dashboard นำเข้า `dummyOrders`, การ์ดต่างๆ แสดงผลข้อมูลและจำนวนได้ถูกต้อง, และตารางแสดงข้อมูลได้ครบถ้วน.