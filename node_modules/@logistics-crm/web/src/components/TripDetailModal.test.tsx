// TripDetailModal.test.tsx - Component tests for Story 2.1
// Testing modal functionality, data display, and accessibility

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TripDetailModal from './TripDetailModal'
import type { Order, Truck } from '@logistics-crm/shared-types'

// Mock MapDisplay component to avoid testing leaflet integration in unit tests
vi.mock('./MapDisplay', () => ({
  default: ({ vehicleLocation, destinationLocation, vehicleInfo, destinationInfo }: any) => (
    <div data-testid="mock-map">
      {vehicleLocation && <div>Mock Vehicle Marker: {vehicleInfo?.driverName}</div>}
      {destinationLocation && <div>Mock Destination Marker: {destinationInfo?.name}</div>}
    </div>
  )
}))

// Mock data for testing
const mockTruck: Truck = {
  id: 'truck-001',
  plate_number: 'กข-1234 กรุงเทพฯ',
  driver_name: 'สมชาย วงศ์ใหญ่',
  location: {
    latitude: 13.7560,
    longitude: 100.5018,
    updated_at: '2025-08-30T16:15:00Z'
  }
}

const mockOrder: Order & { truck?: Truck } = {
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
  truck: mockTruck
}

const mockOrderWithoutTruck: Order & { truck?: Truck } = {
  id: 'order-002',
  created_at: '2025-08-30T09:15:00Z',
  customer_name: 'ร้าน อาหารเจ สุขใจ',
  destination: 'ลาดพร้าว, กรุงเทพฯ',
  truck_id: 'truck-999',
  status: 'Urgent'
}

