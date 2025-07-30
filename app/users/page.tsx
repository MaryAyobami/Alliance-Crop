"use client"

import { useAuth } from "@/contexts/AuthContext"
import RoleBasedLayout from "@/components/layout/RoleBasedLayout"
import UserManagement from "@/components/admin/UserManagement"
import { redirect } from "next/navigation"

export default function UsersPage() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <RoleBasedLayout>
      <UserManagement />
    </RoleBasedLayout>
  )
}
