import DepositMoney from "@/pages/User/DepositMoney";
import Overview from "@/pages/User/Overview";
import Profile from "@/components/Profile";
import SendMoney from "@/pages/User/SendMoney";
import Transactions from "@/pages/User/Transactions";
import Withdraw from "@/pages/User/Withdraw";
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
                title: "Deposit Money",
                url: "/user/deposit-money",
                component: DepositMoney
            },
            {
                title: "Send Money",
                url: "/user/send-money",
                component: SendMoney
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