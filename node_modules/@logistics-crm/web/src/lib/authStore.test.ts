// authStore.test.ts - Store tests for Story 2.4
// Testing Zustand authentication store functionality

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthStore } from './authStore'

// Mock localStorage for persist middleware
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('authStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset store state
    useAuthStore.getState().logout()
  })

  it('should have initial state', () => {
    const state = useAuthStore.getState()
    
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should handle successful login', async () => {
    const store = useAuthStore.getState()
    
    await store.login('testuser', 'testpass')
    
    const state = useAuthStore.getState()
    expect(state.user).toBeDefined()
    expect(state.user?.name).toBe('Testuser')
    expect(state.user?.email).toBe('testuser@logistics.com')
    expect(state.user?.role).toBe('dispatcher')
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should handle login with empty credentials', async () => {
    const store = useAuthStore.getState()
    
    await expect(store.login('', 'testpass')).rejects.toThrow()
    
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.error).toContain('Username and password are required')
  })

  it('should handle logout', () => {
    const store = useAuthStore.getState()
    
    // First login
    store.login('testuser', 'testpass')
    
    // Then logout
    store.logout()
    
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should handle clearError', async () => {
    const store = useAuthStore.getState()
    
    // Create an error
    try {
      await store.login('', '')
    } catch (error) {
      // Expected error
    }
    
    expect(useAuthStore.getState().error).toBeTruthy()
    
    // Clear error
    store.clearError()
    
    expect(useAuthStore.getState().error).toBeNull()
  })

  it('should handle setLoading', () => {
    const store = useAuthStore.getState()
    
    store.setLoading(true)
    expect(useAuthStore.getState().isLoading).toBe(true)
    
    store.setLoading(false)
    expect(useAuthStore.getState().isLoading).toBe(false)
  })

  it('should create unique user IDs', async () => {
    const store = useAuthStore.getState()
    
    await store.login('user1', 'pass1')
    const user1 = useAuthStore.getState().user
    
    store.logout()
    
    // Wait a bit to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 1))
    
    await store.login('user2', 'pass2')
    const user2 = useAuthStore.getState().user
    
    expect(user1?.id).not.toBe(user2?.id)
  })

  it('should handle network simulation delay', async () => {
    const store = useAuthStore.getState()
    
    const startTime = Date.now()
    await store.login('testuser', 'testpass')
    const endTime = Date.now()
    
    // Should take at least 1000ms due to mock delay
    expect(endTime - startTime).toBeGreaterThanOrEqual(1000)
  })

  it('should set loading state during login', async () => {
    const store = useAuthStore.getState()
    
    // Start login (don't await)
    const loginPromise = store.login('testuser', 'testpass')
    
    // Check loading state immediately
    expect(useAuthStore.getState().isLoading).toBe(true)
    
    // Wait for completion
    await loginPromise
    
    // Loading should be false after completion
    expect(useAuthStore.getState().isLoading).toBe(false)
  })

  it('should handle random authentication failure simulation', async () => {
    const store = useAuthStore.getState()
    
    // Mock Math.random to always return a value that triggers failure
    const originalRandom = Math.random
    Math.random = vi.fn(() => 0.05) // Less than 0.1, should trigger failure
    
    try {
      await store.login('testuser', 'testpass')
      // Should not reach here
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(useAuthStore.getState().error).toContain('Invalid credentials')
    } finally {
      Math.random = originalRandom
    }
  })
})