/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useWithdrawMutation } from "@/redux/features/transaction/transaction.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";

const schema = z.object({
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 50, {
      message: "Minimum withdraw is 50 BDT",
    }),
  password: z.string().min(6, "Password is required"),
});

type WithdrawInputs = z.infer<typeof schema>;

export default function Withdraw() {
  const [withdraw, { isLoading }] = useWithdrawMutation();
  const form = useForm<WithdrawInputs>({
    resolver: zodResolver(schema),
    defaultValues: { amount: "", password: "" },
  });

  const onSubmit = async (values: WithdrawInputs) => {
    try {
      await withdraw({
        ...values,
        amount: Number(values.amount),
      }).unwrap();
      toast.success("Withdrawal successful");
      form.reset();
    } catch (err: any) {
      if (
        err?.data?.errors &&
        Array.isArray(err.data.errors) &&
        err.data.errors.length > 0
      ) {
        const firstError = err.data.errors[0];
        toast.error(firstError.message);

        if (firstError.field && form.setError) {
          form.setError(firstError.field as keyof WithdrawInputs, {
            type: "manual",
            message: firstError.message,
          });
        }
      } else {
        toast.error(err?.data?.message || "Failed to process withdrawal");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Withdraw Funds</h2>
          <p className="text-muted-foreground">
            Transfer money from your wallet to your bank account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter Withdrawal Details</CardTitle>
            <CardDescription>
              How much would you like to withdraw from your wallet?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (BDT)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-4 text-muted-foreground">
                            ৳
                          </span>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            className="pl-8 text-lg py-6"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)} // keep string
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Minimum withdrawal: 50 BDT</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Verification</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-4 text-muted-foreground">
                            <Shield className="h-4 w-4" />
                          </span>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="pl-10 py-6"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Confirm your identity with your password
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full py-6 text-lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Withdraw Funds"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
