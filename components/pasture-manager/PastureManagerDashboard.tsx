"use client"

import { TreePine, MapPin, Droplets } from "lucide-react"
import MetricCard from "../dashboard/MetricCard"

export default function PastureManagerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-green-500 text-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Pasture Manager!</h1>
            <p className="text-green-100">3 pasture rotations scheduled today</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">4/6</div>
            <div className="text-green-100">Sections Active</div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Active Pastures" value="4" icon={TreePine} iconColor="text-green-500" />
        <MetricCard title="Rotation Due" value="2" icon={MapPin} iconColor="text-orange-500" />
        <MetricCard title="Water Sources" value="8" icon={Droplets} iconColor="text-blue-500" />
      </div>

      {/* Pasture Status */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Pasture Management Overview</h2>
        <p className="text-gray-600">Pasture management features coming soon...</p>
      </div>
    </div>
  )
}
