import { CheckCircle, Home, Users, DollarSign } from "lucide-react"

const metrics = [
  {
    title: "Task Completion Rate",
    value: "92.5%",
    change: "+5.2%",
    changeType: "positive" as const,
    description: "vs last week",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  {
    title: "Active Livestock",
    value: "373",
    change: "+2.1%",
    changeType: "positive" as const,
    description: "vs last week",
    icon: Home,
    iconColor: "text-blue-500",
  },
  {
    title: "Staff Efficiency",
    value: "91.2%",
    change: "+3.8%",
    changeType: "positive" as const,
    description: "vs last week",
    icon: Users,
    iconColor: "text-purple-500",
  },
  {
    title: "Monthly Revenue",
    value: "$22.8k",
    change: "+8.4%",
    changeType: "positive" as const,
    description: "vs last week",
    icon: DollarSign,
    iconColor: "text-orange-500",
  },
]

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div key={metric.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-full bg-gray-50 ${metric.iconColor}`}>
              <metric.icon className="w-6 h-6" />
            </div>
            <div
              className={`text-sm font-medium ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
            >
              {metric.change}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
