import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { ArrowUpRight, Plus, Send } from "lucide-react";
import { Link } from "react-router";

export default function Overview() {
  const { data, isLoading } = useGetMyWalletQuery(undefined);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SecurePay</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's your financial summary.
          </p>
        </div>

        {/* Wallet Balance Card */}
        <Card className="w-full max-w-md">
          <CardHeader className="pb-3">
            <CardDescription>Available Balance</CardDescription>
            {isLoading ? (
              <Skeleton className="h-8 w-32 mt-1" />
            ) : (
              <CardTitle className="text-4xl">
                {data?.data?.balance ?? 0} BDT
              </CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Last updated just now
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <Link to="/user/add-money" className="flex flex-col items-center gap-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <Button variant="ghost" className="font-medium">
                  Add Money
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Link to="/user/withdraw" className="flex flex-col items-center gap-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ArrowUpRight className="h-6 w-6 text-primary" />
                </div>
                <Button variant="ghost" className="font-medium">
                  Withdraw
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Link to="/user/send-money" className="flex flex-col items-center gap-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <Button variant="ghost" className="font-medium">
                  Send Money
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your transactions history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40 rounded border border-dashed">
              <p className="text-muted-foreground">No recent activity</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}