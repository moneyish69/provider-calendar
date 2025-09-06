"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowLeft, Video, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const weekDays = [
  { date: 16, day: "Sun" },
  { date: 17, day: "Mon" },
  { date: 18, day: "Tue" },
  { date: 19, day: "Wed" },
  { date: 20, day: "Thu" },
  { date: 21, day: "Fri" },
  { date: 22, day: "Sat" },
]

const timeSlots = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
]

const mockEvents = [
  {
    id: "#24217",
    title: "MDT Meeting",
    day: 1, // Monday
    startTime: 1, // 01:00 AM
    duration: 1,
    color: "bg-purple-500",
    hasVideo: true,
  },
  {
    id: "#24217",
    title: "Google Calendar Ev...",
    day: 3, // Wednesday
    startTime: 4, // 04:00 AM
    duration: 2,
    color: "bg-blue-600",
    hasVideo: true,
  },
  {
    id: "#24217",
    title: "Google Calendar Ev...",
    day: 3, // Wednesday
    startTime: 5, // 05:00 AM
    duration: 1,
    color: "bg-green-700",
    hasVideo: false,
  },
  {
    id: "#24217",
    title: "Unwell",
    day: 3, // Wednesday
    startTime: 6, // 06:00 AM
    duration: 3,
    color: "bg-green-200",
    pattern: "diagonal-stripes",
    hasVideo: false,
  },
  {
    id: "#24217",
    title: "",
    day: 4, // Thursday
    startTime: 3, // 03:00 AM
    duration: 1,
    color: "bg-brown-600",
    hasVideo: true,
  },
  {
    id: "#24217",
    title: "",
    day: 4, // Thursday
    startTime: 6, // 06:00 AM
    duration: 1,
    color: "bg-blue-500",
    hasVideo: true,
  },
  {
    id: "#24217",
    title: "",
    day: 4, // Thursday
    startTime: 8, // 08:00 AM
    duration: 1,
    color: "bg-purple-400",
    hasVideo: true,
  },
  {
    id: "#24217",
    title: "",
    day: 5, // Friday
    startTime: 3, // 03:00 AM
    duration: 1,
    color: "bg-blue-400",
    hasVideo: false,
  },
  {
    id: "#24217",
    title: "",
    day: 5, // Friday
    startTime: 8, // 08:00 AM
    duration: 1,
    color: "bg-green-700",
    hasVideo: true,
  },
  {
    id: "#24217",
    title: "MD...",
    day: 6, // Saturday
    startTime: 4, // 04:00 AM
    duration: 4,
    color: "bg-green-200",
    pattern: "diagonal-stripes",
    hasVideo: false,
  },
  {
    id: "Un...",
    title: "",
    day: 6, // Saturday
    startTime: 7, // 07:00 AM
    duration: 1,
    color: "bg-green-200",
    pattern: "diagonal-stripes",
    hasVideo: false,
  },
  {
    id: "Vac...",
    title: "",
    day: 6, // Saturday
    startTime: 8, // 08:00 AM
    duration: 1,
    color: "bg-green-200",
    pattern: "diagonal-stripes",
    hasVideo: false,
  },
]

const selectedProviders = [
  "Pratishta Trivedi Mirza",
  "Pratishta Trivedi Mirza",
  "Pratishta Trivedi Mirza",
  "Pratishta Trivedi Mirza",
  "Pratishta Trivedi Mirza",
]

interface WeeklyCalendarViewProps {
  onBack?: () => void
}

export function WeeklyCalendarView({ onBack }: WeeklyCalendarViewProps) {
  const [providers, setProviders] = useState(selectedProviders)

  const removeProvider = (index: number) => {
    setProviders(providers.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    setProviders([])
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" className="p-1" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium">Provider Calendar</h1>
        </div>

        {/* Selected Providers */}
        <div className="space-y-2 mb-4">
          {providers.map((provider, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded border">
              <span className="text-sm text-gray-700">{provider}</span>
              <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => removeProvider(index)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        {/* Clear All */}
        {providers.length > 0 && (
          <Button variant="link" className="text-red-500 p-0 h-auto text-sm" onClick={clearAll}>
            Clear All
          </Button>
        )}
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-medium">16-22 Jun 2024</h2>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <span>Session Event</span>
              <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
              <span>Calendar Event</span>
            </div>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Enter Text" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Weekly Calendar Grid */}
        <div className="border rounded-lg overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b bg-gray-50">
            <div className="p-3 border-r"></div>
            {weekDays.map((day) => (
              <div key={day.date} className="p-3 text-center border-r last:border-r-0">
                <div className="text-sm text-gray-600">{day.day}</div>
                <div className="text-lg font-medium">{day.date}</div>
              </div>
            ))}
          </div>

          {/* Time Rows */}
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-8 border-b last:border-b-0 min-h-[60px]">
              {/* Time Label */}
              <div className="p-3 border-r bg-gray-50 text-sm text-gray-600 flex items-center">{time}</div>

              {/* Day Columns */}
              {weekDays.map((day, dayIndex) => {
                const dayEvents = mockEvents.filter((event) => event.day === dayIndex && event.startTime === timeIndex)

                return (
                  <div key={`${day.date}-${time}`} className="border-r last:border-r-0 p-1 relative">
                    {dayEvents.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`${event.color} text-white text-xs p-1 rounded mb-1 relative ${
                          event.pattern === "diagonal-stripes" ? "opacity-60" : ""
                        }`}
                        style={{
                          height: `${event.duration * 20}px`,
                          backgroundImage:
                            event.pattern === "diagonal-stripes"
                              ? "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)"
                              : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{event.id}</span>
                          {event.hasVideo && <Video className="h-3 w-3" />}
                        </div>
                        {event.title && <div className="text-xs mt-1 truncate">{event.title}</div>}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
