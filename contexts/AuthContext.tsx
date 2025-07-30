"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "farmer-attendant" | "pasture-manager" | "veterinary-doctor"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  status: "active" | "inactive"
  lastLogin?: string
  createdAt: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Check for existing session
    const checkAuth = async () => {
      try {
        // Simulate checking for existing session
        const savedUser = localStorage.getItem("currentUser")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual login API call
      console.log("Login attempt:", { email, password })

      // Mock user data based on email
      const mockUser: User = {
        id: "1",
        name: email.includes("admin") ? "Admin User" : "John Doe",
        email,
        phone: "+1234567890",
        role: email.includes("admin") ? "admin" : "farmer-attendant",
        status: "active",
        lastLogin: new Date().toISOString(),
        createdAt: "2024-01-15",
        avatar: email.includes("admin") ? "AU" : "JD",
      }

      setUser(mockUser)
      localStorage.setItem("currentUser", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
