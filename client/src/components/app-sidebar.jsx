import { 
  BarChart3, 
  BookOpen, 
  Brain, 
  FileText, 
  GraduationCap, 
  Home, 
  ListTodo, 
  Newspaper, 
  TrendingUp 
} from "lucide-react"
import { Link, useLocation } from "wouter"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "SGPA Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Internal Marks",
    url: "/marks",
    icon: TrendingUp,
  },
  {
    title: "Learning Skills",
    url: "/skills",
    icon: ListTodo,
  },
  {
    title: "Learning Path",
    url: "/learning-path",
    icon: GraduationCap,
  },
  {
    title: "AI Guidance",
    url: "/ai-guidance",
    icon: Brain,
  },
  {
    title: "Course Library",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Career News",
    url: "/news",
    icon: Newspaper,
  },
  {
    title: "Resume Builder",
    url: "/resume",
    icon: FileText,
  },
]

export function AppSidebar() {
  const [location] = useLocation()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CareerCounsellor AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    data-active={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}