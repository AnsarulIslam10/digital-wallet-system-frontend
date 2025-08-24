/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { ArrowDownToLine, ArrowUpFromLine, ArrowUpToLine } from "lucide-react";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Overview() {
  const { data: walletData, isLoading: walletLoading } =
    useGetMyWalletQuery(undefined);
  const { data: txData, isLoading: txLoading } = useGetMyTransactionsQuery({
    page: 1,
    limit: 5,
  });

  const transactions = txData?.data?.data || [];

  // Prepare chart data
  const chartData = transactions.map((tx: any) => ({
    name: tx.type === "add" ? "Cash-In" : "Cash-Out",
    amount: tx.amount,
  }));

  // Calculate totals
  const totalCashIn = transactions
    .filter((tx: any) => tx.type === "add")
    .reduce((sum, tx: any) => sum + tx.amount, 0);
  const totalCashOut = transactions
    .filter((tx: any) => tx.type === "send" || tx.type === "withdraw")
    .reduce((sum, tx: any) => sum + tx.amount, 0);

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

        {/* Top Summary */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Wallet Balance */}
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Balance</CardDescription>
              {walletLoading ? (
                <Skeleton className="h-8 w-32 mt-1" />
              ) : (
                <CardTitle className="text-3xl">
                  {walletData?.data?.balance ?? 0} BDT
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
                <CardTitle className="text-2xl">{totalCashIn} BDT</CardTitle>
              </div>
              <ArrowDownToLine className="h-6 w-6 text-green-600" />
            </CardHeader>
          </Card>

          {/* Cash-Out Summary */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardDescription>Total Cash-Out</CardDescription>
                <CardTitle className="text-2xl">{totalCashOut} BDT</CardTitle>
              </div>
              <ArrowUpFromLine className="h-6 w-6 text-red-600" />
            </CardHeader>
          </Card>
        </div>

        {/* Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <Link
                to="/agent/cash-in"
                className="flex flex-col items-center gap-2"
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <ArrowDownToLine className="h-6 w-6 text-primary" />
                </div>
                <Button variant="ghost" className="font-medium">
                  Cash In
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Link
                to="/agent/cash-out"
                className="flex flex-col items-center gap-2"
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <ArrowUpToLine className="h-6 w-6 text-primary" />
                </div>
                <Button variant="ghost" className="font-medium">
                  Cash Out
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest agent transactions (type & amount)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {txLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : transactions.length ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="amount"
                    fill="#3b82f6"
                    label={{ position: "top" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-40 rounded border border-dashed">
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
