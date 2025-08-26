import { Navigate } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { type TRole } from "@/types";
import { type ComponentType } from "react";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
  
    if (!isLoading && !data?.data?.phone) {
      return <Navigate to="/login" />;
    }

    if (
      (requiredRole && !isLoading && requiredRole !== data?.data?.role)
    ) {
      return <Navigate to="/unauthorized" />;
    }
    if (data?.data?.isBlocked) {
      return <Navigate to="/blocked" />;
    }

    return <Component />;
  };
};
