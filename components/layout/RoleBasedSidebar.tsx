"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/contexts/AuthContext"
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Users,
  UserPlus,
  Settings,
  X,
  Stethoscope,
  TreePine,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  userRole: UserRole
}

const getNavigationForRole = (role: UserRole) => {
  const baseNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ]

  switch (role) {
    case "admin":
      return [
        ...baseNavigation,
        { name: "Manage Users", href: "/users", icon: Users },
        { name: "Add User", href: "/users/add", icon: UserPlus },
        { name: "Settings", href: "/settings", icon: Settings },
      ]
    case "veterinary-doctor":
      return [...baseNavigation, { name: "Health Records", href: "/health", icon: Stethoscope }]
    case "pasture-manager":
      return [...baseNavigation, { name: "Pasture Management", href: "/pastures", icon: TreePine }]
    default:
      return baseNavigation
  }
}

export default function RoleBasedSidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname()
  const navigation = getNavigationForRole(userRole)

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Alliance CropCraft</h1>
              <p className="text-xs text-green-600">Livestock Management</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100",
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}
