"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Search,
  MessageCircle,
  Video,
  Calendar,
  HelpCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { WeeklyCalendarView } from "./weekly-calendar-view"
import { mockProviders } from "@/lib/mock-data"

const timeSlots = [
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
]

const dates = [
  { date: 21, day: "Sat" },
  { date: 22, day: "Sun" },
  { date: 23, day: "Mon" },
  { date: 24, day: "Tue" },
  { date: 25, day: "Wed" },
  { date: 26, day: "Thu" },
  { date: 27, day: "Fri" },
]

// Transform mock data to component format
const transformProviderData = (providers: typeof mockProviders) => {
  return providers.map(provider => {
    const availability = provider.availabilities[0]
    const slots: Record<string, string> = {}
    
    // Set all time slots as unavailable by default
    timeSlots.forEach(time => {
      slots[time] = "unavailable"
    })
    
    // Mark online slots as available
    availability.online_slots.forEach(slot => {
      slots[slot] = "online"
    })
    
    // Mark offline slots as available
    availability.offline_slots.forEach(slot => {
      slots[slot] = "offline"
    })
    
    // Mark both slots as available
    availability.both_slots.forEach(slot => {
      slots[slot] = "both"
    })
    
    // Mark booked slots
    availability.online_booked_slots.forEach(slot => {
      slots[slot] = "online_booked"
    })
    
    availability.offline_booked_slots.forEach(slot => {
      slots[slot] = "offline_booked"
    })
    
    // Mark blocked slots
    availability.blocked_slots.forEach(blockedSlot => {
      slots[blockedSlot.slot] = "blocked"
    })
    
    return {
      id: provider.id,
      name: provider.name,
      avatar: provider.image,
      userType: provider.provider_usertype,
      isInhouse: provider.is_inhouse,
      clinic: provider.clinic_details.name,
      slots
    }
  })
}

const providerSchedules = transformProviderData(mockProviders)

function TimeSlot({ time, status }: { time: string; status: string }) {
  const getSlotColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500 hover:bg-green-600"
      case "offline":
        return "bg-red-500 hover:bg-red-600"
      case "both":
        return "bg-blue-500 hover:bg-blue-600"
      case "online_booked":
        return "bg-blue-800"
      case "offline_booked":
        return "bg-orange-600"
      case "blocked":
        return "bg-red-800"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <div
      className={`text-xs text-white px-2 py-1 rounded text-center cursor-pointer transition-colors ${getSlotColor(status)}`}
    >
      {time}
    </div>
  )
}

