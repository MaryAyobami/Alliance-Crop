"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import RoleBasedSidebar from "./RoleBasedSidebar"
import RoleBasedHeader from "./RoleBasedHeader"

interface RoleBasedLayoutProps {
  children: React.ReactNode
}

export default function RoleBasedLayout({ children }: RoleBasedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleBasedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoleBasedHeader onMenuClick={() => setSidebarOpen(true)} user={user} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
