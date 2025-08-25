import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function About() {
  // Define the team data
  const team = {
    heading: "Meet Our Team",
    description:
      "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
    members: [
      {
        id: "member-1",
        name: "Sarah Chen",
        role: "CEO & Founder",
        avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      },
      {
        id: "member-2",
        name: "Marcus Rodriguez",
        role: "CTO",
        avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      },
      {
        id: "member-3",
        name: "Emily Watson",
        role: "Head of Design",
        avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      },
      {
        id: "member-4",
        name: "David Kim",
        role: "Lead Engineer",
        avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      },
      {
        id: "member-5",
        name: "Lisa Thompson",
        role: "Product Manager",
        avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      },
      {
        id: "member-6",
        name: "Alex Johnson",
        role: "UX Designer",
        avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container">
          <div className="mx-auto flex max-w-4xl flex-col gap-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              About Our Digital Wallet
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl mx-auto max-w-3xl leading-relaxed">
              Secure, fast, and convenient digital wallet for your everyday transactions. 
              Learn our story, mission, and meet the team behind it.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
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
                  Founded with a vision to simplify digital payments, our Digital
                  Wallet System was created to help users send, receive, and manage
                  money seamlessly. We focus on security, reliability, and
                  user-friendly features to make everyday transactions easy for
                  everyone.
                </p>
              </div>
              <div className="bg-muted rounded-2xl p-8 h-64 flex items-center justify-center shadow-lg">
                <div className="text-6xl opacity-20">💡</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
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
                  Our mission is to empower individuals and businesses by providing
                  a secure, fast, and accessible digital wallet that simplifies
                  payments and improves financial inclusion. We aim to make digital
                  transactions smooth, transparent, and trustworthy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
            {team.members.map((member) => (
              <div 
                key={member.id} 
                className="flex flex-col items-center p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Avatar className="mb-6 size-24 border-4 border-background shadow-lg">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-muted-foreground mb-4">{member.role}</p>
                <div className="flex space-x-3">
                  <button className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}