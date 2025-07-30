import { Brain, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"

const insights = [
  {
    type: "highlight",
    icon: TrendingUp,
    title: "Performance Highlight",
    description: "Task completion rate has improved by 5.2% this week. Sarah Johnson leads with 96% efficiency.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    type: "opportunity",
    icon: Lightbulb,
    title: "Growth Opportunity",
    description: "Revenue is up 8.4% this month. Consider expanding dairy operations during peak season.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    type: "attention",
    icon: AlertTriangle,
    title: "Attention Required",
    description: "Livestock health checks are 12% behind schedule. Consider reassigning veterinary tasks.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    type: "optimization",
    icon: Brain,
    title: "Optimization Tip",
    description: "Morning feeding tasks show highest completion rates. Schedule critical tasks for 6-9 AM.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
]

export default function AIInsights() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-green-500 rounded mr-3">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">AI Insights & Recommendations</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className={`p-4 rounded-lg border ${insight.bgColor} ${insight.borderColor}`}>
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${insight.color} bg-white`}>
                <insight.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${insight.color} mb-1`}>{insight.title}</h4>
                <p className="text-sm text-gray-700">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
