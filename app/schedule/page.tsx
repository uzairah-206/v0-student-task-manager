import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"

export default function SchedulePage() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  const hours = ["08:00", "10:00", "12:00", "14:00", "16:00"]

  const classes = [
    {
      id: 1,
      name: "Computer Science",
      code: "CS101",
      day: "Mon",
      time: "08:00 - 09:30",
      room: "Lab 302",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      id: 2,
      name: "Advanced Math",
      code: "MATH302",
      day: "Tue",
      time: "10:00 - 11:30",
      room: "Room 105",
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
    {
      id: 3,
      name: "World History",
      code: "HIST101",
      day: "Mon",
      time: "12:00 - 13:30",
      room: "Lecture Hall A",
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
    {
      id: 4,
      name: "Computer Science",
      code: "CS101",
      day: "Wed",
      time: "08:00 - 09:30",
      room: "Lab 302",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex flex-col min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Weekly Schedule</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/50">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 border rounded-lg p-1 bg-card">
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Previous week">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Next week">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary shrink-0" />
                  <span className="truncate">October 20 - 24, 2025</span>
                </h2>
              </div>
              <Button className="rounded-xl w-full sm:w-auto">Add Class</Button>
            </div>

            <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-6 border-b bg-muted/30">
                  <div className="p-4 border-r font-medium text-[10px] text-muted-foreground uppercase tracking-widest">
                    Time
                  </div>
                  {days.map((day) => (
                    <div
                      key={day}
                      className="p-4 text-center font-bold text-sm border-r last:border-r-0 flex flex-col items-center"
                    >
                      <span>{day}</span>
                      <span className="text-[10px] font-normal text-muted-foreground mt-1">
                        Oct {20 + days.indexOf(day)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative h-[600px]">
                  {/* Time indicators */}
                  <div className="absolute inset-0 grid grid-cols-6 h-full">
                    <div className="border-r flex flex-col">
                      {hours.map((hour) => (
                        <div key={hour} className="h-24 border-b p-2 text-[10px] font-medium text-muted-foreground">
                          {hour}
                        </div>
                      ))}
                    </div>
                    {days.map((day) => (
                      <div key={day} className="border-r last:border-r-0 flex flex-col relative">
                        {hours.map((hour) => (
                          <div key={hour} className="h-24 border-b" />
                        ))}

                        {/* Render classes for this day */}
                        {classes
                          .filter((c) => c.day === day)
                          .map((c) => {
                            const hourIndex = hours.findIndex((h) => h.startsWith(c.time.split(":")[0]))
                            return (
                              <div
                                key={c.id}
                                className={`absolute left-1 right-1 rounded-lg border-l-4 p-2 shadow-sm ${c.color} transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer z-10 overflow-hidden`}
                                style={{
                                  top: `${hourIndex * 6 + 0.5}rem`,
                                  height: "5rem",
                                }}
                                role="button"
                                aria-label={`Class: ${c.name} at ${c.time} in ${c.room}`}
                              >
                                <p className="font-bold text-xs truncate leading-tight">{c.name}</p>
                                <div className="flex items-center gap-1 text-[9px] mt-1 opacity-90 font-medium">
                                  <Clock className="h-2.5 w-2.5 shrink-0" /> {c.time}
                                </div>
                                <div className="flex items-center gap-1 text-[9px] mt-0.5 opacity-90 font-medium">
                                  <MapPin className="h-2.5 w-2.5 shrink-0" /> {c.room}
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Course Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">18.5 / 20</p>
                  <p className="text-xs text-muted-foreground mt-1">Full-time student status</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Study Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">32.4 hrs</p>
                  <p className="text-xs text-muted-foreground mt-1">Tracked this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Upcoming Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-2">
                    Hackathon
                  </Badge>
                  <p className="text-sm font-semibold">Innovation Summit 2025</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Saturday, Oct 25</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
