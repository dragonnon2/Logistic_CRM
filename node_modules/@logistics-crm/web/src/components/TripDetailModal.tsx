// TripDetailModal - Detailed trip information modal for dispatchers
// Story 2.1: Implement Detailed Trip View

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MapDisplay from "./MapDisplay"
import type { Order, Truck } from '@logistics-crm/shared-types'

interface TripDetailModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order & { truck?: Truck }
}

export default function TripDetailModal({ isOpen, onClose, order }: TripDetailModalProps) {
  // Button handlers for action buttons
  const handleContactDriver = () => {
    // Placeholder functionality for MVP - will be implemented in future stories
    console.log(`Contacting driver for order: ${order.id}`, {
      orderId: order.id,
      driverName: order.truck?.driver_name,
      truckPlate: order.truck?.plate_number
    })
    alert(`ติดต่อคนขับ: ${order.truck?.driver_name || 'ไม่พบข้อมูลคนขับ'}\nทะเบียนรถ: ${order.truck?.plate_number || 'N/A'}`)
  }

  const handleLogIssue = () => {
    // Placeholder functionality for MVP - will be implemented in future stories
    console.log(`Logging issue for order: ${order.id}`, {
      orderId: order.id,
      customerName: order.customer_name,
      destination: order.destination,
      status: order.status
    })
    alert(`บันทึกปัญหาสำหรับออเดอร์: ${order.id}\nลูกค้า: ${order.customer_name}\nสถานะ: ${order.status}`)
  }

  // Helper function to format Thai status
  const getThaiStatus = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'กำลังจัดส่ง'
      case 'Pending':
        return 'รอจัดส่ง'
      case 'Urgent':
        return 'ด่วน'
      case 'Delivered':
        return 'จัดส่งแล้ว'
      default:
        return status
    }
  }

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-blue-100 text-blue-800'
      case 'Urgent':
        return 'bg-red-100 text-red-800'
      case 'Delivered':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Format date for Thai display
  const formatThaiDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold">
            รายละเอียดการจัดส่ง
          </DialogTitle>
          <DialogDescription>
            Trip Details - ข้อมูลรายละเอียดการจัดส่งสินค้า
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                สถานะออเดอร์
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getThaiStatus(order.status)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Order ID
                  </label>
                  <p className="font-mono text-sm">{order.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    วันที่สร้างออเดอร์
                  </label>
                  <p>{formatThaiDate(order.created_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ข้อมูลลูกค้า</CardTitle>
              <CardDescription>Customer Information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  ชื่อลูกค้า / Customer Name
                </label>
                <p className="font-medium">{order.customer_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  จุดหมายปลายทาง / Destination
                </label>
                <p className="font-medium">{order.destination}</p>
              </div>
            </CardContent>
          </Card>

          {/* Truck & Driver Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ข้อมูลรถและคนขับ</CardTitle>
              <CardDescription>Vehicle & Driver Information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.truck ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      ชื่อคนขับ / Driver Name
                    </label>
                    <p className="font-medium">{order.truck.driver_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      ทะเบียนรถ / License Plate
                    </label>
                    <p className="font-medium font-mono">{order.truck.plate_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Truck ID
                    </label>
                    <p className="font-mono text-sm">{order.truck.id}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  ไม่พบข้อมูลรถ - No truck information available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location Information Card with Interactive Map */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ข้อมูลตำแหน่ง</CardTitle>
              <CardDescription>Location Information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.truck?.location && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        ตำแหน่งรถ / Vehicle Location
                      </label>
                      <p className="text-sm">
                        📍 {order.truck.location.latitude.toFixed(6)}, {order.truck.location.longitude.toFixed(6)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        อัปเดตล่าสุด: {new Date(order.truck.location.updated_at).toLocaleString('th-TH')}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      จุดหมาย / Destination
                    </label>
                    <p className="text-sm">
                      📍 {order.destination}
                    </p>
                    {order.destination_location && (
                      <p className="text-xs text-muted-foreground">
                        {order.destination_location.latitude.toFixed(6)}, {order.destination_location.longitude.toFixed(6)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="w-full h-80 border rounded-lg overflow-hidden">
                  {(order.truck?.location || order.destination_location) ? (
                    <MapDisplay
                      vehicleLocation={order.truck?.location}
                      destinationLocation={order.destination_location}
                      vehicleInfo={order.truck ? {
                        plateNumber: order.truck.plate_number,
                        driverName: order.truck.driver_name
                      } : undefined}
                      destinationInfo={{
                        name: order.customer_name,
                        address: order.destination
                      }}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                      <div className="text-center text-sm text-muted-foreground">
                        📍 ไม่พบข้อมูลตำแหน่ง<br />
                        No location data available
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              onClick={handleContactDriver}
              disabled={!order.truck?.driver_name}
              className="w-full sm:w-auto"
              aria-label={`ติดต่อคนขับ ${order.truck?.driver_name || ''}`}
            >
              ติดต่อคนขับ
            </Button>
            <Button 
              variant="secondary"
              onClick={handleLogIssue}
              className="w-full sm:w-auto"
              aria-label={`บันทึกปัญหาสำหรับออเดอร์ ${order.id}`}
            >
              บันทึกปัญหา
            </Button>
          </div>
          
          {/* Close Button */}
          <div className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto"
              aria-label="ปิดหน้าต่างรายละเอียดการจัดส่ง"
            >
              ปิด / Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}