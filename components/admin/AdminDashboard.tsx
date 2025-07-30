"use client"

import { useEffect, useState } from "react"
import AdminMetricCard from "./AdminMetricCard"
import AdminTaskSchedule from "./AdminTaskSchedule"
import { TrendingUp, Users, Calendar } from "lucide-react"

interface AdminDashboardData {
  completionRate: number
  activeStaff: number
  weeklyTasks: number
  pendingTasks: number
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminDashboardData>({
    completionRate: 25,
    activeStaff: 12,
    weeklyTasks: 28,
    pendingTasks: 6,
  })

  useEffect(() => {
    // TODO: Fetch admin dashboard data from API
    const fetchAdminData = async () => {
      try {
        console.log("Fetching admin dashboard data...")
        // Simulate API call
      } catch (error) {
        console.error("Error fetching admin data:", error)
      }
    }

    fetchAdminData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-green-500 text-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Admin User!</h1>
            <p className="text-green-100">You have {data.pendingTasks} pending tasks today</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">2/8</div>
            <div className="text-green-100">Tasks Completed</div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminMetricCard
          title="Completion Rate"
          value={`${data.completionRate}%`}
          icon={TrendingUp}
          iconColor="text-blue-500"
        />
        <AdminMetricCard
          title="Active Staff"
          value={data.activeStaff.toString()}
          icon={Users}
          iconColor="text-purple-500"
        />
        <AdminMetricCard
          title="This Week"
          value={`${data.weeklyTasks} Tasks`}
          icon={Calendar}
          iconColor="text-orange-500"
        />
      </div>

      {/* Today's Schedule */}
      <AdminTaskSchedule />
    </div>
  )
}
