export default function TaskDistributionChart() {
  const taskData = [
    { category: "Feeding", percentage: 35, color: "bg-green-500" },
    { category: "Health Checks", percentage: 25, color: "bg-blue-500" },
    { category: "Maintenance", percentage: 20, color: "bg-orange-500" },
    { category: "Cleaning", percentage: 15, color: "bg-purple-500" },
    { category: "Other", percentage: 5, color: "bg-red-500" },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-2">Task Distribution</h3>
      <p className="text-sm text-gray-600 mb-6">Breakdown of tasks by category</p>

      {/* Mock Pie Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-48 h-48 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <span className="text-sm text-gray-500">Tasks</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {taskData.map((item) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
              <span className="text-sm text-gray-700">{item.category}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
