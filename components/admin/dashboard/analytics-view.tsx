"use client";

import { useState } from "react";
import { Calendar, BarChart, LineChart, PieChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsView() {
  const [timeRange, setTimeRange] = useState("30days");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Page Views
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Visitors
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">
              +12.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Time on Site
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 45s</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27.5%</div>
            <p className="text-xs text-muted-foreground">
              -3.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>
                View your site traffic sources and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <LineChart className="mx-auto h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Traffic chart visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>
                  Sites sending traffic to your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Google</div>
                    <div className="text-sm">45.2%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Direct</div>
                    <div className="text-sm">32.1%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Twitter</div>
                    <div className="text-sm">10.3%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Facebook</div>
                    <div className="text-sm">8.7%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm">3.7%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>
                  Most visited pages on your site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Homepage</div>
                    <div className="text-sm">24.5%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      /blog/getting-started-with-nextjs
                    </div>
                    <div className="text-sm">18.2%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      /blog/understanding-react-hooks
                    </div>
                    <div className="text-sm">12.1%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      /blog/state-management-in-react
                    </div>
                    <div className="text-sm">9.8%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">/about</div>
                    <div className="text-sm">7.3%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>
                How users interact with your content
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <BarChart className="mx-auto h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Engagement chart visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>Information about your audience</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <PieChart className="mx-auto h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Demographics chart visualization would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
