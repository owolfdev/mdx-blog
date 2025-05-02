"use client";

import { useState } from "react";
import { ArrowUpDown, Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample data
const initialPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    status: "published",
    date: "2023-05-15",
    views: 1245,
    category: "Development",
    tags: ["nextjs", "react", "javascript"],
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    status: "published",
    date: "2023-05-10",
    views: 982,
    category: "Development",
    tags: ["react", "hooks", "javascript"],
  },
  {
    id: 3,
    title: "CSS Grid Layout Tutorial",
    status: "draft",
    date: "2023-05-08",
    views: 0,
    category: "Design",
    tags: ["css", "layout", "web design"],
  },
  {
    id: 4,
    title: "JavaScript Performance Tips",
    status: "published",
    date: "2023-05-05",
    views: 756,
    category: "Development",
    tags: ["javascript", "performance", "web"],
  },
  {
    id: 5,
    title: "Building a REST API with Node.js",
    status: "published",
    date: "2023-05-01",
    views: 1102,
    category: "Backend",
    tags: ["nodejs", "api", "rest"],
  },
  {
    id: 6,
    title: "Introduction to TypeScript",
    status: "draft",
    date: "2023-04-28",
    views: 0,
    category: "Development",
    tags: ["typescript", "javascript"],
  },
  {
    id: 7,
    title: "Responsive Web Design Principles",
    status: "published",
    date: "2023-04-25",
    views: 890,
    category: "Design",
    tags: ["responsive", "css", "web design"],
  },
  {
    id: 8,
    title: "State Management in React",
    status: "published",
    date: "2023-04-20",
    views: 1320,
    category: "Development",
    tags: ["react", "state", "redux"],
  },
];

interface PostsTableProps {
  searchQuery: string;
}

export default function PostsTable({ searchQuery }: PostsTableProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    if (sortField === "views") {
      return sortDirection === "asc" ? a.views - b.views : b.views - a.views;
    }

    // For title and category
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Posts</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("title")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Title
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Date
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("views")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Views
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("category")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Category
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[80px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPosts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No posts found. Try a different search term.
                </TableCell>
              </TableRow>
            ) : (
              sortedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>{post.views.toLocaleString()}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Pagination className="w-full">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
