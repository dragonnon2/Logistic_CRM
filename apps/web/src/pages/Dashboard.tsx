// Thai Logistics CRM Dashboard - Main application interface  
// Story 2.1: Dashboard with detailed trip view modal integration

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import TripDetailModal from '@/components/TripDetailModal'

// Import dummy data and types (Story 1.2)
import { dummyOrders, dummyTrucks } from '@/data/dummies'
import type { Order, Truck } from '@logistics-crm/shared-types'

// Helper function to get truck info by ID
const getTruckById = (truckId: string): Truck | undefined => {
  return dummyTrucks.find(truck => truck.id === truckId);
}

// Data filtering and calculation functions
const getTodaysDeliveryTrucks = (): number => {
  const uniqueTruckIds = new Set(
    dummyOrders
      .filter(order => order.status === 'Pending' || order.status === 'In Transit')
      .map(order => order.truck_id)
  );
  return uniqueTruckIds.size;
}

const getUrgentOrdersCount = (): number => {
  return dummyOrders.filter(order => order.status === 'Urgent').length;
}

const getInTransitVehiclesCount = (): number => {
  return dummyOrders.filter(order => order.status === 'In Transit').length;
}

// Get orders with truck information for table display
const getOrdersWithTruckInfo = (): (Order & { truck?: Truck })[] => {
  return dummyOrders
    .filter(order => order.status === 'In Transit' || order.status === 'Pending')
    .map(order => ({
      ...order,
      truck: getTruckById(order.truck_id)
    }));
}

export default function Dashboard() {
  // Modal state management (Story 2.1)
  const [selectedOrder, setSelectedOrder] = useState<(Order & { truck?: Truck }) | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Calculate metrics from dummy data
  const todaysTrucks = getTodaysDeliveryTrucks();
  const urgentOrders = getUrgentOrdersCount();
  const inTransitVehicles = getInTransitVehiclesCount();
  const ordersWithTrucks = getOrdersWithTruckInfo();

  // Handler for row click to open modal
  const handleRowClick = (order: Order & { truck?: Truck }) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  // Handler to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Dashboard Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          ระบบจัดการโลจิสติกส์
        </h1>
        <p className="text-lg text-muted-foreground">
          Thai Logistics CRM Dashboard - แดชบอร์ดหลัก
        </p>
      </div>

      {/* Dashboard Cards - Three cards with real data */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1: Today's Delivery Trucks */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">
              รายการรถที่ต้องจัดส่งวันนี้
            </CardTitle>
            <CardDescription>
              Today's Delivery Trucks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">{todaysTrucks}</div>
              <p className="text-sm text-muted-foreground">
                คัน (รถที่มีงานจัดส่ง)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: New Urgent Orders */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">
              ออเดอร์ด่วนที่เข้ามาใหม่
            </CardTitle>
            <CardDescription>
              New Urgent Orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-red-600">{urgentOrders}</div>
              <p className="text-sm text-muted-foreground">
                รายการ (ต้องจัดส่งด่วน)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Vehicles En Route Status */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">
              สถานะรถที่กำลังเดินทาง
            </CardTitle>
            <CardDescription>
              Vehicles En Route Status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">{inTransitVehicles}</div>
              <p className="text-sm text-muted-foreground">
                รายการ (กำลังจัดส่ง)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Status Table with Real Data */}
      <Card>
        <CardHeader>
          <CardTitle>สถานะรถและการจัดส่ง</CardTitle>
          <CardDescription>
            Vehicle and Delivery Status - รายละเอียดรถที่กำลังจัดส่ง ({ordersWithTrucks.length} รายการ)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อคนขับ</TableHead>
                <TableHead>ทะเบียนรถ</TableHead>
                <TableHead>สินค้าที่บรรทุก</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>ตำแหน่งล่าสุด</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersWithTrucks.length > 0 ? (
                ordersWithTrucks.map((order) => (
                  <TableRow 
                    key={order.id} 
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(order)}
                    title="คลิกเพื่อดูรายละเอียด - Click for details"
                  >
                    <TableCell className="font-medium">
                      {order.truck?.driver_name || 'ไม่พบข้อมูลคนขับ'}
                    </TableCell>
                    <TableCell>
                      {order.truck?.plate_number || 'ไม่พบข้อมูลรถ'}
                    </TableCell>
                    <TableCell>
                      {order.customer_name}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'In Transit' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Urgent'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status === 'In Transit' ? 'กำลังส่ง' : 
                         order.status === 'Urgent' ? 'ด่วน' : 
                         order.status === 'Pending' ? 'รอส่ง' : order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.destination} (รอข้อมูล GPS)
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    ไม่มีข้อมูลรถที่กำลังจัดส่ง
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        📦 Thai Logistics CRM MVP v1.0 - Dashboard สถิติทั่วไป
      </div>

      {/* Trip Detail Modal (Story 2.1) */}
      {selectedOrder && (
        <TripDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </div>
  )
}