import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { LogOut, UserCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { ModeToggle } from "./ModeToggler";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
    } catch {
      // ignore network/server errors
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
      dispatch(authApi.util.resetApiState());
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="border-b px-4 md:px-6 sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12L20 12" />
                  <path d="M4 6L20 6" />
                  <path d="M4 18L20 18" />
                </svg>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4">
              <nav className="grid gap-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`rounded-md px-3 py-2 text-sm transition-colors ${
                      location.pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-medium">
            <Logo />
          </Link>
        </div>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    to={link.href}
                    className={`rounded-md px-3 py-2 text-sm transition-colors ${
                      location.pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data ? (
            <div className="flex items-center gap-3">
              <div className="cursor-pointer" title={data.data.name}>
                <Link to={`/${data.data.role}`}>
                  <UserCircle />
                </Link>
              </div>
              <Button onClick={handleLogout} variant="outline">
                Logout <LogOut />
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
