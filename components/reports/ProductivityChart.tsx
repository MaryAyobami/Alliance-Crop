export default function ProductivityChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-blue-500 rounded mr-3"></div>
        <h3 className="font-semibold text-gray-900">Monthly Productivity Trends</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">Task efficiency and revenue over time</p>

      {/* Mock Line Chart */}
      <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-between px-4 pb-4 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-sm">Productivity trends chart</p>
        </div>
        <div className="flex justify-between w-full text-xs text-gray-500 absolute bottom-2 left-4 right-4">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
          <span>Efficiency %</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
          <span>Livestock Count</span>
        </div>
      </div>
    </div>
  )
}
