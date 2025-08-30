// Authentication Store - Zustand store for user session management
// Story 2.4: Implement User Authentication (Login)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState } from '@logistics-crm/shared-types'

interface AuthActions {
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
  setLoading: (loading: boolean) => void
}

type AuthStore = AuthState & AuthActions

// Mock authentication function - MVP implementation
const mockAuthenticate = async (username: string, password: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // For MVP, any non-empty credentials are accepted
  if (!username.trim() || !password.trim()) {
    throw new Error('ชื่อผู้ใช้และรหัสผ่านจำเป็น / Username and password are required')
  }

  // Simulate random authentication failure (10% chance for testing)
  if (Math.random() < 0.1) {
    throw new Error('ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง / Invalid credentials')
  }

  // Create mock user based on input
  const mockUser: User = {
    id: `user-${Date.now()}`,
    email: `${username.toLowerCase()}@logistics.com`,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    role: 'dispatcher'
  }

  return mockUser
}

// Create authentication store with persistence
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (username: string, password: string) => {
        try {
          set({ isLoading: true, error: null })

          const user = await mockAuthenticate(username, password)
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null
          })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ / Authentication error occurred'
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: errorMessage
          })
          throw error
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false,
          error: null
        })
      },

      clearError: () => {
        set({ error: null })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      }
    }),
    {
      name: 'auth-storage', // localStorage key
      // Only persist essential auth state
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
)