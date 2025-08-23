import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useUpdateProfileMutation,
  useGetMyProfileQuery,
} from "@/redux/features/user/user.api";
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
import { Loader2, User, Phone, Lock, Mail, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Zod schema for profile update
const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    phone: z
      .string()
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, "Invalid Bangladesh phone number")
      .optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{6}$/.test(val), {
        message: "New password must be a 6-digit number",
      }),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) return false;
      return true;
    },
    {
      message: "To change password, currentPassword is required",
      path: ["currentPassword"],
    }
  );

type ProfileInputs = z.infer<typeof schema>;

export default function Profile() {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch,
  } = useGetMyProfileQuery(undefined);

  const form = useForm<ProfileInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profileData?.data?.name || "",
      phone: profileData?.data?.phone || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  React.useEffect(() => {
    if (profileData?.data) {
      form.reset({
        name: profileData.data.name || "",
        phone: profileData.data.phone || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [profileData, form]);

  const onSubmit = async (values: ProfileInputs) => {
    try {
      const submitValues = { ...values };

      // Remove password fields if empty
      if (!submitValues.currentPassword) delete submitValues.currentPassword;
      if (!submitValues.newPassword) delete submitValues.newPassword;

      await updateProfile(submitValues).unwrap();
      toast.success("Profile updated successfully");
      refetch();
      form.reset({ ...form.getValues(), currentPassword: "", newPassword: "" });
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to update profile");
    }
  };

  if (isProfileLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h2>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {profileData?.data?.name || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">
                    {profileData?.data?.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">
                    {profileData?.data?.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium">
                    {profileData?.data?.createdAt
                      ? new Date(
                          profileData.data.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {profileData?.data?.role && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <Badge variant="secondary" className="capitalize">
                    {profileData.data.role}
                  </Badge>
                  {profileData.data.isApproved && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      Approved
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Update Profile Form Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Update Profile</CardTitle>
              <CardDescription>Edit your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground">
                              <User className="h-4 w-4" />
                            </span>
                            <Input
                              placeholder="Enter your full name"
                              className="pl-10 py-6"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your name as it should appear on your account
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                            </span>
                            <Input
                              placeholder="01XXXXXXXXX"
                              className="pl-10 py-6"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your 11-digit phone number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  {/* Current Password */}
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground">
                              <Lock className="h-4 w-4" />
                            </span>
                            <Input
                              type="password"
                              placeholder="Enter current password"
                              className="pl-10 py-6"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Required to change password
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* New Password */}
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground">
                              <Lock className="h-4 w-4" />
                            </span>
                            <Input
                              type="password"
                              placeholder="Enter new 6-digit password"
                              className="pl-10 py-6"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter a 6-digit password
                        </FormDescription>
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
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