export function ProviderCalendar() {
  const [selectedDate, setSelectedDate] = useState(21)
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily")
  const [showOnlyAvailable, setShowOnlyAvailable] = useState("yes")
  const [showNewClients, setShowNewClients] = useState("yes")
  const [newClientsMode, setNewClientsMode] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)

  if (viewMode === "weekly" || selectedProvider) {
    return <WeeklyCalendarView onBack={() => {
      setViewMode("daily")
      setSelectedProvider(null)
    }} />
  }

  const handleApplyFilters = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleResetFilters = () => {
    setShowOnlyAvailable("yes")
    setShowNewClients("yes")
    setNewClientsMode("all")
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" className="p-1">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium">Provider Calendar</h1>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <Button variant={viewMode === "daily" ? "default" : "outline"} size="sm" onClick={() => setViewMode("daily")}>
            Daily
          </Button>
          <Button
            variant={viewMode === "weekly" ? "default" : "outline"} size="sm" onClick={() => setViewMode("weekly")}>
            Weekly
          </Button>
        </div>

        {/* Filter Inputs */}
        <div className="space-y-3 mb-4">
          <Input placeholder="Enter Text" />
          <Input placeholder="Enter Text" />
          <Input placeholder="Enter Text" />
        </div>

        {/* Show only available providers */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Show only available providers</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
          <RadioGroup value={showOnlyAvailable} onValueChange={setShowOnlyAvailable} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="available-yes" />
              <Label htmlFor="available-yes" className="text-sm">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="available-no" />
              <Label htmlFor="available-no" className="text-sm">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Show provider taking new clients */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Show provider taking new clients</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
          <RadioGroup value={showNewClients} onValueChange={setShowNewClients} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="new-clients-yes" />
              <Label htmlFor="new-clients-yes" className="text-sm">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="new-clients-no" />
              <Label htmlFor="new-clients-no" className="text-sm">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* New clients for */}
        <div className="mb-4">
          <div className="mb-2">
            <span className="text-sm font-medium">New clients for</span>
          </div>
          <RadioGroup value={newClientsMode} onValueChange={setNewClientsMode} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-modes" />
              <Label htmlFor="all-modes" className="text-sm">
                All Modes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online-only" />
              <Label htmlFor="online-only" className="text-sm">
                Online only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offline" id="offline-only" />
              <Label htmlFor="offline-only" className="text-sm">
                Offline only
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-2 mb-4">
          <Button variant="outline" onClick={handleResetFilters} className="flex-1 bg-transparent">
            Reset
          </Button>
          <Button onClick={handleApplyFilters} className="flex-1 bg-orange-500 hover:bg-orange-600">
            Apply
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search provider name" 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Search Results:</h3>
            <div className="space-y-2">
              {providerSchedules
                .filter(provider => 
                  provider.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((provider) => (
                  <div key={provider.id} className="p-2 bg-gray-50 rounded border">
                    <div className="font-medium text-sm">{provider.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      <span className="capitalize">{provider.userType}</span>
                      <span> • </span>
                      <span>{provider.clinic}</span>
                      <span> • </span>
                      <span className={provider.isInhouse ? "text-green-600" : "text-blue-600"}>
                        {provider.isInhouse ? "In-house" : "External"}
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}
        
        {/* Search Info */}
        <p className="text-sm text-gray-600">
          You can search up to 5 provider to view their availability specifically.
        </p>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Date Navigation */}
            <div className="flex gap-2">
              {dates.map((dateInfo) => (
                <div
                  key={dateInfo.date}
                  className={`px-3 py-2 rounded cursor-pointer text-center min-w-[50px] ${
                    selectedDate === dateInfo.date ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedDate(dateInfo.date)}
                >
                  <div className="text-xs">{dateInfo.day}</div>
                  <div className="font-medium">{dateInfo.date}</div>
                </div>
              ))}
            </div>

            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-1">Showing full schedules for Thu, 21 Sep 2024</h2>
          <p className="text-sm text-gray-600 mb-4">Showing slots in the 8 am to 12 am window.</p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Offline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Online+Offline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
              <span>Online Booked</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span>Offline Booked</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-800 rounded-full"></div>
              <span>Blocked</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Loader2 className="h-12 w-12 animate-spin mb-4 text-orange-500" />
            <p className="text-lg font-medium">Please wait...</p>
            <p className="text-sm">we're loading the slots</p>
          </div>
        ) : (
          /* Provider Schedules */
          <div className="space-y-6">
            {providerSchedules
              .filter(provider => 
                searchQuery === "" || 
                provider.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((provider) => (
              <div key={provider.id} className="border rounded-lg p-4">
                {/* Provider Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
                      <AvatarFallback>PT</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{provider.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                        <span className="capitalize">{provider.userType}</span>
                        <span>•</span>
                        <span>{provider.clinic}</span>
                        <span>•</span>
                        <span className={provider.isInhouse ? "text-green-600" : "text-blue-600"}>
                          {provider.isInhouse ? "In-house" : "External"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="link" 
                    className="text-blue-600 p-0"
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    View Calendar →
                  </Button>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-12 gap-1">
                  {timeSlots.map((time) => (
                    <TimeSlot key={time} time={time} status={provider.slots[time] || "available"} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
