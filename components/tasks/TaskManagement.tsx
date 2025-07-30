"use client"

import { useState } from "react"
import { Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TaskCard from "./TaskCard"

interface Task {
  id: string
  title: string
  description: string
  time: string
  priority: "high" | "medium" | "low"
  assignedTo: string
  completed: boolean
  hasEvidence?: boolean
  evidenceFile?: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Feed Cattle - Pasture A",
    description: "Provide morning feed to all cattle in Pasture A. Check water levels.",
    time: "6:00 AM",
    priority: "high",
    assignedTo: "John Doe",
    completed: true,
    hasEvidence: true,
    evidenceFile: "photo_evidence_1.jpg",
  },
  {
    id: "2",
    title: "Health Check - Dairy Cows",
    description: "Perform routine health inspection on dairy cows. Record any observations.",
    time: "7:30 AM",
    priority: "high",
    assignedTo: "John Doe",
    completed: false,
  },
  {
    id: "3",
    title: "Clean Water Troughs",
    description: "Clean and refill all water troughs in sections A, B, and C.",
    time: "8:00 AM",
    priority: "medium",
    assignedTo: "John Doe",
    completed: false,
  },
  {
    id: "4",
    title: "Pasture Rotation - Section B",
    description: "Move livestock from Section B to Section C for pasture rotation.",
    time: "2:00 PM",
    priority: "medium",
    assignedTo: "John Doe",
    completed: false,
  },
]

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

  const handleTaskComplete = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const handleUploadPhoto = (taskId: string) => {
    // TODO: Implement photo upload
    console.log("Upload photo for task:", taskId)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Manage and track livestock care tasks</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Filter className="w-4 h-4" />
            <span>All Tasks</span>
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        {(["all", "pending", "completed"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`pb-2 px-1 border-b-2 font-medium text-sm capitalize ${
              filter === filterOption
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={handleTaskComplete} onUploadPhoto={handleUploadPhoto} />
        ))}
      </div>
    </div>
  )
}
