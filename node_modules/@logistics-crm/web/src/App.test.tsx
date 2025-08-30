import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    // Use more specific text that appears only once in the dashboard header
    expect(screen.getByText('ระบบจัดการโลจิสติกส์')).toBeInTheDocument()
  })

  it('displays the main dashboard with Thai logistics content', () => {
    render(<App />)
    expect(screen.getByText('ระบบจัดการโลจิสติกส์')).toBeInTheDocument()
    expect(screen.getByText('Thai Logistics CRM Dashboard - แดชบอร์ดหลัก')).toBeInTheDocument()
  })

  it('displays the dashboard cards with dummy data', () => {
    render(<App />)
    // Check for the three main dashboard cards
    expect(screen.getByText('รายการรถที่ต้องจัดส่งวันนี้')).toBeInTheDocument()
    expect(screen.getByText('ออเดอร์ด่วนที่เข้ามาใหม่')).toBeInTheDocument()
    expect(screen.getByText('สถานะรถที่กำลังเดินทาง')).toBeInTheDocument()
  })

  it('displays the vehicle status table', () => {
    render(<App />)
    expect(screen.getByText('สถานะรถและการจัดส่ง')).toBeInTheDocument()
    expect(screen.getByText('ชื่อคนขับ')).toBeInTheDocument()
    expect(screen.getByText('ทะเบียนรถ')).toBeInTheDocument()
    expect(screen.getByText('สินค้าที่บรรทุก')).toBeInTheDocument()
  })

  it('shows development mode information when in DEV environment', () => {
    render(<App />)
    // Development mode section should show when in DEV
    expect(screen.getByText('🧪 Development Mode - Story Implementation Status')).toBeInTheDocument()
    expect(screen.getByText('✅ Completed Stories:')).toBeInTheDocument()
  })
})