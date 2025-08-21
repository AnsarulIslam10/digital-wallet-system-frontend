import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function About() {
  // Define the team data
  const team = {
    heading: "Team",
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
    <div>
      <section className="py-20 bg-accent">
        <div className="container text-center">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-5xl">
              About Our Digital Wallet
            </h1>
            <p className="text-muted-foreground text-balance lg:text-lg">
              Secure, fast, and convenient digital wallet for your everyday
              transactions. Learn our story, mission, and meet the team behind
              it.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container text-center">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-4xl">Our Story</h1>
            <p className="text-muted-foreground text-balance lg:text-lg">
              Founded with a vision to simplify digital payments, our Digital
              Wallet System was created to help users send, receive, and manage
              money seamlessly. We focus on security, reliability, and
              user-friendly features to make everyday transactions easy for
              everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent">
        <div className="container text-center">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-4xl">Our Mission</h1>
            <p className="text-muted-foreground text-balance lg:text-lg max-w-4xl mx-auto">
              Our mission is to empower individuals and businesses by providing
              a secure, fast, and accessible digital wallet that simplifies
              payments and improves financial inclusion. We aim to make digital
              transactions smooth, transparent, and trustworthy.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container flex flex-col items-center text-center">
          <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
            {team.heading}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl lg:text-xl">
            {team.description}
          </p>
        </div>
        <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member) => (
            <div key={member.id} className="flex flex-col items-center border py-8 px-6">
              <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name}</AvatarFallback>
              </Avatar>
              <p className="text-center font-medium">{member.name}</p>
              <p className="text-muted-foreground text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
