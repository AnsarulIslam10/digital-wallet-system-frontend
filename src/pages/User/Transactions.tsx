/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { Calendar, Filter } from "lucide-react";
import { useState } from "react";

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [filterType, setFilterType] = useState<
    | "all"
    | "add"
    | "withdraw"
    | "send"
    | "receive"
    | "fee"
    | "cash-in"
    | "cash-out"
  >("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const queryArgs = {
    page: currentPage,
    limit,
    type: filterType !== "all" ? filterType : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  };

  const { data, isLoading, isError } = useGetMyTransactionsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });
  const transactions: any[] = data?.data?.data || [];
  const meta = data?.data?.meta || { page: 1, limit: 10, totalPages: 1 };
  const totalPages = meta.totalPages;

  const getTransactionBadge = (type: string) => {
    const badge: Record<string, string> = {
      add: "bg-green-100 text-green-800",
      withdraw: "bg-blue-100 text-blue-800",
      send: "bg-purple-100 text-purple-800",
      receive: "bg-amber-100 text-amber-800",
      fee: "bg-red-100 text-red-800",
      "cash-in": "bg-teal-100 text-teal-800",
      "cash-out": "bg-orange-100 text-orange-800",
      default: "bg-gray-100 text-gray-800",
    };
    return (
      <Badge variant="outline" className={badge[type] || badge.default}>
        {type.replace("-", " ")}
      </Badge>
    );
  };

  const formatAmount = (amount: number, type: string) => {
    const neg = ["withdraw", "send", "fee", "cash-out"].includes(type);
    return (
      <span
        className={`font-semibold ${neg ? "text-red-600" : "text-green-600"}`}
      >
        {neg ? "-" : "+"} {amount} BDT
      </span>
    );
  };

  if (isError) return <p>Error loading transactions.</p>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Transaction History
          </h2>
          <p className="text-muted-foreground">Filter by type or date range</p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>All Transactions</CardTitle>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {filterType === "all"
                      ? "All Types"
                      : filterType.replace("-", " ")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {[
                    "all",
                    "add",
                    "withdraw",
                    "send",
                    "receive",
                    "fee",
                    "cash-in",
                    "cash-out",
                  ].map((t) => (
                    <DropdownMenuItem
                      key={t}
                      onClick={() => setFilterType(t as any)}
                    >
                      {t === "all" ? "All Types" : t.replace("-", " ")}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* date filter  */}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded p-1 text-sm"
              />
              <span className="self-center">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded p-1 text-sm"
              />
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
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
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx._id}>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(tx.createdAt).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>{getTransactionBadge(tx.type)}</TableCell>
                        <TableCell>{tx.description || "—"}</TableCell>
                        <TableCell className="text-right">
                          {formatAmount(tx.amount, tx.type)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="mt-4 flex justify-end">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
