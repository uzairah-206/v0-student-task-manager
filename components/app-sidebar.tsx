"use client"

import type * as React from "react"
import { LayoutDashboard, CheckSquare, Calendar, Timer, BookOpen, Settings, GraduationCap, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Calendar,
    },
    {
      title: "Focus",
      url: "/focus",
      icon: Timer,
    },
  ],
  courses: [
    { name: "Computer Science", code: "CS101", color: "bg-blue-500" },
    { name: "Advanced Math", code: "MATH302", color: "bg-purple-500" },
    { name: "World History", code: "HIST101", color: "bg-orange-500" },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 flex flex-row items-center justify-between px-4 border-b border-sidebar-border/50">
        <div className="flex items-center gap-2 font-semibold">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl tracking-tight group-data-[collapsible=icon]:hidden font-bold">EduFlow</span>
          </Link>
        </div>
        <div className="group-data-[collapsible=icon]:hidden">
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 py-4">
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
                className="transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground h-10"
              >
                <Link href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator className="mx-4 opacity-50" />

        <div className="mt-4 px-4 group-data-[collapsible=icon]:hidden">
          <h2 className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
            Academic
          </h2>
          <SidebarMenu>
            {data.courses.map((course) => (
              <SidebarMenuItem key={course.code}>
                <SidebarMenuButton tooltip={course.name} className="h-9">
                  <div className={`h-2 w-2 rounded-full ${course.color} shrink-0`} />
                  <span className="text-sm">{course.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton className="text-muted-foreground hover:text-foreground transition-colors h-9">
                <BookOpen className="h-4 w-4" />
                <span className="text-xs font-medium">Manage Courses</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 w-full justify-start gap-3 hover:bg-sidebar-accent/50 transition-colors px-2">
              <Avatar className="h-8 w-8 border border-sidebar-border">
                <AvatarImage src="/diverse-student-profiles.png" />
                <AvatarFallback className="bg-primary/10 text-primary">ST</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-xs leading-tight group-data-[collapsible=icon]:hidden overflow-hidden">
                <span className="font-bold truncate w-full">Alex Johnson</span>
                <span className="text-muted-foreground truncate w-full">Junior Year</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <div className="flex items-center gap-1 mt-1 group-data-[collapsible=icon]:flex-col">
            <SidebarMenuItem className="flex-1">
              <SidebarMenuButton tooltip="Settings" className="h-9 w-full">
                <Settings className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="flex-1">
              <SidebarMenuButton
                asChild
                tooltip="Logout"
                className="h-9 w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Link href="/login">
                  <LogOut className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
