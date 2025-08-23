import CashIn from "@/pages/Agent/CashIn";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Cash In",
                url: "/agent/cash-in",
                component: CashIn
            },
        ],
    }
]