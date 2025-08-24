/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApproveAgentMutation, useGetAllUsersQuery, useSuspendAgentMutation } from "@/redux/features/admin/admin.api";
import { toast } from "sonner";


export default function ManageAgents() {
  const { data, isLoading, isError } = useGetAllUsersQuery(undefined);
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  if (isLoading) return <p>Loading agents...</p>;
  if (isError) return <p>Error loading agents</p>;

  // Filter only agents
  const agents: any[] = (data?.data || []).filter(user => user.role === "agent");

  const handleApprove = async (agentId: string) => {
    try {
      await approveAgent(agentId).unwrap();
      toast.success("Agent approved successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve agent");
    }
  };

  const handleSuspend = async (agentId: string) => {
    try {
      await suspendAgent(agentId).unwrap();
      toast.success("Agent suspended successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to suspend agent");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Agents</h2>
          <p className="text-muted-foreground">Approve or suspend agents</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Agents</CardTitle>
          </CardHeader>
          <CardContent>
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
                {agents.length > 0 ? (
                  agents.map(agent => (
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
                          <Button className="cursor-pointer" size="sm" variant="destructive" onClick={() => handleSuspend(agent._id)}>Suspend</Button>
                        ) : (
                          <Button className="cursor-pointer" size="sm" onClick={() => handleApprove(agent._id)}>Approve</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No agents found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
