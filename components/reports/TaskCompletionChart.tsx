export default function TaskCompletionChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-blue-500 rounded mr-3"></div>
        <h3 className="font-semibold text-gray-900">Task Completion Trend</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">Daily task completion rates over the past week</p>

      {/* Mock Chart Area */}
      <div className="h-64 bg-gradient-to-t from-green-100 to-blue-100 rounded-lg flex items-end justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-sm">Chart visualization would go here</p>
        </div>
        <div className="flex justify-between w-full px-4 pb-2 text-xs text-gray-500">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  )
}
