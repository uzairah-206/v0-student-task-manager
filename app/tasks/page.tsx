"use client"

import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Filter, Search, Calendar, Tag, CheckCircle2, Circle } from "lucide-react"
import { Suspense, useState } from "react"
import { toast } from "sonner" // switched from react-hot-toast to sonner

export default function TasksPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex flex-col min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Tasks</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-background/50">
          <Suspense fallback={null}>
            <TasksContent />
          </Suspense>
        </main>
      </SidebarInset>
    </div>
  )
}

function TasksContent() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Data Structures Lab",
      course: "CS101",
      priority: "High",
      dueDate: "Today",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Write Introduction for History Essay",
      course: "HIST101",
      priority: "Medium",
      dueDate: "Tomorrow",
      status: "To Do",
    },
    {
      id: 3,
      title: "Solve Calculus Problem Set 4",
      course: "MATH302",
      priority: "High",
      dueDate: "Oct 26",
      status: "To Do",
    },
    {
      id: 4,
      title: "Review Biology Lecture Notes",
      course: "BIO202",
      priority: "Low",
      dueDate: "Oct 28",
      status: "Completed",
    },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: t.status === "Completed" ? "To Do" : "Completed" } : t)))
    toast.success("Task updated successfully")
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      course: "General",
      priority: "Medium",
      dueDate: "Upcoming",
      status: "To Do",
    }

    setTasks([newTask, ...tasks])
    setNewTaskTitle("")
    setIsAddingTask(false)
    toast.success("Task added successfully")
  }

  const [filter, setFilter] = useState("all")
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "todo") return task.status === "To Do"
    if (filter === "in-progress") return task.status === "In Progress"
    if (filter === "completed") return task.status === "Completed"
    return true
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl bg-transparent px-4">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button className="rounded-xl shadow-sm px-4" onClick={() => setIsAddingTask(!isAddingTask)}>
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
        </div>
      </div>

      {isAddingTask && (
        <Card className="border-primary/20 bg-primary/5 animate-in slide-in-from-top-2 duration-300">
          <CardContent className="p-4">
            <form onSubmit={addTask} className="flex gap-3">
              <input
                autoFocus
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium"
              />
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingTask(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Add Task
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-6">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1"
          >
            All Tasks
          </TabsTrigger>
          <TabsTrigger
            value="todo"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1"
          >
            To Do
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1"
          >
            In Progress
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 px-1"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="group hover:border-primary/50 transition-colors shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="cursor-pointer text-primary" onClick={() => toggleTask(task.id)}>
                    {task.status === "Completed" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-semibold text-sm md:text-base ${task.status === "Completed" ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Tag className="h-3 w-3" /> {task.course}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Due {task.dueDate}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] h-5 ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
