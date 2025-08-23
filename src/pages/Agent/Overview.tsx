import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Link } from "react-router";

export default function Overview() {
  const { data, isLoading } = useGetMyWalletQuery(undefined);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SecurePay Agent</h2>
          <p className="text-muted-foreground">
            Manage your agent operations and track activities.
          </p>
        </div>

        {/* Top Summary Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Wallet Balance */}
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Balance</CardDescription>
              {isLoading ? (
                <Skeleton className="h-8 w-32 mt-1" />
              ) : (
                <CardTitle className="text-3xl">
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

          {/* Cash-In Summary */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardDescription>Total Cash-In</CardDescription>
                <CardTitle className="text-2xl">15,000 BDT</CardTitle>
              </div>
              <ArrowDownToLine className="h-6 w-6 text-green-600" />
            </CardHeader>
          </Card>

          {/* Cash-Out Summary */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardDescription>Total Cash-Out</CardDescription>
                <CardTitle className="text-2xl">8,500 BDT</CardTitle>
              </div>
              <ArrowUpFromLine className="h-6 w-6 text-red-600" />
            </CardHeader>
          </Card>
        </div>

        {/* Actions (Cash-In / Cash-Out) */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6 flex flex-col items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <ArrowDownToLine className="h-6 w-6 text-green-600" />
              </div>
              <Link to="/agent/cash-in">
                <Button className="w-full">Cash-In</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center gap-3">
              <div className="p-3 bg-red-100 rounded-full">
                <ArrowUpFromLine className="h-6 w-6 text-red-600" />
              </div>
              <Link to="/agent/cash-out">
                <Button className="w-full">Cash-Out</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest agent transactions
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
