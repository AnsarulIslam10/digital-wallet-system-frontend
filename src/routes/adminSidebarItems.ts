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
        ],
    },
    {
        title: "Digital Wallet Management",
        items: [
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