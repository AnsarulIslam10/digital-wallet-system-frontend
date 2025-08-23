import SendMoney from "@/pages/User/SendMoney";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Send Money",
                url: "/user/send-money",
                component: SendMoney
            },
        ],
    }
]