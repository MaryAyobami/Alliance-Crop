"use client"

import { useAuth } from "@/contexts/AuthContext"
import RoleBasedLayout from "@/components/layout/RoleBasedLayout"
import AdminDashboard from "@/components/admin/AdminDashboard"
import FarmerDashboard from "@/components/farmer/FarmerDashboard"
import PastureManagerDashboard from "@/components/pasture-manager/PastureManagerDashboard"
import VeterinaryDashboard from "@/components/veterinary/VeterinaryDashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard />
      case "farmer-attendant":
        return <FarmerDashboard />
      case "pasture-manager":
        return <PastureManagerDashboard />
      case "veterinary-doctor":
        return <VeterinaryDashboard />
      default:
        return <FarmerDashboard />
    }
  }

  return <RoleBasedLayout>{renderDashboard()}</RoleBasedLayout>
}
