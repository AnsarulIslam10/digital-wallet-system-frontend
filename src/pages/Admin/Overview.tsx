/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAllTransactionsQuery,
  useGetAllUsersQuery,
} from "@/redux/features/admin/admin.api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  UserCheck,
  UserCog,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const Overview = () => {
  const { data: userData, isLoading: usersLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 1000,
  });
  const { data: transactionData, isLoading: txLoading } =
    useGetAllTransactionsQuery({
      page: 1,
      limit: 1000,
    });

  if (usersLoading || txLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const users = userData?.data || [];
  const transactions = transactionData?.data?.data || [];

  const totalUsers = users.length;
  const totalAgents = users.filter((u: any) => u.role === "agent").length;
  const totalAdmins = users.filter((u: any) => u.role === "admin").length;
  const totalRegularUsers = users.filter((u: any) => u.role === "user").length;
  const approvedAgents = users.filter(
    (u: any) => u.role === "agent" && u.isApproved
  ).length;

  const totalTransactions = transactions.length;
  const transactionVolume = transactions.reduce(
    (sum: number, tx: any) => sum + tx.amount,
    0
  );
  const averageTransaction =
    totalTransactions > 0 ? transactionVolume / totalTransactions : 0;

  const transactionTypes = transactions?.reduce((acc: any, tx: any) => {
    acc[tx.type] = (acc[tx.type] || 0) + 1;
    return acc;
  }, {});

  const roleData = [
    { name: "Users", value: totalRegularUsers, color: "#6366F1" },
    { name: "Agents", value: totalAgents, color: "#10B981" },
    { name: "Admins", value: totalAdmins, color: "#F59E0B" },
  ];

  const txTypeData = Object.entries(transactionTypes).map(
    ([name, value], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: COLORS[index % COLORS.length],
    })
  );

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      name: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      amount: 0,
    };
  });

  transactions.forEach((tx: any) => {
    const txDate = new Date(tx.createdAt);
    const dayIndex = Math.floor(
      (Date.now() - txDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (dayIndex >= 0 && dayIndex < 30) {
      last30Days[29 - dayIndex].amount += tx.amount;
    }
  });

  const recentTxData = transactions.slice(-7).map((tx: any, index: number) => ({
    name: `Tx ${transactions.length - 6 + index}`,
    amount: tx.amount,
    type: tx.type,
  }));

  const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
    trend,
  }: {
    title: string;
    value: string | number;
    icon: any;
    description?: string;
    trend?: string;
  }) => (
    <Fade cascade triggerOnce direction="up">
      <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-background to-muted/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
              {trend && <span className="text-green-600 ml-1">{trend}</span>}
            </p>
          )}
        </CardContent>
      </Card>
    </Fade>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Slide direction="down" triggerOnce>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">Welcome to your admin dashboard</p>
        </div>
      </Slide>

      {/* Stat Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          description="All registered users"
          trend="+12%"
        />
        <StatCard
          title="Agents"
          value={totalAgents}
          icon={UserCheck}
          description={`${approvedAgents} approved`}
        />
        <StatCard
          title="Admins"
          value={totalAdmins}
          icon={UserCog}
          description="System administrators"
        />
        <StatCard
          title="Transactions"
          value={totalTransactions}
          icon={Activity}
          description="Total transactions"
          trend="+8%"
        />
        <StatCard
          title="Transaction Volume"
          value={`৳${transactionVolume.toLocaleString()}`}
          icon={DollarSign}
          description="Total amount processed"
        />
        <StatCard
          title="Avg. Transaction"
          value={`৳${averageTransaction.toFixed(2)}`}
          icon={TrendingUp}
          description="Average transaction value"
        />
      </div>

      {/* Charts Grid */}
      <Fade cascade triggerOnce direction="up">
        <div className="grid gap-6 md:grid-cols-2">
          {/* User Distribution Pie Chart */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown of users by role</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Transaction Types Pie Chart */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle>Transaction Types</CardTitle>
              <CardDescription>Distribution of transaction types</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={txTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {txTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} transactions`, "Count"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </Fade>

      {/* Additional Charts Row */}
      <Fade cascade triggerOnce direction="up">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Transaction Volume Over Time */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle>Transaction Volume (Last 30 Days)</CardTitle>
              <CardDescription>Daily transaction amount trends</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last30Days}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.1}
                  />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [
                      `৳${Number(value).toLocaleString()}`,
                      "Amount",
                    ]}
                    labelStyle={{ color: "#1F2937" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ fill: "#6366F1", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#4F46E5" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Transactions Bar Chart */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Last 7 transaction amounts</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recentTxData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.1}
                  />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [
                      `৳${Number(value).toLocaleString()}`,
                      "Amount",
                    ]}
                    labelStyle={{ color: "#1F2937" }}
                  />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]} fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </Fade>
    </div>
  );
};

export default Overview;
