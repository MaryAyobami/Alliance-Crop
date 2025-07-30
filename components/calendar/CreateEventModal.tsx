"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    type: "",
    priority: "",
    location: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement event creation
    console.log("Create event:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Create New Event</h2>
            <p className="text-sm text-green-600">Schedule a new task or event on the calendar</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Event title"
              className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-gray-700">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-gray-700">
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Event description"
              className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type" className="text-gray-700">
                Type
              </Label>
              <Select onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="health-check">Health Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority" className="text-gray-700">
                Priority
              </Label>
              <Select onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="text-gray-700">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Event location"
              className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
              Create Event
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
