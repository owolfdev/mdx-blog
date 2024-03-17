"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { FilterFn, Row } from "@tanstack/react-table";

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
import { useRouter } from "next/navigation";

export type Post = {
  id: string;
  type: string;
  title: string;
  date: string;
  slug: string;
  author: string;
  description: string;
  tags: string[];
};

const messageData = {
  id: "80de44e2-e893-42ae-b777-75fad857bb4a",
  created_at: "2023-12-23T22:45:45.556022+00:00",
  name: "oliver",
  email: "oliverwolfson@gmail.com",
  phone: null,
  company: null,
  message: "This is simply a test",
  read: false,
  responded: false,
  type: "Bug Report",
};

export type ContactMessagesData = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  read: boolean;
  responded: boolean;
  type: string;
};

interface DataTableProps {
  contactMessagesData: ContactMessagesData[];
}

//post  columns def
// export const columns: ColumnDef<Post>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },

//   {
//     accessorKey: "date",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Date
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       // Parse the date from the row
//       const date = new Date(row.getValue("date"));

//       // Format the date as 'DD.MM.YY'
//       const formattedDate = date.toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "2-digit",
//       });

//       return <div>{formattedDate}</div>;
//     },
//   },

//   {
//     accessorKey: "type", // Access the 'type' attribute of your data
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Type
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => <span>{row.getValue("type")}</span>, // Access and display the 'type' value from each row
//   },

//   {
//     accessorKey: "title",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Title
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => (
//       <div>
//         {" "}
//         <Link href={`/blog/${row.original.slug}`}>
//           <TooltipProvider>
//             <Tooltip>
//               {/* <TooltipTrigger>{row.getValue("title")}</TooltipTrigger> */}
//               <TooltipTrigger>
//                 <div className="text-left">{row.getValue("title")}</div>
//               </TooltipTrigger>
//               <TooltipContent className="max-w-sm px-4 py-2">
//                 {row.original.description}
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </Link>
//       </div>
//     ),
//   },

//   {
//     accessorKey: "status",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Status
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       // Get the current date
//       const currentDate = new Date();
//       currentDate.setHours(0, 0, 0, 0); // Reset time part for comparison

//       // Parse the date from the row
//       const postDate = new Date(row.getValue("date"));

//       // Determine the status based on the date
//       const status = postDate <= currentDate ? "published" : "unpublished";

//       return <div className="capitalize">{status}</div>;
//     },
//   },

//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const post = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <DotsHorizontalIcon className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(post.id)}
//             >
//               Copy post ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem asChild>
//               <Link href={`/blog/edit/${post.slug}`}>Edit</Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

//contract messages colums def
export const columns: ColumnDef<ContactMessagesData>[] = [
  {
    id: "select",
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
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // Parse the date from the row
      const date = new Date(row.getValue("created_at"));

      // Format the date as 'DD.MM.YY'
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.getValue("type")}</span>,
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("name")}</span>
    ),
  },

  {
    accessorKey: "message",
    header: ({ column }) => {
      return <div>Message</div>;
    },
    cell: ({ row }) => {
      const message: string = row.getValue("message") as string; // Assuming 'message' is a string
      const truncatedMessage =
        message.length > 30 ? message.slice(0, 25) + "..." : message;

      return <span className="capitalize">{truncatedMessage}</span>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
            console.log("column:", column);
          }}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (a, b, desc) => {
      // Custom sorting function for boolean values
      // If 'desc' is true, descending order; otherwise, ascending order
      if (a.original.read === b.original.read) {
        return 0;
      } else if (desc) {
        return a.original.read ? -1 : 1;
      } else {
        return a.original.read ? 1 : -1;
      }
    },
    cell: ({ row }) => {
      // Get the value of the 'read' property from the row
      const isRead = row.original.read;

      // Determine the status text based on the boolean value
      const status = isRead ? "Read" : "Unread";

      return <div className="">{status}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => {
      return <div>Actions</div>;
    },
    cell: ({ row }) => {
      const message = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => console.log("Copy message ID:", message.id)}
            >
              <Link href={`/contact/messages/${message.id}`}>Open Message</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {/* <Link to={`/edit/${message.id}`}>Edit</Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Copy message ID:", message.id)}
            >
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {/* <Link to={`/edit/${message.id}`}>Edit</Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Copy message ID:", message.id)}
            >
              Delete Message
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {/* <Link to={`/edit/${message.id}`}>Edit</Link> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ contactMessagesData }: DataTableProps) {
  const [data, setData] = React.useState<ContactMessagesData[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();

  React.useEffect(() => {
    setData(contactMessagesData);
    // async function fetchPosts() {
    //   try {
    //     const response = await fetch("/api/fetch-contact-messages");
    //     if (response.ok) {
    //       let posts = await response.json();

    //       // Sort the posts by date in descending order
    //       posts.sort((a: any, b: any) => {
    //         // Convert dates to timestamps for comparison
    //         const dateA = new Date(a.date).getTime();
    //         const dateB = new Date(b.date).getTime();
    //         return dateB - dateA; // Descending order
    //       });

    //       setData(posts); // Set the sorted posts into the state
    //     } else {
    //       console.error("Failed to fetch posts");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching posts:", error);
    //   }
    // }

    // fetchPosts();
  }, []);

  const globalFilterFn: FilterFn<Post> = (row, columnIds, filterValue) => {
    const lowercasedFilter = filterValue?.toLowerCase() || "";

    console.log("row!!:", row);

    // Return true if the row should be included in the filter
    return (
      row.original.title.toLowerCase().includes(lowercasedFilter) ||
      row.original.description.toLowerCase().includes(lowercasedFilter) ||
      row.original.type.toLowerCase().includes(lowercasedFilter) ||
      (row.original.tags &&
        row.original.tags.some((tag) =>
          tag.toLowerCase().includes(lowercasedFilter)
        ))
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
    // globalFilterFn: globalFilterFn,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      sorting: [{ id: "date", desc: true }], // Default sorting by 'date' in descending order
      pagination: {
        pageSize: 15, // Existing pagination state
      },
    },
  });

  return (
    <div className="w-full">
      {/* <div>
        <div>
          <div className="flex flex-col gap-2">
            {contactMessagesData.map((message) => (
              <div key={message.id}>
                <div>From: {message.name}</div>
                <div>Email: {message.email}</div>
                <div>Date: {new Date(message.created_at).toLocaleString()}</div>
                <div>Message: {message.message}</div>
                <div>Read: {JSON.stringify(message.read)}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Search messages..."
          // Use a global filter value from the table state
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => {
            // Update the global filter value
            table.setGlobalFilter(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
