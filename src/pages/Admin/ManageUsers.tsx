/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
  useUnblockUserMutation,
} from "@/redux/features/admin/admin.api";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ManageUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const queryArgs = {
    page: currentPage,
    limit,
    search: search || undefined,
  };

  const { data, isLoading, isError, refetch, error } = useGetAllUsersQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  useEffect(() => {
    setCurrentPage(1); // Reset page when search changes
  }, [search]);

  const handleBlock = async (userId: string) => {
    try {
      await blockUser(userId).unwrap();
      toast.success("User blocked successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to block user");
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      await unblockUser(userId).unwrap();
      toast.success("User unblocked successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to unblock user");
    }
  };

  if (isError) return <p>Error: {(error as any)?.message || "Something went wrong"}</p>;

  const users: any[] = data?.data || [];
  const meta = data?.meta || { totalPages: 1 };
  const totalPages = meta.totalPages;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Users</h2>
          <p className="text-muted-foreground">Search and manage all users</p>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px]"
          />
        </div>

        <Card>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email || "-"}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            {user.isBlocked ? (
                              <span className="text-red-600 font-semibold">Blocked</span>
                            ) : (
                              <span className="text-green-600 font-semibold">Active</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.isBlocked ? (
                              <Button size="sm" onClick={() => handleUnblock(user._id)}>
                                Unblock
                              </Button>
                            ) : (
                              <Button size="sm" variant="destructive" onClick={() => handleBlock(user._id)}>
                                Block
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <Calendar className="h-12 w-12 text-muted-foreground" />
                            <p className="text-lg font-medium">No users found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-end mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                            <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
