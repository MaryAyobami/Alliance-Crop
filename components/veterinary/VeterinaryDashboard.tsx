"use client"

import { Stethoscope, Heart, AlertTriangle } from "lucide-react"
import MetricCard from "../dashboard/MetricCard"

export default function VeterinaryDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-green-500 text-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Dr. Johnson!</h1>
            <p className="text-green-100">5 health checks scheduled today</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">12/15</div>
            <div className="text-green-100">Animals Checked</div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Health Checks" value="12" icon={Stethoscope} iconColor="text-blue-500" />
        <MetricCard title="Healthy Animals" value="98%" icon={Heart} iconColor="text-green-500" />
        <MetricCard title="Alerts" value="2" icon={AlertTriangle} iconColor="text-red-500" />
      </div>

      {/* Health Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Animal Health Overview</h2>
        <p className="text-gray-600">Veterinary dashboard features coming soon...</p>
      </div>
    </div>
  )
}
