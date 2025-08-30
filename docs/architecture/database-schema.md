# Database Schema (โครงสร้างฐานข้อมูล)

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