describe('TripDetailModal', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('should render modal with order details when open', () => {
    render(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={mockOrder}
      />
    )

    // Check modal title
    expect(screen.getByText('รายละเอียดการจัดส่ง')).toBeInTheDocument()
    
    // Check order information
    expect(screen.getByText(mockOrder.customer_name)).toBeInTheDocument()
    expect(screen.getByText(mockOrder.destination)).toBeInTheDocument()
    expect(screen.getByText(mockOrder.id)).toBeInTheDocument()
    
    // Check truck information
    expect(screen.getByText(mockTruck.driver_name)).toBeInTheDocument()
    expect(screen.getByText(mockTruck.plate_number)).toBeInTheDocument()
    
    // Check status (should show Thai translation)
    expect(screen.getByText('กำลังจัดส่ง')).toBeInTheDocument()
  })

  it('should handle order without truck information', () => {
    render(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={mockOrderWithoutTruck}
      />
    )

    // Should show no truck information message
    expect(screen.getByText('ไม่พบข้อมูลรถ - No truck information available')).toBeInTheDocument()
    
    // Should still show order information
    expect(screen.getByText(mockOrderWithoutTruck.customer_name)).toBeInTheDocument()
    expect(screen.getByText('ด่วน')).toBeInTheDocument() // Urgent status in Thai
  })

  it('should call onClose when close button is clicked', () => {
    render(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={mockOrder}
      />
    )

    const closeButton = screen.getByText('ปิด / Close')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should display correct status colors and Thai translations', () => {
    const urgentOrder = { ...mockOrder, status: 'Urgent' as const }
    const { rerender } = render(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={urgentOrder}
      />
    )

    // Check urgent status
    const urgentBadge = screen.getByText('ด่วน')
    expect(urgentBadge).toBeInTheDocument()
    expect(urgentBadge.className).toContain('bg-red-100')

    // Test pending status
    const pendingOrder = { ...mockOrder, status: 'Pending' as const }
    rerender(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={pendingOrder}
      />
    )

    const pendingBadge = screen.getByText('รอจัดส่ง')
    expect(pendingBadge).toBeInTheDocument()
    expect(pendingBadge.className).toContain('bg-blue-100')
  })

  it('should format Thai dates correctly', () => {
    render(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={mockOrder}
      />
    )

    // Should contain Thai date formatting (we can't test exact format due to locale differences)
    expect(screen.getByText(/วันที่สร้างออเดอร์/)).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={mockOrder}
      />
    )

    // Modal should have proper ARIA attributes (inherited from shadcn/ui Dialog)
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
    
    // Modal should have accessible title
    expect(screen.getByText('รายละเอียดการจัดส่ง')).toBeInTheDocument()
  })

  it('should show location information when GPS data is available', () => {
    render(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={mockOrder}
      />
    )

    // Should show location section title
    expect(screen.getByText('ข้อมูลตำแหน่ง')).toBeInTheDocument()
    expect(screen.getByText('Location Information')).toBeInTheDocument()
    
    // Should show vehicle location details
    expect(screen.getByText('ตำแหน่งรถ / Vehicle Location')).toBeInTheDocument()
    expect(screen.getByText('จุดหมาย / Destination')).toBeInTheDocument()
    
    // Should show GPS coordinates
    expect(screen.getByText(/13.756000, 100.501800/)).toBeInTheDocument()
    expect(screen.getByText(/13.724800, 100.529100/)).toBeInTheDocument()
  })

  it('should show no location message when GPS data is unavailable', () => {
    render(
      <TripDetailModal
        isOpen={true}
        onClose={mockOnClose}
        order={mockOrderWithoutTruck}
      />
    )

    // Should show location section title
    expect(screen.getByText('ข้อมูลตำแหน่ง')).toBeInTheDocument()
    expect(screen.getByText('Location Information')).toBeInTheDocument()
    
    // Since mockOrderWithoutTruck doesn't have location data, should show no location message
    expect(screen.getByText(/ไม่พบข้อมูลตำแหน่ง/)).toBeInTheDocument()
    expect(screen.getByText(/No location data available/)).toBeInTheDocument()
  })

  it('should not render when isOpen is false', () => {
    render(
      <TripDetailModal
        isOpen={false}
        onClose={mockOnClose}
        order={mockOrder}
      />
    )

    // Modal content should not be visible
    expect(screen.queryByText('รายละเอียดการจัดส่ง')).not.toBeInTheDocument()
  })

  // Story 2.2: Action Buttons Tests
  describe('Action Buttons', () => {
    beforeEach(() => {
      // Mock console.log and alert for button handler tests
      vi.spyOn(console, 'log').mockImplementation(() => {})
      vi.spyOn(window, 'alert').mockImplementation(() => {})
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should render contact driver and log issue buttons', () => {
      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrder}
        />
      )

      // Check both action buttons are present
      expect(screen.getByText('ติดต่อคนขับ')).toBeInTheDocument()
      expect(screen.getByText('บันทึกปัญหา')).toBeInTheDocument()
      
      // Check close button is still present
      expect(screen.getByText('ปิด / Close')).toBeInTheDocument()
    })

    it('should call handleContactDriver when contact driver button is clicked', () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const alertSpy = vi.spyOn(window, 'alert')

      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrder}
        />
      )

      const contactButton = screen.getByText('ติดต่อคนขับ')
      fireEvent.click(contactButton)

      // Check console.log was called with correct parameters
      expect(consoleSpy).toHaveBeenCalledWith(
        `Contacting driver for order: ${mockOrder.id}`,
        {
          orderId: mockOrder.id,
          driverName: mockOrder.truck?.driver_name,
          truckPlate: mockOrder.truck?.plate_number
        }
      )

      // Check alert was called with Thai message
      expect(alertSpy).toHaveBeenCalledWith(
        `ติดต่อคนขับ: ${mockOrder.truck?.driver_name}\nทะเบียนรถ: ${mockOrder.truck?.plate_number}`
      )
    })

    it('should call handleLogIssue when log issue button is clicked', () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const alertSpy = vi.spyOn(window, 'alert')

      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrder}
        />
      )

      const logIssueButton = screen.getByText('บันทึกปัญหา')
      fireEvent.click(logIssueButton)

      // Check console.log was called with correct parameters
      expect(consoleSpy).toHaveBeenCalledWith(
        `Logging issue for order: ${mockOrder.id}`,
        {
          orderId: mockOrder.id,
          customerName: mockOrder.customer_name,
          destination: mockOrder.destination,
          status: mockOrder.status
        }
      )

      // Check alert was called with Thai message
      expect(alertSpy).toHaveBeenCalledWith(
        `บันทึกปัญหาสำหรับออเดอร์: ${mockOrder.id}\nลูกค้า: ${mockOrder.customer_name}\nสถานะ: ${mockOrder.status}`
      )
    })

    it('should disable contact driver button when no truck/driver information is available', () => {
      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrderWithoutTruck}
        />
      )

      const contactButton = screen.getByText('ติดต่อคนขับ')
      
      // Button should be disabled
      expect(contactButton).toBeDisabled()
    })

    it('should handle contact driver button click when no truck information is available', () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const alertSpy = vi.spyOn(window, 'alert')

      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrderWithoutTruck}
        />
      )

      const contactButton = screen.getByText('ติดต่อคนขับ')
      
      // Button should be disabled, but let's test the handler logic by enabling it manually
      fireEvent.click(contactButton)

      // Should not be called because button is disabled
      expect(consoleSpy).not.toHaveBeenCalled()
      expect(alertSpy).not.toHaveBeenCalled()
    })

    it('should have proper accessibility attributes on action buttons', () => {
      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrder}
        />
      )

      // Check ARIA labels for accessibility
      const contactButton = screen.getByLabelText(`ติดต่อคนขับ ${mockOrder.truck?.driver_name}`)
      const logIssueButton = screen.getByLabelText(`บันทึกปัญหาสำหรับออเดอร์ ${mockOrder.id}`)
      const closeButton = screen.getByLabelText('ปิดหน้าต่างรายละเอียดการจัดส่ง')

      expect(contactButton).toBeInTheDocument()
      expect(logIssueButton).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    it('should maintain responsive layout with action buttons', () => {
      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrder}
        />
      )

      // Check that buttons container has responsive classes
      const buttonsContainer = screen.getByText('ติดต่อคนขับ').closest('div')
      expect(buttonsContainer?.className).toContain('flex-col')
      expect(buttonsContainer?.className).toContain('sm:flex-row')
      
      // Check individual button responsive classes
      const contactButton = screen.getByText('ติดต่อคนขับ')
      const logIssueButton = screen.getByText('บันทึกปัญหา')
      
      expect(contactButton.className).toContain('w-full')
      expect(contactButton.className).toContain('sm:w-auto')
      expect(logIssueButton.className).toContain('w-full')
      expect(logIssueButton.className).toContain('sm:w-auto')
    })
  })

  // Story 2.3: Map Integration Tests
  describe('Map Integration', () => {
    it('should render map component when location data is available', () => {
      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrder}
        />
      )

      // Should render the mocked map component
      expect(screen.getByTestId('mock-map')).toBeInTheDocument()
      
      // Should show vehicle and destination markers
      expect(screen.getByText('Mock Vehicle Marker: สมชาย วงศ์ใหญ่')).toBeInTheDocument()
      expect(screen.getByText('Mock Destination Marker: บริษัท เทคโนโลยี จำกัด')).toBeInTheDocument()
    })

    it('should show no location message when no GPS data is available', () => {
      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrderWithoutTruck}
        />
      )

      // Should not render map component
      expect(screen.queryByTestId('mock-map')).not.toBeInTheDocument()
      
      // Should show no location message
      expect(screen.getByText(/ไม่พบข้อมูลตำแหน่ง/)).toBeInTheDocument()
      expect(screen.getByText(/No location data available/)).toBeInTheDocument()
    })

    it('should display GPS coordinates with proper formatting', () => {
      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrder}
        />
      )

      // Should show formatted GPS coordinates
      expect(screen.getByText(/13.756000, 100.501800/)).toBeInTheDocument() // Vehicle location
      expect(screen.getByText(/13.724800, 100.529100/)).toBeInTheDocument() // Destination location
    })

    it('should show location update timestamps in Thai format', () => {
      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={mockOrder}
        />
      )

      // Should show timestamp with Thai locale
      expect(screen.getByText(/อัปเดตล่าสุด:/)).toBeInTheDocument()
    })

    it('should handle partial location data gracefully', () => {
      const orderWithVehicleLocationOnly = {
        ...mockOrder,
        destination_location: undefined
      }

      render(
        <TripDetailModal
          isOpen={true}
          onClose={mockOnClose}
          order={orderWithVehicleLocationOnly}
        />
      )

      // Should still render map with vehicle location
      expect(screen.getByTestId('mock-map')).toBeInTheDocument()
      expect(screen.getByText('Mock Vehicle Marker: สมชาย วงศ์ใหญ่')).toBeInTheDocument()
      
      // Should not render destination marker
      expect(screen.queryByText(/Mock Destination Marker:/)).not.toBeInTheDocument()
    })
  })
})