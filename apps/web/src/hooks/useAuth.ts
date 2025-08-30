// useAuth Hook - Custom hook for authentication management
// Story 2.4: Implement User Authentication (Login)

import { useCallback } from 'react'
import { useAuthStore } from '@/lib/authStore'

/**
 * Custom hook for authentication management
 * Provides auth state and actions for components
 */
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
    setLoading
  } = useAuthStore()

  // Wrapped login function with error handling
  const handleLogin = useCallback(async (username: string, password: string) => {
    try {
      await login(username, password)
      return { success: true, error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
      return { success: false, error: errorMessage }
    }
  }, [login])

  // Wrapped logout function
  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login: handleLogin,
    logout: handleLogout,
    clearError,
    setLoading,
    
    // Computed values
    isLoggedIn: isAuthenticated && user !== null,
    userDisplayName: user?.name || user?.email || 'Unknown User'
  }
}