"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Users } from "lucide-react"
import Link from "next/link"

interface UserFormData {
  fullName: string
  email: string
  phone: string
  role: string
}

export default function AddUserForm() {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    email: "",
    phone: "",
    role: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement user creation API call
      console.log("Creating user:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // TODO: Show success message and redirect
      alert("User created successfully!")
    } catch (error) {
      console.error("Error creating user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      role: "",
    })
  }

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
          <p className="text-gray-600">Create a new user account for farm staff</p>
        </div>
        <Link href="/users">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Users className="w-4 h-4" />
            <span>View All Users</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="w-5 h-5 bg-green-500 rounded mr-3">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">User Information</h2>
            <p className="text-sm text-gray-600">Enter the details for the new user account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName" className="text-gray-700">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter full name"
                className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-gray-700">
                Role *
              </Label>
              <Select onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer-attendant">Farmer Attendant</SelectItem>
                  <SelectItem value="veterinary-doctor">Veterinary Doctor</SelectItem>
                  <SelectItem value="pasture-manager">Pasture Manager</SelectItem>
                  <SelectItem value="follower">Follower</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Send Login Credentials Section */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Mail className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-medium text-green-800">Send Login Credentials</h3>
            </div>
            <p className="text-sm text-green-700">Auto-generated password will be sent to the user's email address</p>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white px-6">
              {isLoading ? "Creating User..." : "Create User"}
            </Button>
            <Button type="button" variant="outline" onClick={handleClearForm} className="px-6 bg-transparent">
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
