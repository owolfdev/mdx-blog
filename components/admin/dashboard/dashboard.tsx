"use client";

import { useState } from "react";
import {
  BarChart3,
  FileText,
  Home,
  MessageSquare,
  RefreshCw,
  Search,
  Settings,
  Tag,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import PostsTable from "@/components/admin/dashboard/posts-table";
import CommentsTable from "@/components/admin/dashboard/comments-table";
import AnalyticsView from "@/components/admin/dashboard/analytics-view";
import CategoriesView from "@/components/admin/dashboard/categories-view";
import UserProfile from "@/components/admin/dashboard/user-profile";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = () => {
    setIsRefreshing(true);

    // Simulate refreshing cache
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Cache refreshed",
        description: "All data has been refreshed from the server.",
      });
    }, 1500);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background items-center justify-center">
        {/* <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-6">
            <span className="font-semibold">Content Dashboard</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Posts">
                  <FileText className="h-4 w-4" />
                  <span>Posts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Comments">
                  <MessageSquare className="h-4 w-4" />
                  <span>Comments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Categories & Tags">
                  <Tag className="h-4 w-4" />
                  <span>Categories & Tags</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <UserProfile />
          </SidebarFooter>
        </Sidebar> */}
        <div className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            {/* <SidebarTrigger /> */}
            <div className="flex w-full items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh Cache"}
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Tabs defaultValue="posts">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="categories">
                    Categories & Tags
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="mt-6">
                <TabsContent value="posts" className="space-y-4">
                  <PostsTable searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="comments" className="space-y-4">
                  <CommentsTable />
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                  <AnalyticsView />
                </TabsContent>
                <TabsContent value="categories" className="space-y-4">
                  <CategoriesView />
                </TabsContent>
              </div>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
