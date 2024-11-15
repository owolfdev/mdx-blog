"use client";
import * as React from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type FilterFn,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export type Post = {
  id: string;
  type: string;
  title: string;
  publishDate: string;
  slug: string;
  author: string;
  description: string;
  tags: string[];
  likes: number;
  draft?: boolean;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "publishDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("publishDate"));
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("type")}</span>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <Link href={`/blog/${row.original.slug}`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-left">{row.getValue("title")}</div>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm px-4 py-2">
                {row.original.description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
      </Button>
    ),
    cell: ({ row }) => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const postDate = new Date(row.getValue("publishDate"));
      const isDraft = row.original.draft;
      const status =
        postDate > currentDate || isDraft ? "unpublished" : "published";
      return <div className="capitalize">{status}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Likes
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("likes")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(post.id)}
            >
              Copy post ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/post/edit/${post.slug}`}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable() {
  const [postsData, setPostsData] = React.useState<Post[]>([]);
  const [data, setData] = React.useState<Post[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/cache/all-posts.json");
      const data = await response.json();
      setPostsData(data);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (postsData.length > 0) {
      // Sort the posts by date in descending order
      const sortedPosts = postsData.sort((a, b) => {
        const dateA = new Date(a.publishDate).getTime();
        const dateB = new Date(b.publishDate).getTime();
        return dateB - dateA;
      });
      setData(sortedPosts); // Set the sorted posts into the state
    }
  }, [postsData]);

  const globalFilterFn: FilterFn<Post> = (row, columnIds, filterValue) => {
    const lowercasedFilter = filterValue?.toLowerCase() || "";

    return (
      row.original.title.toLowerCase().includes(lowercasedFilter) ||
      row.original.description.toLowerCase().includes(lowercasedFilter) ||
      row.original.type.toLowerCase().includes(lowercasedFilter) ||
      row.original.tags?.some((tag) =>
        tag.toLowerCase().includes(lowercasedFilter)
      )
    );
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: globalFilterFn,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      sorting: [{ id: "publishDate", desc: true }], // Default sorting by 'publishDate' in descending order
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search posts..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
          }}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div className="flex justify-between space-x-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div>
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last
          </Button>
        </div>
        <div>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>
    </div>
  );
}
