"use client"

import { CheckCircle, Clock, Upload, User, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface TaskCardProps {
  task: Task
  onComplete: (taskId: string) => void
  onUploadPhoto: (taskId: string) => void
}

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

export default function TaskCard({ task, onComplete, onUploadPhoto }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onComplete(task.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              task.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-500"
            }`}
          >
            {task.completed && <CheckCircle className="w-4 h-4" />}
          </button>
          <div>
            <h3 className={`font-semibold ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {task.time}
              </div>
            </div>
          </div>
        </div>
        {task.hasEvidence && (
          <div className="flex items-center text-green-600 text-sm">
            <Camera className="w-4 h-4 mr-1" />
            Evidence
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4">{task.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-4 h-4 mr-1" />
          Assigned to: {task.assignedTo}
        </div>
        <div className="flex space-x-2">
          {task.completed ? (
            <span className="text-green-600 text-sm font-medium">Completed at 6:15 AM</span>
          ) : (
            <>
              <Button onClick={() => onComplete(task.id)} size="sm" className="bg-green-500 hover:bg-green-600">
                Mark Complete
              </Button>
              <Button
                onClick={() => onUploadPhoto(task.id)}
                size="sm"
                variant="outline"
                className="flex items-center space-x-1"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {task.hasEvidence && task.evidenceFile && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center text-sm text-green-700">
            <Camera className="w-4 h-4 mr-2" />
            Photo evidence uploaded: {task.evidenceFile}
          </div>
        </div>
      )}
    </div>
  )
}
