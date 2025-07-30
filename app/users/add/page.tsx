"use client"

import { useAuth } from "@/contexts/AuthContext"
import RoleBasedLayout from "@/components/layout/RoleBasedLayout"
import AddUserForm from "@/components/admin/AddUserForm"
import { redirect } from "next/navigation"

export default function AddUserPage() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <RoleBasedLayout>
      <AddUserForm />
    </RoleBasedLayout>
  )
}
