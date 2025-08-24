import Profile from "@/components/Profile";
import ManageAgents from "@/pages/Admin/ManageAgents";
import ManageUsers from "@/pages/Admin/ManageUsers";
import Overview from "@/pages/Admin/Overview";
import Transactions from "@/pages/Admin/Transactions";
import Users from "@/pages/Admin/Users";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/admin/overview",
                component: Overview
            },
            {
                title: "Profile",
                url: "/admin/profile",
                component: Profile
            },
        ],
    },
    {
        title: "Digital Wallet Management",
        items: [
            {
                title: "Manage Users",
                url: "/admin/manage-users",
                component: ManageUsers
            },
            {
                title: "Manage Agents",
                url: "/admin/manage-agents",
                component: ManageAgents
            },
            {
                title: "Transactions",
                url: "/admin/transactions",
                component: Transactions
            },
            {
                title: "Users",
                url: "/admin/users",
                component: Users
            }
        ]
    }
]