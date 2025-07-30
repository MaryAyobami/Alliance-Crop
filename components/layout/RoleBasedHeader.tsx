"use client"

import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { User as UserType } from "@/contexts/AuthContext"
import { useAuth } from "@/contexts/AuthContext"

interface HeaderProps {
  onMenuClick: () => void
  user: UserType
}

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case "admin":
      return "Farmer Admin"
    case "farmer-attendant":
      return "Farmer Attendant"
    case "pasture-manager":
      return "Pasture Manager"
    case "veterinary-doctor":
      return "Veterinary Doctor"
    default:
      return "User"
  }
}

export default function RoleBasedHeader({ onMenuClick, user }: HeaderProps) {
  const { logout } = useAuth()

  const handleSignOut = () => {
    logout()
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user.avatar}</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user.role === "admin" ? "Admin User" : user.name}
                  </p>
                  <p className="text-xs text-green-600">{getRoleDisplayName(user.role)}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
