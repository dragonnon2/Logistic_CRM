# Unified Project Structure (โครงสร้างโปรเจกต์)

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