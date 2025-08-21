/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import Password from "@/components/ui/Password";

// Validation schema
const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }).max(50),
    phone: z.string().min(11, { message: "Phone number is too short" }),
    email: z.email().optional(),
    password: z.string().min(6, { message: "Password is too short" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password is too short" }),
    role: z.enum(["user", "agent", "admin"]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo: any = {
      name: data.name,
      phone: data.phone,
      password: data.password,
    };
    if (data.email) userInfo.email = data.email;
    if (data.role) userInfo.role = data.role;

    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("User created successfully");

      // Navigate to login directly
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="01799999999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
