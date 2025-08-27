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
import { ArrowUpRight, Plus, Send } from "lucide-react";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Fade } from "react-awesome-reveal";
import React, { useEffect } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

export default function Overview() {
  const { data: walletData, isLoading: walletLoading } =
    useGetMyWalletQuery(undefined);
  const { data: txData, isLoading: txLoading } = useGetMyTransactionsQuery({
    page: 1,
    limit: 5,
  });

  const transactions = txData?.data?.data || [];

  const chartData = transactions.map((tx: any) => ({
    name: tx.type,
    amount: tx.amount,
  }));

  // Function to create a tour
  const createTour = () => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        scrollTo: true,
        cancelIcon: { enabled: true },
        classes: "shepherd-modal",
        highlightClass: "shepherd-highlight",
      },
    });

    tour.addStep({
      id: "wallet-balance",
      text: "This card shows your total wallet balance. Keep track of your available funds easily.",
      attachTo: { element: ".wallet-balance", on: "bottom" },
      classes: "shepherd-centered-text",
      buttons: [
        { text: "Next", action: tour.next, classes: "shepherd-button-primary" },
      ],
    });

    tour.addStep({
      id: "deposit-money",
      text: "Use this section to deposit money into your wallet quickly and securely.",
      attachTo: { element: ".deposit-card", on: "top" },
      classes: "shepherd-centered-text",
      buttons: [
        {
          text: "Back",
          action: tour.back,
          classes: "shepherd-button-secondary",
        },
        { text: "Next", action: tour.next, classes: "shepherd-button-primary" },
      ],
    });

    tour.addStep({
      id: "withdraw-money",
      text: "Here you can withdraw money from your wallet whenever you need it.",
      attachTo: { element: ".withdraw-card", on: "top" },
      classes: "shepherd-centered-text",
      buttons: [
        {
          text: "Back",
          action: tour.back,
          classes: "shepherd-button-secondary",
        },
        { text: "Next", action: tour.next, classes: "shepherd-button-primary" },
      ],
    });

    tour.addStep({
      id: "send-money",
      text: "Send money to friends or other users easily using this option.",
      attachTo: { element: ".send-card", on: "top" },
      classes: "shepherd-centered-text",
      buttons: [
        {
          text: "Back",
          action: tour.back,
          classes: "shepherd-button-secondary",
        },
        { text: "Next", action: tour.next, classes: "shepherd-button-primary" },
      ],
    });

    tour.addStep({
      id: "recent-activity",
      text: "This chart shows your recent transactions. Quickly see what was sent, received, or withdrawn.",
      attachTo: { element: ".recent-activity", on: "top" },
      classes: "shepherd-centered-text",
      buttons: [
        {
          text: "Back",
          action: tour.back,
          classes: "shepherd-button-secondary",
        },
        {
          text: "Finish",
          action: tour.complete,
          classes: "shepherd-button-primary",
        },
      ],
    });

    return tour;
  };

  // Auto-start the tour on first visit
  useEffect(() => {
    const firstVisit = localStorage.getItem("overviewTourSeen");
    if (!firstVisit) {
      const tour = createTour();
      tour.start();
      localStorage.setItem("overviewTourSeen", "true");
    }
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Restart Tour Button */}
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => {
            const tour = createTour();
            tour.start();
          }}
        >
          Start Tour
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <Fade triggerOnce>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">SecurePay</h2>
            <p className="text-muted-foreground">
              Welcome back! Here's your financial summary.
            </p>
          </div>
        </Fade>

        {/* Wallet Balance */}
        <Fade triggerOnce>
          <Card className="w-full max-w-md wallet-balance">
            <CardHeader className="pb-3">
              <CardDescription>Available Balance</CardDescription>
              {walletLoading ? (
                <Skeleton className="h-8 w-32 mt-1" />
              ) : (
                <CardTitle className="text-4xl">
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
        </Fade>

        {/* Action Buttons */}
        <Fade cascade triggerOnce>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="deposit-card">
              <CardContent className="p-6">
                <Link
                  to="/user/add-money"
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="ghost" className="font-medium">
                    Deposit Money
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="withdraw-card">
              <CardContent className="p-6">
                <Link
                  to="/user/withdraw"
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-3 bg-primary/10 rounded-full">
                    <ArrowUpRight className="h-6 w-6 text-primary" />
                  </div>
                  <Button variant="ghost" className="font-medium">
                    Withdraw
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="send-card">
              <CardContent className="p-6">
                <Link
                  to="/user/send-money"
                  className="flex flex-col items-center gap-2"
                >
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
        </Fade>

        {/* Recent Activity */}
        <Fade triggerOnce>
          <Card className="mt-6 recent-activity">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Transactions overview (type & amount)
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
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-40 rounded border border-dashed">
                  <Fade triggerOnce>
                    <p className="text-muted-foreground">No recent activity</p>
                  </Fade>
                </div>
              )}
            </CardContent>
          </Card>
        </Fade>
      </div>
    </div>
  );
}
