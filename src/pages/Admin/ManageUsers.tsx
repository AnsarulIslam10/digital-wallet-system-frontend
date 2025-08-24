/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "@/redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export default function ManageUsers() {
  const { data, isLoading, isError } = useGetAllUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;

  const users: any[] = data?.data || [];

  const handleBlock = async (userId: string) => {
    try {
      await blockUser(userId).unwrap();
      toast.success("User blocked successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to block user");
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      await unblockUser(userId).unwrap();
      toast.success("User unblocked successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to unblock user");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Users</h2>
          <p className="text-muted-foreground">Block or unblock users</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
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
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email || "-"}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {user.isBlocked ? (
                        <span className="text-red-600 font-semibold">
                          Blocked
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.isBlocked ? (
                        <Button
                          className="cursor-pointer"
                          size="sm"
                          onClick={() => handleUnblock(user._id)}
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          className="cursor-pointer"
                          size="sm"
                          variant="destructive"
                          onClick={() => handleBlock(user._id)}
                        >
                          Block
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
