import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Fade, Slide } from "react-awesome-reveal";

export default function About() {
  const team = {
    heading: "Meet Our Team",
    description:
      "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
    members: [
      {
        id: "member-1",
        name: "Sarah Chen",
        role: "CEO & Founder",
        avatar:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      },
      {
        id: "member-2",
        name: "Marcus Rodriguez",
        role: "CTO",
        avatar:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      },
      {
        id: "member-3",
        name: "Emily Watson",
        role: "Head of Design",
        avatar:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      },
      {
        id: "member-4",
        name: "David Kim",
        role: "Lead Engineer",
        avatar:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      },
      {
        id: "member-5",
        name: "Lisa Thompson",
        role: "Product Manager",
        avatar:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      },
      {
        id: "member-6",
        name: "Alex Johnson",
        role: "UX Designer",
        avatar:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Slide direction="up" triggerOnce>
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container">
            <div className="mx-auto flex max-w-4xl flex-col gap-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                About Our Digital Wallet
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl mx-auto max-w-3xl leading-relaxed">
                Secure, fast, and convenient digital wallet for your everyday
                transactions. Learn our story, mission, and meet the team behind
                it.
              </p>
            </div>
          </div>
        </section>
      </Slide>

      {/* Story Section */}
      <Fade direction="left" cascade damping={0.2} triggerOnce>
        <section className="py-20 p-2">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    Our Story
                  </h2>
                  <div className="h-1 w-20 bg-primary mb-6 rounded-full"></div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Founded with a vision to simplify digital payments, our
                    Digital Wallet System was created to help users send,
                    receive, and manage money seamlessly. We focus on security,
                    reliability, and user-friendly features to make everyday
                    transactions easy for everyone.
                  </p>
                </div>
                <div className="bg-muted rounded-2xl p-8 h-64 flex items-center justify-center shadow-lg">
                  <div className="text-6xl opacity-20">💡</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fade>

      {/* Mission Section */}
      <Fade direction="right" cascade damping={0.2} triggerOnce>
        <section className="py-20 bg-accent/50 p-2 rounded-xl">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
                <div className="order-2 md:order-1 bg-background rounded-2xl p-8 h-64 flex items-center justify-center shadow-lg">
                  <div className="text-6xl opacity-20">🎯</div>
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    Our Mission
                  </h2>
                  <div className="h-1 w-20 bg-primary mb-6 rounded-full"></div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Our mission is to empower individuals and businesses by
                    providing a secure, fast, and accessible digital wallet that
                    simplifies payments and improves financial inclusion. We aim
                    to make digital transactions smooth, transparent, and
                    trustworthy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fade>

      {/* Team Section */}
      <Slide direction="up" triggerOnce>
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {team.heading}
              </h2>
              <div className="h-1 w-16 bg-primary mx-auto mb-6 rounded-full"></div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {team.description}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.members.map((member, index) => (
                <Fade
                  key={member.id}
                  direction="up"
                  delay={index * 100}
                  triggerOnce
                >
                  <div className="flex flex-col items-center p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <Avatar className="mb-6 size-24 border-4 border-background shadow-lg">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{member.role}</p>
                    <div className="flex space-x-3">{/* Social buttons */}</div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>
      </Slide>
    </div>
  );
}
