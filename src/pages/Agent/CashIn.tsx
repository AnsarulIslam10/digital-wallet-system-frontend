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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCashInMutation } from "@/redux/features/transaction/transaction.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema
const schema = z.object({
  receiverPhone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, "Invalid Bangladesh phone number"),
  amount: z.number().min(1, "Amount must be at least 1 BDT"),
});

type CashInInputs = z.infer<typeof schema>;

export default function CashIn() {
  const [cashIn, { isLoading }] = useCashInMutation();
  const form = useForm<CashInInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      receiverPhone: "",
      amount: 0,
    },
  });

  const onSubmit = async (values: CashInInputs) => {
    try {
      await cashIn(values).unwrap();
      toast.success("Cash in successful!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Cash in failed");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Cash In</CardTitle>
          <CardDescription>Deposit money into a user's wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Receiver Phone */}
              <FormField
                control={form.control}
                name="receiverPhone"
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
                          className="pl-10 py-6"
                          {...field}
                        />
                      </div>
                    </FormControl>
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
                    <FormLabel>Amount (BDT)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Cash In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
