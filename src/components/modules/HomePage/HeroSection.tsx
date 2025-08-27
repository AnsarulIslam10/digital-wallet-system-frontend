import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export const HeroSection = () => {
  const { data } = useUserInfoQuery(undefined);
  const getStartRoute = () => {
    if (!data) return "/login";
    switch (data.data.role) {
      case "admin":
        return "/admin";
      case "agent":
        return "/agent";
      case "user":
        return "/user";
      default:
        return "/login";
    }
  };
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <Zoom>
              <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
                <svg
                  width="150"
                  height="100"
                  viewBox="0 0 63 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M63 29.3506L38.117 5.08907C37.4008 4.39081 36.4402 4 35.44 4C31.9983 4 30.2991 8.18294 32.7659 10.583L59.4712 36.5666C60.7577 37.8183 59.8715 40 58.0765 40H9.65685C8.59599 40 7.57857 39.5786 6.82843 38.8284L1.17157 33.1716C0.421426 32.4214 0 31.404 0 30.3431V10.6484L24.883 34.9109C25.5992 35.6092 26.5598 36 27.5601 36C31.0017 36 32.7009 31.8171 30.2342 29.417L3.52882 3.43345C2.24227 2.18166 3.12849 0 4.92354 0L53.3431 0C54.404 0 55.4214 0.421427 56.1716 1.17157L61.8284 6.82843C62.5786 7.57857 63 8.59599 63 9.65685V29.3506Z"
                    fill="#007BFF"
                  ></path>
                </svg>
              </div>
            </Zoom>

            {/* Heading + paragraph */}
            <Fade direction="up" cascade damping={0.2}>
              <div>
                <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                  Move money fast. Securely. Anywhere in Bangladesh with <br />
                  <span className="text-primary">SecurePay</span>
                </h1>
                <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                  Send, receive, cash-in/out, and track every taka with
                  real-time insights.
                </p>
              </div>
            </Fade>

            {/* Buttons */}
            <Slide direction="up">
              <div className="mt-6 flex justify-center gap-3">
                <Link to={getStartRoute()}>
                  <Button size="lg">Get started</Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline">
                    See features
                  </Button>
                </Link>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    </section>
  );
};
