"use client"

import { useAuth } from "@/contexts/AuthContext"
import RoleBasedLayout from "@/components/layout/RoleBasedLayout"
import AdminSettings from "@/components/admin/AdminSettings"

export default function SettingsPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <RoleBasedLayout>
      <AdminSettings />
    </RoleBasedLayout>
  )
}
