// LoginPage - User authentication interface for secure system access
// Story 2.4: Implement User Authentication (Login)

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, LogIn } from "lucide-react"

interface LoginPageProps {
  onLogin?: (username: string, password: string) => void
  isLoading?: boolean
  error?: string | null
}

export default function LoginPage({ onLogin, isLoading = false, error = null }: LoginPageProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: ''
  })

  // Form validation
  const validateForm = () => {
    const errors = {
      username: '',
      password: ''
    }

    if (!formData.username.trim()) {
      errors.username = 'กรุณากรอกชื่อผู้ใช้ / Username is required'
    }

    if (!formData.password.trim()) {
      errors.password = 'กรุณากรอกรหัสผ่าน / Password is required'
    }

    setValidationErrors(errors)
    return !errors.username && !errors.password
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (onLogin) {
      onLogin(formData.username, formData.password)
    }
  }

  // Handle input changes
  const handleInputChange = (field: 'username' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))

    // Clear validation errors when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            เข้าสู่ระบบ
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account / เข้าสู่ระบบของคุณ
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              ลงชื่อเข้าใช้
            </CardTitle>
            <CardDescription>
              Login / เข้าสู่ระบบ Logistics CRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Authentication Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  ชื่อผู้ใช้ / Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  placeholder="กรอกชื่อผู้ใช้ / Enter username"
                  className={validationErrors.username ? 'border-red-500' : ''}
                  disabled={isLoading}
                  aria-describedby={validationErrors.username ? 'username-error' : undefined}
                />
                {validationErrors.username && (
                  <p id="username-error" className="text-sm text-red-600">
                    {validationErrors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  รหัสผ่าน / Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  placeholder="กรอกรหัสผ่าน / Enter password"
                  className={validationErrors.password ? 'border-red-500' : ''}
                  disabled={isLoading}
                  aria-describedby={validationErrors.password ? 'password-error' : undefined}
                />
                {validationErrors.password && (
                  <p id="password-error" className="text-sm text-red-600">
                    {validationErrors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    กำลังเข้าสู่ระบบ... / Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    เข้าสู่ระบบ / Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* MVP Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>MVP Demo - Any username/password combination will work</p>
          <p>เวอร์ชัน MVP - ใช้ชื่อผู้ใช้และรหัสผ่านใดก็ได้</p>
        </div>
      </div>
    </div>
  )
}