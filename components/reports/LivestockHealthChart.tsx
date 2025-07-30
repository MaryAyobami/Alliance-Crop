export default function LivestockHealthChart() {
  const healthData = [
    { category: "Dairy Cows", healthy: 150, sick: 5, vaccinated: 145 },
    { category: "Beef Cattle", healthy: 85, sick: 3, vaccinated: 82 },
    { category: "Sheep", healthy: 78, sick: 2, vaccinated: 76 },
    { category: "Goats", healthy: 45, sick: 1, vaccinated: 44 },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-green-500 rounded mr-3"></div>
        <h3 className="font-semibold text-gray-900">Livestock Health Overview</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">Health status by livestock category</p>

      {/* Mock Bar Chart */}
      <div className="space-y-4">
        {healthData.map((item) => (
          <div key={item.category}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{item.category}</span>
              <span className="text-xs text-gray-500">Total: {item.healthy + item.sick}</span>
            </div>
            <div className="flex h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500"
                style={{ width: `${(item.healthy / (item.healthy + item.sick)) * 100}%` }}
              ></div>
              <div className="bg-red-500" style={{ width: `${(item.sick / (item.healthy + item.sick)) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
          <span>Healthy</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
          <span>Sick</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
          <span>Vaccinated</span>
        </div>
      </div>
    </div>
  )
}
