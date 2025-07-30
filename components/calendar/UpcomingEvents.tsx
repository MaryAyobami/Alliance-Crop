import { Calendar } from "lucide-react"

const upcomingEvents = [
  {
    id: "1",
    title: "Feed Cattle - Evening",
    date: "1/28/2025",
    time: "18:00",
    priority: "high" as const,
  },
  {
    id: "2",
    title: "Veterinary Checkup",
    date: "1/29/2025",
    time: "09:00",
    assignedTo: "Sarah Johnson",
    priority: "high" as const,
  },
  {
    id: "3",
    title: "Equipment Maintenance",
    date: "1/30/2025",
    time: "14:00",
    assignedTo: "Mike Wilson",
    priority: "medium" as const,
  },
  {
    id: "4",
    title: "Pasture Rotation",
    date: "1/31/2025",
    time: "10:00",
    assignedTo: "Mike Wilson",
    priority: "medium" as const,
  },
]

const priorityColors = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
}

export default function UpcomingEvents() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Upcoming Events</h3>
      <p className="text-sm text-gray-600 mb-4">Next 5 scheduled events</p>

      <div className="space-y-3">
        {upcomingEvents.map((event) => (
          <div key={event.id} className={`p-3 border-l-4 bg-gray-50 rounded-r-lg ${priorityColors[event.priority]}`}>
            <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <Calendar className="w-3 h-3 mr-1" />
              {event.date} at {event.time}
            </div>
            {event.assignedTo && <div className="text-xs text-gray-600 mt-1">Assigned to {event.assignedTo}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
