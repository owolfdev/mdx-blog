"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Plus, Tag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample data
const initialCategories = [
  { id: 1, name: "Development", slug: "development", count: 15 },
  { id: 2, name: "Design", slug: "design", count: 8 },
  { id: 3, name: "Backend", slug: "backend", count: 5 },
  { id: 4, name: "Frontend", slug: "frontend", count: 12 },
  { id: 5, name: "DevOps", slug: "devops", count: 3 },
  { id: 6, name: "Mobile", slug: "mobile", count: 6 },
];

const initialTags = [
  { id: 1, name: "javascript", count: 25 },
  { id: 2, name: "react", count: 18 },
  { id: 3, name: "nextjs", count: 12 },
  { id: 4, name: "css", count: 15 },
  { id: 5, name: "typescript", count: 10 },
  { id: 6, name: "nodejs", count: 8 },
  { id: 7, name: "api", count: 6 },
  { id: 8, name: "performance", count: 4 },
  { id: 9, name: "hooks", count: 7 },
  { id: 10, name: "web design", count: 5 },
];

export default function CategoriesView() {
  const [categories, setCategories] = useState(initialCategories);
  const [tags, setTags] = useState(initialTags);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return;

    const newSlug =
      newCategorySlug.trim() === ""
        ? newCategoryName.toLowerCase().replace(/\s+/g, "-")
        : newCategorySlug;

    const newCategory = {
      id: categories.length + 1,
      name: newCategoryName,
      slug: newSlug,
      count: 0,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setNewCategorySlug("");
    setIsAddCategoryOpen(false);
  };

  const handleAddTag = () => {
    if (newTagName.trim() === "") return;

    const newTag = {
      id: tags.length + 1,
      name: newTagName.toLowerCase(),
      count: 0,
    };

    setTags([...tags, newTag]);
    setNewTagName("");
    setIsAddTagOpen(false);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <Tabs defaultValue="categories">
      <TabsList>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="tags">Tags</TabsTrigger>
      </TabsList>

      <TabsContent value="categories" className="space-y-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your blog categories</CardDescription>
            </div>
            <Dialog
              open={isAddCategoryOpen}
              onOpenChange={setIsAddCategoryOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new category for your blog posts.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g. Technology"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slug">Slug (optional)</Label>
                    <Input
                      id="slug"
                      value={newCategorySlug}
                      onChange={(e) => setNewCategorySlug(e.target.value)}
                      placeholder="e.g. technology"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to generate from name
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddCategoryOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>Add Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Posts</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.count}</TableCell>
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
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tags" className="space-y-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Manage your blog tags</CardDescription>
            </div>
            <Dialog open={isAddTagOpen} onOpenChange={setIsAddTagOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tag
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Tag</DialogTitle>
                  <DialogDescription>
                    Create a new tag for your blog posts.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tag-name">Name</Label>
                    <Input
                      id="tag-name"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder="e.g. javascript"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddTagOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddTag}>Add Tag</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {tags.map((tag) => (
                <Card key={tag.id} className="flex flex-col">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="px-2 py-1">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag.name}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteTag(tag.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      {tag.count} {tag.count === 1 ? "post" : "posts"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
