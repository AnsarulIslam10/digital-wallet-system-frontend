import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import CashIn from "@/pages/Agent/CashIn";
import { ContactPage } from "@/pages/ContactPage";
import { FAQ } from "@/pages/FAQ";
import FeaturesPage from "@/pages/FeaturesPage";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import { PricingPage } from "@/pages/PricingPage";

import Register from "@/pages/Register";
import SendMoney from "@/pages/User/SendMoney";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: FeaturesPage,
        path: "features",
      },
      {
        Component: PricingPage,
        path: "pricing",
      },
      {
        Component: ContactPage,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {
        Component: SendMoney,
        path: "send-money",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/agent",
    children: [
      {
        Component: CashIn,
        path: "cash-in",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);
