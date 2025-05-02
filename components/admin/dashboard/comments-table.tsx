"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  Check,
  MessageSquare,
  MoreHorizontal,
  Trash2,
  X,
} from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data
const initialComments = [
  {
    id: 1,
    author: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Great article! I learned a lot from this.",
    postTitle: "Getting Started with Next.js",
    date: "2023-05-16",
    status: "approved",
  },
  {
    id: 2,
    author: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "I have a question about the hooks section. Can you elaborate more on useEffect?",
    postTitle: "Understanding React Hooks",
    date: "2023-05-15",
    status: "approved",
  },
  {
    id: 3,
    author: "Michael Brown",
    email: "mbrown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "This is spam content with suspicious links.",
    postTitle: "JavaScript Performance Tips",
    date: "2023-05-14",
    status: "spam",
  },
  {
    id: 4,
    author: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Thanks for sharing these insights. Very helpful!",
    postTitle: "Building a REST API with Node.js",
    date: "2023-05-13",
    status: "approved",
  },
  {
    id: 5,
    author: "David Wilson",
    email: "david.w@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I disagree with some points in this article.",
    postTitle: "State Management in React",
    date: "2023-05-12",
    status: "pending",
  },
  {
    id: 6,
    author: "Jennifer Lee",
    email: "jlee@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Could you provide more examples for beginners?",
    postTitle: "Introduction to TypeScript",
    date: "2023-05-11",
    status: "pending",
  },
  {
    id: 7,
    author: "Robert Garcia",
    email: "rgarcia@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I implemented your suggestions and they worked perfectly!",
    postTitle: "Responsive Web Design Principles",
    date: "2023-05-10",
    status: "approved",
  },
];

export default function CommentsTable() {
  const [comments, setComments] = useState(initialComments);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    // For author, postTitle, and status
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

  const approveComment = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, status: "approved" } : comment
      )
    );
  };

  const rejectComment = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, status: "rejected" } : comment
      )
    );
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Comments</CardTitle>
            <CardDescription>
              Manage user comments on your posts
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full">
              {comments.filter((c) => c.status === "pending").length} Pending
            </Badge>
            <Badge variant="outline" className="rounded-full">
              {comments.filter((c) => c.status === "approved").length} Approved
            </Badge>
            <Badge variant="outline" className="rounded-full">
              {comments.filter((c) => c.status === "spam").length} Spam
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("author")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Author
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[300px]">Comment</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("postTitle")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Post
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
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                      />
                      <AvatarFallback>
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{comment.author}</div>
                      <div className="text-xs text-muted-foreground">
                        {comment.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="line-clamp-2 text-sm">{comment.content}</div>
                </TableCell>
                <TableCell className="text-sm">{comment.postTitle}</TableCell>
                <TableCell className="text-sm">{comment.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      comment.status === "approved"
                        ? "default"
                        : comment.status === "pending"
                          ? "outline"
                          : comment.status === "spam"
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {comment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {comment.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => approveComment(comment.id)}
                          title="Approve"
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => rejectComment(comment.id)}
                          title="Reject"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
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
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteComment(comment.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
