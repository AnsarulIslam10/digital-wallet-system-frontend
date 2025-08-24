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
import { useGetAllTransactionsQuery } from "@/redux/features/admin/admin.api";
import { Calendar, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const queryArgs = {
    page: currentPage,
    limit,
    type: filterType !== "all" ? filterType : undefined,
    sort: sortOrder,
  };

  const { data, isLoading, isError, error } = useGetAllTransactionsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data)

  const transactions: any[] = data?.data?.data || [];

  const meta = data?.data?.meta || { totalPages: 1, total: 0 };

  const totalPages = meta?.totalPages;

  const getTransactionBadge = (type: string) => {
    const badgeVariants: Record<string, string> = {
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
      <Badge
        variant="outline"
        className={badgeVariants[type] || badgeVariants.default}
      >
        {type.replace("-", " ")}
      </Badge>
    );
  };

  const formatAmount = (amount: number, type: string) => {
    const isNegative = ["withdraw", "send", "fee", "cash-out"].includes(type);
    return (
      <span className={`font-semibold ${isNegative ? "text-red-600" : "text-green-600"}`}>
        {isNegative ? "-" : "+"} {amount} BDT
      </span>
    );
  };

  const getTransactionDescription = (tx: any) => {
    if (tx.description) return tx.description;
    switch (tx.type) {
      case "send":
        return `Sent to user`;
      case "receive":
        return `Received from user`;
      case "add":
        return "Wallet top-up";
      case "withdraw":
        return "Withdrawal from wallet";
      case "fee":
        return "Transaction fee";
      case "cash-in":
        return "Agent cash-in service";
      case "cash-out":
        return "Agent cash-out service";
      default:
        return "Transaction";
    }
  };

  const handleSortChange = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  if (isError) {
    toast.error("Failed to fetch transactions");
    return <p>Error: {(error as any)?.message || "Something went wrong"}</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">All Transactions</h2>
          <p className="text-muted-foreground">View and filter all transactions</p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Transactions</CardTitle>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {filterType === "all" ? "All Types" : filterType.replace("-", " ")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {["all","add","withdraw","send","receive","fee","cash-in","cash-out"].map(type => (
                    <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                      {type === "all" ? "All Types" : type.replace("-", " ")}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" variant="outline" className="gap-1" onClick={handleSortChange}>
                {sortOrder === "asc" ? "Oldest First" : "Newest First"}
              </Button>
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
                      <TableHead className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date & Time
                      </TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length > 0 ? (
                      transactions.map(tx => (
                        <TableRow key={tx._id}>
                          <TableCell className="font-medium">
                            {new Date(tx.createdAt).toLocaleDateString()} <br />
                            <span className="text-sm text-muted-foreground">
                              {new Date(tx.createdAt).toLocaleTimeString()}
                            </span>
                          </TableCell>
                          <TableCell>{getTransactionBadge(tx.type)}</TableCell>
                          <TableCell className="text-right">{formatAmount(tx.amount, tx.type)}</TableCell>
                          <TableCell className="text-muted-foreground">{getTransactionDescription(tx)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <Calendar className="h-12 w-12 text-muted-foreground" />
                            <p className="text-lg font-medium">No transactions found</p>
                            <p className="text-muted-foreground">No transaction data available</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

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

                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
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
