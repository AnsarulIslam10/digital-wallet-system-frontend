/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  useApproveAgentMutation,
  useGetAllUsersQuery,
  useSuspendAgentMutation,
} from "@/redux/features/admin/admin.api";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ManageAgents() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const queryArgs = {
    page: currentPage,
    limit,
    search: search || undefined,
  };

  const { data, isLoading, isError, refetch, error } = useGetAllUsersQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  const handleApprove = async (agentId: string) => {
    try {
      await approveAgent(agentId).unwrap();
      toast.success("Agent approved successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve agent");
    }
  };

  const handleSuspend = async (agentId: string) => {
    try {
      await suspendAgent(agentId).unwrap();
      toast.success("Agent suspended successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to suspend agent");
    }
  };

  if (isError) return <p>Error: {(error as any)?.data?.message || "Something went wrong"}</p>;

  // Filter only agents
  const allUsers: any[] = data?.data || [];
  const agents: any[] = allUsers.filter(user => user.role === "agent");

  // Calculate total pages based on filtered agents
  const totalPages = Math.ceil(agents.length / limit);

  // Get only agents for the current page
  const startIndex = (currentPage - 1) * limit;
  const paginatedAgents = agents.slice(startIndex, startIndex + limit);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Agents</h2>
          <p className="text-muted-foreground">Approve or suspend agents</p>
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
          <CardHeader>
            <CardTitle>All Agents</CardTitle>
          </CardHeader>
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
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAgents.length > 0 ? (
                      paginatedAgents.map(agent => (
                        <TableRow key={agent._id}>
                          <TableCell>{agent.name}</TableCell>
                          <TableCell>{agent.email || "-"}</TableCell>
                          <TableCell>{agent.phone}</TableCell>
                          <TableCell>
                            {agent.isApproved ? (
                              <span className="text-green-600 font-semibold">Approved</span>
                            ) : (
                              <span className="text-red-600 font-semibold">Suspended</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {agent.isApproved ? (
                              <Button size="sm" variant="destructive" onClick={() => handleSuspend(agent._id)}>Suspend</Button>
                            ) : (
                              <Button size="sm" onClick={() => handleApprove(agent._id)}>Approve</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <Calendar className="h-12 w-12 text-muted-foreground" />
                            <p className="text-lg font-medium">No agents found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {/* Pagination: only show if total pages > 1 */}
                {totalPages > 1 && (
                  <div className="flex justify-end mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                            <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
