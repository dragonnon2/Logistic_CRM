// MapDisplay.test.tsx - Component tests for Story 2.3
// Testing map component functionality and props handling

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MapDisplay from './MapDisplay'
import type { Location } from '@logistics-crm/shared-types'

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, ...props }: any) => (
    <div data-testid="map-container" {...props}>
      {children}
    </div>
  ),
  TileLayer: (props: any) => <div data-testid="tile-layer" {...props} />,
  Marker: ({ children, position, icon }: any) => (
    <div data-testid="marker" data-position={JSON.stringify(position)} data-icon={icon?.options?.iconUrl}>
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
  useMap: () => ({
    setView: vi.fn(),
    fitBounds: vi.fn()
  })
}))

// Mock leaflet
vi.mock('leaflet', () => {
  const mockIcon = vi.fn().mockImplementation(() => ({}))
  mockIcon.Default = {
    prototype: {},
    mergeOptions: vi.fn()
  }
  
  return {
    default: {
      Icon: mockIcon,
      latLngBounds: vi.fn(() => ({
        extend: vi.fn()
      }))
    }
  }
})

// Mock leaflet CSS import
vi.mock('leaflet/dist/leaflet.css', () => ({}))

describe('MapDisplay', () => {
  const mockVehicleLocation: Location = {
    latitude: 13.7560,
    longitude: 100.5018,
    updated_at: '2025-08-30T16:15:00Z'
  }

  const mockDestinationLocation: Location = {
    latitude: 13.7248,
    longitude: 100.5291,
    updated_at: '2025-08-30T08:30:00Z'
  }

  const mockVehicleInfo = {
    plateNumber: 'กข-1234 กรุงเทพฯ',
    driverName: 'สมชาย วงศ์ใหญ่'
  }

  const mockDestinationInfo = {
    name: 'บริษัท เทคโนโลยี จำกัด',
    address: 'สาทร, กรุงเทพฯ'
  }

  it('should render map container', () => {
    render(
      <MapDisplay 
        vehicleLocation={mockVehicleLocation}
        destinationLocation={mockDestinationLocation}
      />
    )

    expect(screen.getByTestId('map-container')).toBeInTheDocument()
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument()
  })

  it('should render vehicle marker when vehicle location is provided', () => {
    render(
      <MapDisplay 
        vehicleLocation={mockVehicleLocation}
        vehicleInfo={mockVehicleInfo}
      />
    )

    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(1)
    
    // Check if marker position matches vehicle location
    expect(markers[0]).toHaveAttribute('data-position', JSON.stringify([13.7560, 100.5018]))
  })

  it('should render destination marker when destination location is provided', () => {
    render(
      <MapDisplay 
        destinationLocation={mockDestinationLocation}
        destinationInfo={mockDestinationInfo}
      />
    )

    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(1)
    
    // Check if marker position matches destination location
    expect(markers[0]).toHaveAttribute('data-position', JSON.stringify([13.7248, 100.5291]))
  })

  it('should render both markers when both locations are provided', () => {
    render(
      <MapDisplay 
        vehicleLocation={mockVehicleLocation}
        destinationLocation={mockDestinationLocation}
        vehicleInfo={mockVehicleInfo}
        destinationInfo={mockDestinationInfo}
      />
    )

    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(2)
  })

  it('should render vehicle popup with correct information', () => {
    render(
      <MapDisplay 
        vehicleLocation={mockVehicleLocation}
        vehicleInfo={mockVehicleInfo}
      />
    )

    expect(screen.getByText(/ตำแหน่งรถ/)).toBeInTheDocument()
    expect(screen.getByText(/Vehicle Location/)).toBeInTheDocument()
    expect(screen.getByText('สมชาย วงศ์ใหญ่')).toBeInTheDocument()
    expect(screen.getByText('กข-1234 กรุงเทพฯ')).toBeInTheDocument()
  })

  it('should render destination popup with correct information', () => {
    render(
      <MapDisplay 
        destinationLocation={mockDestinationLocation}
        destinationInfo={mockDestinationInfo}
      />
    )

    expect(screen.getByText(/จุดหมาย/)).toBeInTheDocument()
    expect(screen.getByText(/Destination/)).toBeInTheDocument()
    expect(screen.getByText('บริษัท เทคโนโลยี จำกัด')).toBeInTheDocument()
    expect(screen.getByText('สาทร, กรุงเทพฯ')).toBeInTheDocument()
  })

  it('should handle missing location data gracefully', () => {
    render(<MapDisplay />)

    // Should still render map container
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
    
    // Should not render any markers
    expect(screen.queryAllByTestId('marker')).toHaveLength(0)
  })

  it('should apply custom className', () => {
    render(
      <MapDisplay 
        vehicleLocation={mockVehicleLocation}
        className="custom-map-class"
      />
    )

    const mapContainer = screen.getByTestId('map-container').parentElement
    expect(mapContainer).toHaveClass('custom-map-class')
  })

  it('should show Thai formatted timestamps in vehicle popup', () => {
    render(
      <MapDisplay 
        vehicleLocation={mockVehicleLocation}
        vehicleInfo={mockVehicleInfo}
      />
    )

    expect(screen.getByText(/อัปเดตล่าสุด:/)).toBeInTheDocument()
  })
})