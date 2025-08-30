// Shared TypeScript interfaces for Logistics CRM
// Core data models for Thai Logistics CRM MVP

// Order Interface - Represents delivery orders in the system
export interface Order {
  id: string; // UUID
  created_at: string;
  customer_name: string;
  destination: string;
  destination_location?: Location; // GPS coordinates for destination
  truck_id: string; // Foreign Key to Truck
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Urgent';
}

// Location Interface - Represents GPS coordinates
export interface Location {
  latitude: number;
  longitude: number;
  updated_at: string;
}

// Truck Interface - Represents delivery vehicles and drivers
export interface Truck {
  id: string; // UUID
  plate_number: string;
  driver_name: string;
  location?: Location; // GPS coordinates for map display
}

// User Interface - For future authentication features
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Generic API Response Interface
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}