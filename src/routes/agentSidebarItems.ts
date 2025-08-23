import Profile from "@/components/Profile";
import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import Overview from "@/pages/Agent/Overview";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/agent/overview",
                component: Overview
            },
            {
                title: "Profile",
                url: "/agent/profile",
                component: Profile
            },
            {
                title: "Cash In",
                url: "/agent/cash-in",
                component: CashIn
            },
            {
                title: "Cash Out",
                url: "/agent/cash-out",
                component: CashOut
            },

        ],
    }
]