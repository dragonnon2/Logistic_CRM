// useAuth.test.ts - Hook tests for Story 2.4
// Testing authentication hook functionality and state management

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './useAuth'

// Mock the auth store
vi.mock('@/lib/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
    clearError: vi.fn(),
    setLoading: vi.fn()
  }))
}))

describe('useAuth', () => {
  const mockLogin = vi.fn()
  const mockLogout = vi.fn()
  const mockClearError = vi.fn()
  const mockSetLoading = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Reset mock implementation
    const { useAuthStore } = require('@/lib/authStore')
    useAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: mockLogin,
      logout: mockLogout,
      clearError: mockClearError,
      setLoading: mockSetLoading
    })
  })

  it('should return initial auth state', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.isLoggedIn).toBe(false)
    expect(result.current.userDisplayName).toBe('Unknown User')
  })

  it('should return authenticated state when user is logged in', () => {
    const { useAuthStore } = require('@/lib/authStore')
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'dispatcher' }
    
    useAuthStore.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      login: mockLogin,
      logout: mockLogout,
      clearError: mockClearError,
      setLoading: mockSetLoading
    })

    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.isLoggedIn).toBe(true)
    expect(result.current.userDisplayName).toBe('Test User')
  })

  it('should handle successful login', async () => {
    mockLogin.mockResolvedValue(undefined)
    
    const { result } = renderHook(() => useAuth())

    let loginResult
    await act(async () => {
      loginResult = await result.current.login('testuser', 'testpass')
    })

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpass')
    expect(loginResult).toEqual({ success: true, error: null })
  })

  it('should handle login failure', async () => {
    const errorMessage = 'Invalid credentials'
    mockLogin.mockRejectedValue(new Error(errorMessage))
    
    const { result } = renderHook(() => useAuth())

    let loginResult
    await act(async () => {
      loginResult = await result.current.login('testuser', 'wrongpass')
    })

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'wrongpass')
    expect(loginResult).toEqual({ success: false, error: errorMessage })
  })

  it('should handle logout', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.logout()
    })

    expect(mockLogout).toHaveBeenCalled()
  })

  it('should handle clear error', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.clearError()
    })

    expect(mockClearError).toHaveBeenCalled()
  })

  it('should return user email as display name when name is not available', () => {
    const { useAuthStore } = require('@/lib/authStore')
    const mockUser = { id: '1', name: '', email: 'test@example.com', role: 'dispatcher' }
    
    useAuthStore.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      login: mockLogin,
      logout: mockLogout,
      clearError: mockClearError,
      setLoading: mockSetLoading
    })

    const { result } = renderHook(() => useAuth())

    expect(result.current.userDisplayName).toBe('test@example.com')
  })

  it('should handle error state', () => {
    const { useAuthStore } = require('@/lib/authStore')
    const errorMessage = 'Network error'
    
    useAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: errorMessage,
      login: mockLogin,
      logout: mockLogout,
      clearError: mockClearError,
      setLoading: mockSetLoading
    })

    const { result } = renderHook(() => useAuth())

    expect(result.current.error).toBe(errorMessage)
  })

  it('should handle loading state', () => {
    const { useAuthStore } = require('@/lib/authStore')
    
    useAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      login: mockLogin,
      logout: mockLogout,
      clearError: mockClearError,
      setLoading: mockSetLoading
    })

    const { result } = renderHook(() => useAuth())

    expect(result.current.isLoading).toBe(true)
  })
})