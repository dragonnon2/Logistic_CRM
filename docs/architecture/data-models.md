# Data Models (โมเดลข้อมูล)

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