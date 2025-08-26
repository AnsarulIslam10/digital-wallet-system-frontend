/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Accept string input, convert to number in refine
const schema = z.object({
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 10, {
      message: "Minimum add is 10 BDT",
    }),
});

type AddMoneyInputs = z.infer<typeof schema>;

export default function AddMoney() {
  const [addMoney, { isLoading }] = useAddMoneyMutation();
  const form = useForm<AddMoneyInputs>({
    resolver: zodResolver(schema),
    defaultValues: { amount: "" },
  });

  const onSubmit = async (values: AddMoneyInputs) => {
    try {
      await addMoney({ amount: Number(values.amount) }).unwrap();
      toast.success("Money added successfully");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add money");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add Money</h2>
          <p className="text-muted-foreground">
            Fund your wallet using one of our secure payment methods
          </p>
        </div>

        {/* Add Money Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Amount</CardTitle>
            <CardDescription>
              How much would you like to add to your wallet?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-6 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Add Money"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/40 mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Things to know</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Transactions are processed securely</li>
            <li>Funds are available in your wallet immediately</li>
            <li>No hidden fees or charges</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
