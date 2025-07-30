"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  // Optional: Basic validation
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match")
    setIsLoading(false)
    return
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.fullName,
        email: formData.email,
        phonenumber: formData.phone,
        role: formData.role,
        password: formData.password,
      }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Signup failed")
    // Handle success (e.g., redirect, show message)
    window.location.href = "/auth/signin" // Redirect to sign in page after successful signup
  } catch (error) {
    console.error("Sign up error:", error)
    alert("Sign up failed: " + error)
  } finally {
    setIsLoading(false)
  }
}
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative z-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Join Alliance CropCraft</h1>
        <p className="text-green-600">Create your account to manage livestock operations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your company email address"
            className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <Label htmlFor="role" className="text-gray-700">
            Role
          </Label>
          <Select onValueChange={(value) => handleInputChange("role", value)}>
            <SelectTrigger className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="farm_attendant">Farm Attendant</SelectItem>
              <SelectItem value="veterinarian">Veterinarian</SelectItem>
              <SelectItem value="pasture_manager">Pasture Manager</SelectItem>
              <SelectItem value="farm_manager">Farm Manager</SelectItem>
              <SelectItem value="maintenance_officer">Maintenance Officer</SelectItem>
              <SelectItem value="field_production_officer">Field Production Officer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Create a password"
            className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-gray-700">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            placeholder="Confirm your password"
            className="mt-1 bg-green-50 border-green-200 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm text-gray-600">
            Accept Terms and Conditions
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !formData.acceptTerms}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-green-600 hover:text-green-700 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
