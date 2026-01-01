"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Github, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Authenticating user...")
    router.push("/")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none shadow-2xl ring-1 ring-border/50 bg-card/80 backdrop-blur-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10 h-11 p-1 bg-muted/50 rounded-lg">
                <TabsTrigger value="login" className="rounded-md data-[state=active]:shadow-sm">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-md data-[state=active]:shadow-sm">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6 focus-visible:outline-none">
                <form className="space-y-6" onSubmit={handleAuth}>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground max-w-[240px]">Access your personalized academic hub</p>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                          Forgot your password?
                        </Link>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6 focus-visible:outline-none">
                <form className="space-y-6" onSubmit={handleAuth}>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-balance">Join EduFlow</h1>
                    <p className="text-sm text-muted-foreground max-w-[240px]">
                      Start your journey to academic excellence
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input id="signup-name" placeholder="John Doe" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" required />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                    >
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <div className="relative mt-8 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-primary/20 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button variant="outline" className="w-full bg-transparent">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </Tabs>
          </div>
          <div className="relative hidden bg-muted md:block">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center text-white z-20">
              <div className="bg-primary/20 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <GraduationCap className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Master Your Studies</h2>
                <p className="text-white/80">
                  Join thousands of students who have transformed their academic performance with EduFlow.
                </p>
              </div>
            </div>
            <img
              src="/student-studying-with-laptop-in-modern-library-dar.jpg"
              alt="Student focused"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent mix-blend-multiply" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
