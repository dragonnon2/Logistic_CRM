// Dummy data for Thai Logistics CRM MVP
// Contains sample orders and trucks for development and testing

import { Order, Truck } from '@logistics-crm/shared-types';

// Dummy Trucks - Sample delivery vehicles with Thai drivers
export const dummyTrucks: Truck[] = [
  {
    id: 'truck-001',
    plate_number: 'กข-1234 กรุงเทพฯ',
    driver_name: 'สมชาย วงศ์ใหญ่',
    location: {
      latitude: 13.7560,
      longitude: 100.5018,
      updated_at: '2025-08-30T16:15:00Z'
    }
  },
  {
    id: 'truck-002', 
    plate_number: 'คง-5678 นนทบุรี',
    driver_name: 'สมหญิง จันทร์เพ็ญ',
    location: {
      latitude: 13.8200,
      longitude: 100.5135,
      updated_at: '2025-08-30T16:10:00Z'
    }
  },
  {
    id: 'truck-003',
    plate_number: 'งจ-9012 ปทุมธานี',
    driver_name: 'วีระชัย สินธุ์พานิช',
    location: {
      latitude: 14.0208,
      longitude: 100.5250,
      updated_at: '2025-08-30T16:05:00Z'
    }
  },
  {
    id: 'truck-004',
    plate_number: 'ฉช-3456 สมุทรปราการ',
    driver_name: 'นิรันดร์ ทองคำ',
    location: {
      latitude: 13.6298,
      longitude: 100.5998,
      updated_at: '2025-08-30T16:00:00Z'
    }
  },
];

// Dummy Orders - Sample delivery orders with Thai customers and destinations
export const dummyOrders: Order[] = [
  {
    id: 'order-001',
    created_at: '2025-08-30T08:30:00Z',
    customer_name: 'บริษัท เทคโนโลยี จำกัด',
    destination: 'สาทร, กรุงเทพฯ',
    destination_location: {
      latitude: 13.7248,
      longitude: 100.5291,
      updated_at: '2025-08-30T08:30:00Z'
    },
    truck_id: 'truck-001',
    status: 'In Transit',
  },
  {
    id: 'order-002',
    created_at: '2025-08-30T09:15:00Z', 
    customer_name: 'ร้าน อาหารเจ สุขใจ',
    destination: 'ลาดพร้าว, กรุงเทพฯ',
    destination_location: {
      latitude: 13.8037,
      longitude: 100.5698,
      updated_at: '2025-08-30T09:15:00Z'
    },
    truck_id: 'truck-002',
    status: 'Urgent',
  },
  {
    id: 'order-003',
    created_at: '2025-08-30T10:00:00Z',
    customer_name: 'โรงงาน ผลิตภัณฑ์พลาสติก',
    destination: 'รังสิต, ปทุมธานี',
    destination_location: {
      latitude: 14.0297,
      longitude: 100.5998,
      updated_at: '2025-08-30T10:00:00Z'
    },
    truck_id: 'truck-003',
    status: 'Pending',
  },
  {
    id: 'order-004',
    created_at: '2025-08-30T07:45:00Z',
    customer_name: 'ห้างสรรพสินค้า เซ็นทรัลเวิลด์',
    destination: 'ราชดำริ, กรุงเทพฯ',
    destination_location: {
      latitude: 13.7470,
      longitude: 100.5370,
      updated_at: '2025-08-30T07:45:00Z'
    },
    truck_id: 'truck-001',
    status: 'Delivered',
  },
  {
    id: 'order-005',
    created_at: '2025-08-30T11:20:00Z',
    customer_name: 'คลินิก รักษ์สุขภาพ',
    destination: 'ห้วยขวาง, กรุงเทพฯ',
    destination_location: {
      latitude: 13.7849,
      longitude: 100.5747,
      updated_at: '2025-08-30T11:20:00Z'
    },
    truck_id: 'truck-004',
    status: 'In Transit',
  },
];

// All exports are already declared above - no need to re-export