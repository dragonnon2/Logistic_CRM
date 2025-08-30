import Dashboard from '@/pages/Dashboard'

// Test import of dummy data (Story 1.2)  
import { dummyOrders, dummyTrucks } from '@/data/dummies'

function App() {
  // For production, this would be the main Dashboard
  // For development/testing, show both dashboard and verification info
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
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">⏳ Next Story:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Story 1.4: Display Real Data</li>
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
