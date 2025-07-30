"use client"

import { useState } from "react"
import { Calendar, Download, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import MetricsGrid from "./MetricsGrid"
import TaskCompletionChart from "./TaskCompletionChart"
import TaskDistributionChart from "./TaskDistributionChart"
import LivestockHealthChart from "./LivestockHealthChart"
import ProductivityChart from "./ProductivityChart"
import StaffLeaderboard from "./StaffLeaderboard"
import AIInsights from "./AIInsights"

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState("Last 7 days")

  const handleExportReport = () => {
    // TODO: Implement report export
    console.log("Export report")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into farm operations and performance</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            <span>{dateRange}</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <TrendingUp className="w-4 h-4" />
            <span>Overview</span>
          </Button>
          <Button onClick={handleExportReport} className="bg-green-500 hover:bg-green-600 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <MetricsGrid />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskCompletionChart />
        <TaskDistributionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LivestockHealthChart />
        <ProductivityChart />
      </div>

      {/* Staff Performance */}
      <StaffLeaderboard />

      {/* AI Insights */}
      <AIInsights />
    </div>
  )
}
