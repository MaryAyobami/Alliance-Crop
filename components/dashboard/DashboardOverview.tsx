"use client"

import { useEffect, useState } from "react"
import MetricCard from "./MetricCard"
import TaskSchedule from "./TaskSchedule"
import { TrendingUp, Users, Calendar } from "lucide-react"

interface DashboardData {
  completionRate: number
  activeStaff: number
  weeklyTasks: number
  pendingTasks: number
}

export default function DashboardOverview() {
  const [data, setData] = useState<DashboardData>({
    completionRate: 25,
    activeStaff: 12,
    weeklyTasks: 28,
    pendingTasks: 6,
  })

  useEffect(() => {
    // TODO: Fetch dashboard data from API
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        console.log("Fetching dashboard data...")
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-green-500 text-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Good morning, John Doe!</h1>
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
        <MetricCard
          title="Completion Rate"
          value={`${data.completionRate}%`}
          icon={TrendingUp}
          iconColor="text-blue-500"
        />
        <MetricCard title="Active Staff" value={data.activeStaff.toString()} icon={Users} iconColor="text-purple-500" />
        <MetricCard title="This Week" value={`${data.weeklyTasks} Tasks`} icon={Calendar} iconColor="text-orange-500" />
      </div>

      {/* Today's Schedule */}
      <TaskSchedule />
    </div>
  )
}
