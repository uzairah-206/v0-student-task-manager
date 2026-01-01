"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useCallback } from "react"
import { Play, Pause, RotateCcw, Coffee, Target, Volume2, VolumeX, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function FocusPage() {
  const focusDuration = 25 * 60
  const breakDuration = 5 * 60

  const [timeLeft, setTimeLeft] = useState(focusDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<"focus" | "break">("focus")
  const [sessionsCompleted, setSessions] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [selectedSound, setSelectedSound] = useState<string | null>(null)

  const playNotification = useCallback(() => {
    toast.success(mode === "focus" ? "Focus session complete! Time for a break." : "Break over! Ready to focus?", {
      description: mode === "focus" ? "Great job on completing your session." : "Let's get back to work.",
      icon: <Sparkles className="h-4 w-4 text-primary" />,
    })
  }, [mode])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      playNotification()
      if (mode === "focus") {
        setSessions((prev) => prev + 1)
        setMode("break")
        setTimeLeft(breakDuration)
      } else {
        setMode("focus")
        setTimeLeft(focusDuration)
      }
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, mode, focusDuration, breakDuration, playNotification])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(mode === "focus" ? focusDuration : breakDuration)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const percentage =
    mode === "focus"
      ? ((focusDuration - timeLeft) / focusDuration) * 100
      : ((breakDuration - timeLeft) / breakDuration) * 100

  const ambientSounds = [
    { name: "Rain Sounds", icon: "🌧️" },
    { name: "Ocean Waves", icon: "🌊" },
    { name: "Forest Birds", icon: "🌲" },
    { name: "Coffee Shop", icon: "☕" },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex flex-col min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Focus Mode</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-background/50 to-background">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="relative overflow-hidden border-2 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <CardContent className="relative pt-8 pb-8">
                <div className="text-center space-y-6">
                  <Badge variant={mode === "focus" ? "default" : "secondary"} className="px-4 py-1 text-sm">
                    {mode === "focus" ? (
                      <>
                        <Target className="mr-1 h-3.5 w-3.5" /> Focus Session
                      </>
                    ) : (
                      <>
                        <Coffee className="mr-1 h-3.5 w-3.5" /> Break Time
                      </>
                    )}
                  </Badge>

                  <div className="relative inline-block">
                    <svg className="transform -rotate-90 w-64 h-64 md:w-80 md:h-80">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="42%"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted/30"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="42%"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="100 100"
                        strokeDashoffset={100 - percentage}
                        pathLength="100"
                        className="text-primary transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-6xl md:text-7xl font-bold tracking-tight">{formatTime(timeLeft)}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {mode === "focus" ? "Stay focused!" : "Take a break"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-4">
                    <Button
                      size="lg"
                      onClick={toggleTimer}
                      className="rounded-full h-14 px-8 shadow-md hover:shadow-lg transition-all"
                    >
                      {isRunning ? (
                        <>
                          <Pause className="mr-2 h-5 w-5" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-5 w-5" /> Start
                        </>
                      )}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={resetTimer}
                      className="rounded-full h-14 px-8 shadow-sm bg-transparent"
                    >
                      <RotateCcw className="mr-2 h-5 w-5" /> Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Sessions Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{sessionsCompleted}</p>
                  <Progress value={(sessionsCompleted / 8) * 100} className="mt-3 h-1.5" />
                  <p className="text-xs text-muted-foreground mt-2">Goal: 8 sessions</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Focus Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{sessionsCompleted * 25} min</p>
                  <p className="text-xs text-muted-foreground mt-2">Productive work time</p>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">7 days</p>
                  <p className="text-xs text-muted-foreground mt-2">Keep it going!</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Ambient Sounds
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          setSoundEnabled(!soundEnabled)
                          if (!soundEnabled && !selectedSound) setSelectedSound("Rain Sounds")
                        }}
                      >
                        {soundEnabled ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                    </CardTitle>
                    <CardDescription className="mt-1">Choose your focus soundtrack</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ambientSounds.map((sound) => (
                    <Button
                      key={sound.name}
                      variant={selectedSound === sound.name ? "default" : "outline"}
                      onClick={() => {
                        setSelectedSound(sound.name)
                        setSoundEnabled(true)
                      }}
                      className={`h-auto flex-col gap-2 py-4 transition-all ${
                        selectedSound === sound.name ? "ring-2 ring-primary ring-offset-2" : "hover:bg-primary/5"
                      }`}
                    >
                      <span className="text-3xl">{sound.icon}</span>
                      <span className="text-xs font-semibold">{sound.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-dashed">
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pro tip: The Pomodoro Technique helps maintain focus by breaking work into intervals. After 4 focus
                  sessions, take a longer 15-30 minute break to recharge.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
