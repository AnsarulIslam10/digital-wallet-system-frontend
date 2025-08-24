
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="h-16"
              />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Move money fast. Securely. Anywhere in Bangladesh with{" "}
                <span className="text-primary">SecurePay</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Send, receive, cash-in/out, and track every taka with real-time insights.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/register">
                <Button size="lg">Get started</Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline">
                  See features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
