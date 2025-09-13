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
import { useLoginMutation, authApi } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import Password from "@/components/ui/Password";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  phone: z.string().min(11, { message: "Phone number is too short" }),
  password: z.string().min(6, { message: "Password is too short" }),
});

type LoginInputs = z.infer<typeof loginSchema>;

function getRedirectPathByRole(role?: string) {
  switch (role) {
    case "agent":
      return "/agent/overview";
    case "admin":
      return "/admin/overview";
    default:
      return "/user/overview";
  }
}

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<LoginInputs>({ resolver: zodResolver(loginSchema) });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginInputs) => {
    try {
      const res = await login(data).unwrap();

      const payload = (res as any)?.data ?? res;
      const accessToken = payload?.accessToken;
      const refreshToken = payload?.refreshToken;
      const role = payload?.user?.role;

      if (!accessToken) throw new Error("Missing access token");

      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      if (role) localStorage.setItem("userRole", role);

      dispatch(authApi.util.invalidateTags(["USER"]));

      toast.success("Logged in successfully");
      navigate(getRedirectPathByRole(role), { replace: true });
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const handleDemoLogin = (type: "admin" | "agent" | "user") => {
    const demoCredentials = { phone: "", password: "123456" };

    switch (type) {
      case "admin":
        demoCredentials.phone = "01711111111";
        break;
      case "agent":
        demoCredentials.phone = "01799999999";
        break;
      case "user":
        demoCredentials.phone = "01722222222";
        break;
    }

    form.setValue("phone", demoCredentials.phone);
    form.setValue("password", demoCredentials.password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your phone number and password to login
        </p>
      </div>
      <Separator />
      <p className="text-center text-2xl">Demo Credentials</p>
      <div className="flex justify-center gap-2">
        <Button size="sm" onClick={() => handleDemoLogin("admin")}>
          Admin Demo
        </Button>
        <Button size="sm" onClick={() => handleDemoLogin("agent")}>
          Agent Demo
        </Button>
        <Button size="sm" onClick={() => handleDemoLogin("user")}>
          User Demo
        </Button>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
