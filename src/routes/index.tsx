import App from "@/App";
import About from "@/pages/About";
import { ContactPage } from "@/pages/ContactPage";
import FeaturesPage from "@/pages/FeaturesPage";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import { PricingPage } from "@/pages/PricingPage";

import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

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
