// LoginPage.test.tsx - Component tests for Story 2.4
// Testing authentication form functionality and user interactions

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  const mockOnLogin = vi.fn()

  beforeEach(() => {
    mockOnLogin.mockClear()
  })

  it('should render login form with all required elements', () => {
    render(<LoginPage onLogin={mockOnLogin} />)

    // Check for bilingual title and descriptions
    expect(screen.getByText('เข้าสู่ระบบ')).toBeInTheDocument()
    expect(screen.getByText(/Sign in to your account/)).toBeInTheDocument()
    
    // Check for form elements
    expect(screen.getByLabelText(/ชื่อผู้ใช้.*Username/)).toBeInTheDocument()
    expect(screen.getByLabelText(/รหัสผ่าน.*Password/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /เข้าสู่ระบบ.*Sign In/ })).toBeInTheDocument()
    
    // Check for MVP notice
    expect(screen.getByText(/MVP Demo/)).toBeInTheDocument()
  })

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<LoginPage onLogin={mockOnLogin} />)

    const submitButton = screen.getByRole('button', { name: /เข้าสู่ระบบ.*Sign In/ })
    
    await user.click(submitButton)

    expect(screen.getByText(/กรุณากรอกชื่อผู้ใช้.*Username is required/)).toBeInTheDocument()
    expect(screen.getByText(/กรุณากรอกรหัสผ่าน.*Password is required/)).toBeInTheDocument()
    expect(mockOnLogin).not.toHaveBeenCalled()
  })

  it('should clear validation errors when user starts typing', async () => {
    const user = userEvent.setup()
    render(<LoginPage onLogin={mockOnLogin} />)

    const submitButton = screen.getByRole('button', { name: /เข้าสู่ระบบ.*Sign In/ })
    const usernameInput = screen.getByLabelText(/ชื่อผู้ใช้.*Username/)
    
    // Trigger validation errors
    await user.click(submitButton)
    expect(screen.getByText(/กรุณากรอกชื่อผู้ใช้.*Username is required/)).toBeInTheDocument()
    
    // Start typing to clear error
    await user.type(usernameInput, 'test')
    expect(screen.queryByText(/กรุณากรอกชื่อผู้ใช้.*Username is required/)).not.toBeInTheDocument()
  })

  it('should call onLogin with correct credentials when form is valid', async () => {
    const user = userEvent.setup()
    render(<LoginPage onLogin={mockOnLogin} />)

    const usernameInput = screen.getByLabelText(/ชื่อผู้ใช้.*Username/)
    const passwordInput = screen.getByLabelText(/รหัสผ่าน.*Password/)
    const submitButton = screen.getByRole('button', { name: /เข้าสู่ระบบ.*Sign In/ })
    
    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    await user.click(submitButton)

    expect(mockOnLogin).toHaveBeenCalledWith('testuser', 'testpass')
  })

  it('should show loading state when isLoading is true', () => {
    render(<LoginPage onLogin={mockOnLogin} isLoading={true} />)

    expect(screen.getByText(/กำลังเข้าสู่ระบบ.*Signing in/)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should display authentication error when provided', () => {
    const errorMessage = 'Invalid credentials'
    render(<LoginPage onLogin={mockOnLogin} error={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('should disable form inputs when loading', () => {
    render(<LoginPage onLogin={mockOnLogin} isLoading={true} />)

    const usernameInput = screen.getByLabelText(/ชื่อผู้ใช้.*Username/)
    const passwordInput = screen.getByLabelText(/รหัสผ่าน.*Password/)
    const submitButton = screen.getByRole('button')
    
    expect(usernameInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
    expect(submitButton).toBeDisabled()
  })

  it('should have proper accessibility attributes', () => {
    render(<LoginPage onLogin={mockOnLogin} />)

    const usernameInput = screen.getByLabelText(/ชื่อผู้ใช้.*Username/)
    const passwordInput = screen.getByLabelText(/รหัสผ่าน.*Password/)
    
    expect(usernameInput).toHaveAttribute('type', 'text')
    expect(usernameInput).toHaveAttribute('autoComplete', 'username')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('autoComplete', 'current-password')
  })

  it('should handle form submission with Enter key', async () => {
    const user = userEvent.setup()
    render(<LoginPage onLogin={mockOnLogin} />)

    const usernameInput = screen.getByLabelText(/ชื่อผู้ใช้.*Username/)
    const passwordInput = screen.getByLabelText(/รหัสผ่าน.*Password/)
    
    await user.type(usernameInput, 'testuser')
    await user.type(passwordInput, 'testpass')
    await user.keyboard('{Enter}')

    expect(mockOnLogin).toHaveBeenCalledWith('testuser', 'testpass')
  })

  it('should show proper validation styles for invalid fields', async () => {
    const user = userEvent.setup()
    render(<LoginPage onLogin={mockOnLogin} />)

    const submitButton = screen.getByRole('button', { name: /เข้าสู่ระบบ.*Sign In/ })
    
    await user.click(submitButton)

    const usernameInput = screen.getByLabelText(/ชื่อผู้ใช้.*Username/)
    const passwordInput = screen.getByLabelText(/รหัสผ่าน.*Password/)
    
    expect(usernameInput).toHaveClass('border-red-500')
    expect(passwordInput).toHaveClass('border-red-500')
  })
})