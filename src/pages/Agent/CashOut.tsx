/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCashOutMutation } from "@/redux/features/transaction/transaction.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, Lock, Phone } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  userPhone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, "Invalid Bangladesh phone number"),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Amount must be greater than 0")
  ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type CashOutInputs = z.infer<typeof schema>;

export default function CashOut() {
  const [agentCashOut, { isLoading }] = useCashOutMutation();

  const form = useForm<CashOutInputs>({
    resolver: zodResolver(schema) as any, // cast to any to fix TS type mismatch
    defaultValues: {
      userPhone: "",
      amount: 0,
      password: "",
    },
  });

  const onSubmit: SubmitHandler<CashOutInputs> = async (values) => {
    try {
      await agentCashOut(values).unwrap();
      toast.success("Cash-out successful");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Cash-out failed");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Agent Cash-Out</CardTitle>
          <CardDescription>Withdraw money from a user’s wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* User Phone */}
              <FormField
                control={form.control}
                name="userPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Phone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-4 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                        </span>
                        <Input
                          placeholder="01XXXXXXXXX"
                          className="pl-10 py-3"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      User's registered phone number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-4 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                        </span>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          className="pl-10 py-3"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Amount to withdraw</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* User Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-4 text-muted-foreground">
                          <Lock className="h-4 w-4" />
                        </span>
                        <Input
                          type="password"
                          placeholder="Enter user's password"
                          className="pl-10 py-3"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Required to authorize cash-out
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3"
              >
                {isLoading ? "Processing..." : "Cash Out"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
