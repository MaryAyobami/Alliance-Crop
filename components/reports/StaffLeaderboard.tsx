import { Users } from "lucide-react"

const staffData = [
  {
    id: "1",
    name: "John Doe",
    role: "Farmer Attendant",
    tasksCompleted: 145,
    efficiency: 94,
    avatar: "JD",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Veterinary Doctor",
    tasksCompleted: 132,
    efficiency: 96,
    avatar: "SJ",
  },
  {
    id: "3",
    name: "Mike Wilson",
    role: "Pasture Manager",
    tasksCompleted: 128,
    efficiency: 91,
    avatar: "MW",
  },
  {
    id: "4",
    name: "Emily Chen",
    role: "Farmer Attendant",
    tasksCompleted: 89,
    efficiency: 87,
    avatar: "EC",
  },
  {
    id: "5",
    name: "Tom Brown",
    role: "Farmer Attendant",
    tasksCompleted: 102,
    efficiency: 89,
    avatar: "TB",
  },
]

export default function StaffLeaderboard() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-purple-500 rounded mr-3">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">Staff Performance Leaderboard</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">Top performing staff members this month</p>

      <div className="space-y-4">
        {staffData.map((staff, index) => (
          <div key={staff.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-medium">
                #{index + 1}
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full text-sm font-medium">
                {staff.avatar}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{staff.name}</h4>
                <p className="text-sm text-green-600">{staff.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex space-x-6">
                <div>
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                  <p className="font-semibold text-gray-900">{staff.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Efficiency</p>
                  <p className="font-semibold text-gray-900">{staff.efficiency}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
