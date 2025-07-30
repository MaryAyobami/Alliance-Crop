"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth"
import type { Database } from "@/lib/database.types"

export type UserRole = Database['public']['Enums']['user_role']

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
  const { 
    user: supabaseUser, 
    profile, 
    loading, 
    signIn, 
    signOut 
  } = useSupabaseAuth()

  // Transform Supabase user and profile into the expected User format
  const user: User | null = supabaseUser && profile ? {
    id: supabaseUser.id,
    name: profile.full_name,
    email: supabaseUser.email || '',
    phone: profile.phone || '',
    role: profile.role,
    status: profile.status as "active" | "inactive",
    lastLogin: profile.last_login || undefined,
    createdAt: profile.created_at,
    avatar: profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
  } : null

  const login = async (email: string, password: string) => {
    try {
      const { error } = await signIn(email, password)
      if (error) throw error
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = () => {
    signOut()
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading: loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
