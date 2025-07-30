"use client"

import { CheckCircle, Clock } from "lucide-react"

interface Task {
  id: string
  title: string
  time: string
  completed: boolean
  priority: "high" | "medium" | "low"
  assignedTo: string
}

const mockTasks = {
  morning: [
    {
      id: "1",
      title: "Feed Cattle - Pasture A",
      time: "6:00 AM",
      completed: true,
      priority: "high" as const,
      assignedTo: "John Doe",
    },
    {
      id: "2",
      title: "Health Check - Dairy Cows",
      time: "7:30 AM",
      completed: true,
      priority: "high" as const,
      assignedTo: "Sarah Johnson",
    },
    {
      id: "3",
      title: "Clean Water Troughs",
      time: "8:00 AM",
      completed: false,
      priority: "medium" as const,
      assignedTo: "Mike Wilson",
    },
  ],
  afternoon: [
    {
      id: "4",
      title: "Pasture Rotation - Section B",
      time: "2:00 PM",
      completed: false,
      priority: "medium" as const,
      assignedTo: "Mike Wilson",
    },
    {
      id: "5",
      title: "Medication Administration",
      time: "3:30 PM",
      completed: false,
      priority: "high" as const,
      assignedTo: "Sarah Johnson",
    },
    {
      id: "6",
      title: "Equipment Maintenance",
      time: "4:00 PM",
      completed: false,
      priority: "low" as const,
      assignedTo: "Tom Brown",
    },
  ],
  evening: [
    {
      id: "7",
      title: "Final Feed - All Livestock",
      time: "6:00 PM",
      completed: false,
      priority: "high" as const,
      assignedTo: "John Doe",
    },
    {
      id: "8",
      title: "Secure Perimeter Gates",
      time: "7:30 PM",
      completed: false,
      priority: "medium" as const,
      assignedTo: "Emily Chen",
    },
  ],
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

const timeColors = {
  morning: "text-yellow-500",
  afternoon: "text-orange-500",
  evening: "text-purple-500",
}

export default function AdminTaskSchedule() {
  const handleTaskToggle = (taskId: string) => {
    // TODO: Implement admin task oversight
    console.log("Admin viewing task:", taskId)
  }

  const renderTaskList = (tasks: Task[], period: keyof typeof timeColors) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${timeColors[period]} bg-opacity-20`}>
          <Clock className={`w-4 h-4 ${timeColors[period]}`} />
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900 capitalize">{period} Tasks</h3>
          <p className="text-sm text-gray-600">
            {tasks.filter((t) => t.completed).length} of {tasks.length} completed
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                task.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300"
              }`}
            >
              {task.completed && <CheckCircle className="w-3 h-3" />}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                {task.title}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{task.time}</span>
                <span>•</span>
                <span>Assigned to: {task.assignedTo}</span>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">{"Today's Schedule Overview"}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderTaskList(mockTasks.morning, "morning")}
        {renderTaskList(mockTasks.afternoon, "afternoon")}
        {renderTaskList(mockTasks.evening, "evening")}
      </div>
    </div>
  )
}
