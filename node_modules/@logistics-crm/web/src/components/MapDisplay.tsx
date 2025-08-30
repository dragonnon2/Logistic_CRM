// MapDisplay - Interactive map component for vehicle tracking
// Story 2.3: Integrate Map for Vehicle Location

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Location } from '@logistics-crm/shared-types'

// Import leaflet CSS
import 'leaflet/dist/leaflet.css'

// Fix for default markers in webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="20" height="8" rx="2" fill="#3B82F6"/>
      <rect x="22" y="14" width="8" height="6" rx="1" fill="#3B82F6"/>
      <circle cx="8" cy="24" r="3" fill="#1F2937"/>
      <circle cx="24" cy="24" r="3" fill="#1F2937"/>
      <circle cx="8" cy="24" r="1.5" fill="white"/>
      <circle cx="24" cy="24" r="1.5" fill="white"/>
      <rect x="4" y="8" width="4" height="4" rx="1" fill="#60A5FA"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

// Custom destination icon
const destinationIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C11.6 2 8 5.6 8 10C8 16 16 28 16 28S24 16 24 10C24 5.6 20.4 2 16 2Z" fill="#EF4444"/>
      <circle cx="16" cy="10" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

interface MapDisplayProps {
  vehicleLocation?: Location
  destinationLocation?: Location
  vehicleInfo?: {
    plateNumber: string
    driverName: string
  }
  destinationInfo?: {
    name: string
    address: string
  }
  className?: string
}

// Component to fit map bounds
function MapBounds({ locations }: { locations: Location[] }) {
  const map = useMap()
  
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map(loc => [loc.latitude, loc.longitude])
      )
      
      if (locations.length === 1) {
        // Single location - just center on it with reasonable zoom
        map.setView([locations[0].latitude, locations[0].longitude], 13)
      } else {
        // Multiple locations - fit all with padding
        map.fitBounds(bounds, { padding: [20, 20] })
      }
    }
  }, [map, locations])
  
  return null
}

export default function MapDisplay({ 
  vehicleLocation, 
  destinationLocation, 
  vehicleInfo, 
  destinationInfo,
  className = ""
}: MapDisplayProps) {
  const mapRef = useRef<any>(null)
  
  // Default center to Bangkok if no locations provided
  const center: [number, number] = vehicleLocation 
    ? [vehicleLocation.latitude, vehicleLocation.longitude]
    : destinationLocation
    ? [destinationLocation.latitude, destinationLocation.longitude]
    : [13.7563, 100.5018] // Bangkok center
    
  const locations = [
    ...(vehicleLocation ? [vehicleLocation] : []),
    ...(destinationLocation ? [destinationLocation] : [])
  ]

  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={13}
        className="w-full h-full rounded-lg"
        scrollWheelZoom={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Vehicle marker */}
        {vehicleLocation && (
          <Marker
            position={[vehicleLocation.latitude, vehicleLocation.longitude]}
            icon={truckIcon}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-semibold mb-1">🚛 ตำแหน่งรถ / Vehicle Location</div>
                {vehicleInfo && (
                  <div className="space-y-1 text-xs">
                    <div><strong>คนขับ:</strong> {vehicleInfo.driverName}</div>
                    <div><strong>ทะเบียน:</strong> {vehicleInfo.plateNumber}</div>
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  อัปเดตล่าสุด: {new Date(vehicleLocation.updated_at).toLocaleString('th-TH')}
                </div>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Destination marker */}
        {destinationLocation && (
          <Marker
            position={[destinationLocation.latitude, destinationLocation.longitude]}
            icon={destinationIcon}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-semibold mb-1">📍 จุดหมาย / Destination</div>
                {destinationInfo && (
                  <div className="space-y-1 text-xs">
                    <div><strong>ลูกค้า:</strong> {destinationInfo.name}</div>
                    <div><strong>ที่อยู่:</strong> {destinationInfo.address}</div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Auto-fit bounds to show all markers */}
        <MapBounds locations={locations} />
      </MapContainer>
      
      {/* Loading overlay for when map is initializing */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg pointer-events-none opacity-0 transition-opacity">
        <div className="text-sm text-gray-600">กำลังโหลดแผนที่...</div>
      </div>
    </div>
  )
}