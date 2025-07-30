"use client"

import { useState, useEffect } from "react"
import { Search, Download, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
  createdAt: string
  avatar: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@cropcraft.com",
    phone: "+1234567890",
    role: "Farmer Attendant",
    status: "active",
    lastLogin: "2024-01-28 09:30 AM",
    createdAt: "2024-01-15",
    avatar: "JD",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@cropcraft.com",
    phone: "+1234567891",
    role: "Veterinary Doctor",
    status: "active",
    lastLogin: "2024-01-28 08:15 AM",
    createdAt: "2024-01-20",
    avatar: "SJ",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.wilson@cropcraft.com",
    phone: "+1234567892",
    role: "Pasture Manager",
    status: "active",
    lastLogin: "2024-01-27 06:45 PM",
    createdAt: "2024-01-25",
    avatar: "MW",
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily.chen@cropcraft.com",
    phone: "+1234567893",
    role: "Follower",
    status: "inactive",
    lastLogin: "2024-01-25 02:20 PM",
    createdAt: "2024-01-10",
    avatar: "EC",
  },
]

const roleColors = {
  "Farmer Attendant": "text-green-600",
  "Veterinary Doctor": "text-red-600",
  "Pasture Manager": "text-blue-600",
  Follower: "text-gray-600",
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  useEffect(() => {
    // TODO: Fetch users from API
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...")
        // API call would go here
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleDeleteUser = async (userId: string) => {
    // TODO: Implement user deletion
    console.log("Delete user:", userId)
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleExport = () => {
    // TODO: Implement user export
    console.log("Export users")
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage farm staff and user accounts</p>
        </div>
        <Link href="/users/add">
          <Button className="bg-green-500 hover:bg-green-600 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add New User</span>
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Farmer Attendant">Farmer Attendant</SelectItem>
            <SelectItem value="Veterinary Doctor">Veterinary Doctor</SelectItem>
            <SelectItem value="Pasture Manager">Pasture Manager</SelectItem>
            <SelectItem value="Follower">Follower</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleExport} className="flex items-center space-x-2 bg-transparent">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Users ({filteredUsers.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.avatar}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${roleColors[user.role as keyof typeof roleColors]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
