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
import {
  useGetAgentTransactionsQuery
} from "@/redux/features/transaction/transaction.api";
import { ArrowDownToLine, ArrowUpFromLine, ArrowUpToLine } from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Overview() {
  const { data: walletData, isLoading: walletLoading } =
    useGetAgentTransactionsQuery(undefined);
  const { data: txData, isLoading: txLoading } = useGetAgentTransactionsQuery({
    page: 1,
    limit: 5,
  });

  const transactions = txData?.data?.data || [];
  console.log(transactions);
  // Calculate total cash in/out based on correct transaction types
  const totalCashIn = transactions
    .filter((tx: any) => tx.type === "cash-in")
    .reduce((sum: number, tx: any) => sum + tx.amount, 0);

  const totalCashOut = transactions
    .filter(
      (tx: any) =>
        tx.type === "cash-out" || tx.type === "send" || tx.type === "withdraw"
    )
    .reduce((sum: number, tx: any) => sum + tx.amount, 0);

  // For the chart, map types correctly
  const chartData = transactions.map((tx: any) => ({
    name: tx.type === "cash-in" ? "Cash-In" : "Cash-Out",
    amount: tx.amount,
  }));

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <Slide direction="down" triggerOnce>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              SecurePay Agent
            </h2>
            <p className="text-muted-foreground">
              Manage your agent operations and track activities.
            </p>
          </div>
        </Slide>

        {/* Top Summary */}
        <Fade cascade damping={0.2} triggerOnce>
          <div className="grid gap-6 md:grid-cols-3">
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

            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardDescription>Total Cash-In</CardDescription>
                  <CardTitle className="text-2xl">{totalCashIn} BDT</CardTitle>
                </div>
                <ArrowDownToLine className="h-6 w-6 text-green-600" />
              </CardHeader>
            </Card>

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
        </Fade>

        {/* Actions */}
        <Fade cascade damping={0.2} direction="up" triggerOnce>
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
        </Fade>

        {/* Recent Activity */}
        <Slide direction="up" triggerOnce>
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
        </Slide>
      </div>
    </div>
  );
}
