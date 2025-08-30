import { useEffect } from 'react'
import Dashboard from '@/pages/Dashboard'
import LoginPage from '@/pages/LoginPage'
import { useAuth } from '@/hooks/useAuth'

// Test import of dummy data (Story 1.2)  
import { dummyOrders, dummyTrucks } from '@/data/dummies'

function App() {
  const { isAuthenticated, isLoading, login, error, clearError } = useAuth()

  // Clear any auth errors on mount
  useEffect(() => {
    clearError()
  }, [clearError])

  // Handle login submission from LoginPage
  const handleLogin = async (username: string, password: string) => {
    const result = await login(username, password)
    // Login result handling is managed by the auth store
    return result
  }

  // Show loading screen during initial authentication check
  if (isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">กำลังโหลด... / Loading...</p>
        </div>
      </div>
    )
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    )
  }

  // Show dashboard if authenticated
  // For development, show both dashboard and verification info
  const showTestMode = import.meta.env.DEV;

  if (!showTestMode) {
    return <Dashboard />
  }

  return (
    <div className="space-y-8">
      {/* Main Dashboard (Story 1.3) */}
      <Dashboard />
      
      {/* Development/Testing Information */}
      <div className="border-t pt-8">
        <div className="container mx-auto px-6">
          <div className="bg-muted/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🧪 Development Mode - Story Implementation Status</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">✅ Completed Stories:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Story 1.1: Project Setup ✅</li>
                  <li>• Story 1.2: Dummy Data & Types ✅ (Orders: {dummyOrders.length}, Trucks: {dummyTrucks.length})</li>
                  <li>• Story 1.3: Dashboard Layout ✅</li>
                  <li>• Story 1.4: Display Real Data ✅</li>
                  <li>• Story 2.1: Detailed Trip View ✅</li>
                  <li>• Story 2.2: Interactive Action Buttons ✅</li>
                  <li>• Story 2.3: Map Integration ✅</li>
                  <li>• Story 2.4: User Authentication ✅</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">🔐 Authentication Status:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Status: Authenticated ✅</li>
                  <li>• MVP Mode: Mock Authentication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
