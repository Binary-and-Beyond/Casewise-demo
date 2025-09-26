"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/signup-form"
import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { Dashboard } from "@/components/dashboard"

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<"login" | "signup" | "forgot" | "dashboard">("login")

  const handleLoginSuccess = () => {
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setCurrentView("login")
  }

  if (currentView === "dashboard") {
    return <Dashboard onLogout={handleLogout} />
  }

  if (currentView === "forgot") {
    return <ForgotPasswordForm onBackToLoginClick={() => setCurrentView("login")} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentView === "login" && (
          <LoginForm
            onSignUpClick={() => setCurrentView("signup")}
            onForgotPasswordClick={() => setCurrentView("forgot")}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {currentView === "signup" && <SignUpForm onLoginClick={() => setCurrentView("login")} />}
      </div>
    </div>
  )
}
