import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, AlertCircle, CheckCircle2, ChevronRight, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const upcomingDeadlines = [
    { id: 1, task: "Data Structures Quiz", course: "CS101", date: "Tomorrow", priority: "high" },
    { id: 2, task: "History Essay", course: "HIST101", date: "Oct 24", priority: "medium" },
    { id: 3, task: "Calculus Homework", course: "MATH302", date: "Oct 26", priority: "low" },
    { id: 4, task: "Biology Lab Report", course: "BIO202", date: "Oct 27", priority: "medium" },
  ]

  const activeCourses = [
    { name: "Computer Science", progress: 75, grade: "A", color: "bg-blue-500" },
    { name: "Advanced Math", progress: 60, grade: "B+", color: "bg-purple-500" },
    { name: "World History", progress: 90, grade: "A", color: "bg-orange-500" },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <SidebarInset className="flex flex-col min-w-0 bg-background/50 backdrop-blur-3xl">
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b border-border/40 sticky top-0 z-10 bg-background/80 backdrop-blur-md">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/80">Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-tight">On Track • GPA 3.8</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Header / Welcome Section */}
            <section className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Good morning, Alex!</h2>
                <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed">
                  Ready to tackle your goals today? You have 4 assignments due this week and 2 upcoming quizzes.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg" asChild className="rounded-full shadow-sm">
                    <Link href="/tasks">View My Tasks</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    asChild
                    className="rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10"
                  >
                    <Link href="/focus">Set Focus Timer</Link>
                  </Button>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Active Courses */}
                <section>
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Active Courses
                    </h3>
                    <Button variant="link" size="sm" className="text-primary font-semibold">
                      See all
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCourses.map((course) => (
                      <Card
                        key={course.name}
                        className="group hover:shadow-md transition-all duration-300 border-border"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              {course.name}
                            </CardTitle>
                            <Badge variant="secondary" className="font-bold">
                              {course.grade}
                            </Badge>
                          </div>
                          <CardDescription>Semester A</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="space-y-3">
                            <div className="flex justify-between text-xs font-medium">
                              <span>Course Completion</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-1.5" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Focus Stats / Productivity */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Focus Productivity</CardTitle>
                    <CardDescription>Your focus sessions over the last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 w-full flex items-end justify-between gap-2 pt-4">
                      {[45, 60, 30, 80, 50, 90, 70].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className={`w-full bg-primary/20 rounded-t-md relative group overflow-hidden`}
                            style={{ height: `${val}%` }}
                          >
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground">
                            {["M", "T", "W", "T", "F", "S", "S"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Area */}
              <div className="space-y-8">
                {/* Upcoming Deadlines */}
                <section>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 px-1">
                    <Clock className="h-5 w-5 text-primary" />
                    Deadlines
                  </h3>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div
                        key={deadline.id}
                        className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors group cursor-pointer"
                      >
                        <div
                          className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${
                            deadline.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : deadline.priority === "medium"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <AlertCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{deadline.task}</p>
                          <p className="text-xs text-muted-foreground">{deadline.course}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Due</p>
                          <p className="text-xs font-semibold">{deadline.date}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-xl bg-transparent" asChild>
                      <Link href="/tasks">
                        View All Tasks <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </section>

                {/* Daily Motivation */}
                <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                    <p className="italic text-sm text-foreground/80 leading-relaxed">
                      "Success is the sum of small efforts, repeated day in and day out."
                    </p>
                    <p className="text-xs font-bold mt-4 uppercase tracking-widest text-primary">— Robert Collier</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  )
}
