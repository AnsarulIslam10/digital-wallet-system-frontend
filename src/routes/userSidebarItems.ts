import AddMoney from "@/pages/User/AddMoney";
import Overview from "@/pages/User/Overview";
import Profile from "@/pages/User/Profile";
import Withdraw from "@/pages/User/SendMoney";
import Transactions from "@/pages/User/Transactions";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/user/overview",
                component: Overview
            },
             {
                title: "Profile",
                url: "/user/profile",
                component: Profile
            },
            {
                title: "Add Money",
                url: "/user/add-money",
                component: AddMoney
            },
            {
                title: "Withdraw",
                url: "/user/withdraw",
                component: Withdraw
            },
           
            {
                title: "Transactions",
                url: "/user/transactions",
                component: Transactions
            },
        ],
    }
]