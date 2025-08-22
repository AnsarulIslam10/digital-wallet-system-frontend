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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import Password from "@/components/ui/Password";

const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }).max(50),
    phone: z.string().min(11, { message: "Phone number is too short" }),
    email: z.string().email().optional(),
    password: z.string().min(6, { message: "Password is too short" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password is too short" }),
    role: z.enum(["user", "agent"]), // <- no .default()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterInputs = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user", // ✅ default goes here
    },
  });

  const onSubmit = async (data: RegisterInputs) => {
    const userInfo: any = {
      name: data.name,
      phone: data.phone,
      password: data.password,
      role: data.role,
    };
    if (data.email) userInfo.email = data.email;

    try {
      await registerUser(userInfo).unwrap();
      toast.success("User created successfully");
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your information to create your account
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
                    <Input placeholder="01XXXXXXXXX" {...field} />
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
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4">
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
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <RadioGroupItem id="role-user" value="user" />
                        <Label htmlFor="role-user">User</Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-3">
                        <RadioGroupItem id="role-agent" value="agent" />
                        <Label htmlFor="role-agent">Agent</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? "Creating..." : "Register"}
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
