import * as React from "react";
import { useLocation, Link } from "react-router";
import Logo from "@/assets/icons/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { ModeToggle } from "./layout/ModeToggler";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  const location = useLocation();

  const navMain = userData ? getSidebarItems(userData?.data.role) : [];

  const SidebarSkeleton = () => (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Skeleton className="h-4 w-24" />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {Array.from({ length: 4 }).map((_, idx) => (
            <SidebarMenuItem key={idx}>
              <Skeleton className="h-8 w-full rounded-lg my-1" />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <Logo />
          </Link>
          <ModeToggle />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {isLoading ? (
          <SidebarSkeleton />
        ) : (
          navMain.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className={`relative flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold shadow-sm"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-md bg-primary"></div>
                            )}
                            <span>{item.title}</span>
                            {isActive && (
                              <div className="absolute inset-0 rounded-lg bg-primary/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"></div>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
