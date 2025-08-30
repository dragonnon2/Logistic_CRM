# API Specification (รายละเอียด API)

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