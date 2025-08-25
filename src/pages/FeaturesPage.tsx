import {
  Shield,
  Send,
  Banknote,
  FileText,
  Users,
  Bell,
  Settings,
  Compass,
  Smartphone,
} from "lucide-react";

export default function FeaturesPage() {
  // Define the features data with icons
  const features = [
    {
      id: 1,
      title: "Secure Wallet",
      description:
        "Your funds are safe with advanced encryption and multi-layer security.",
      icon: Shield,
    },
    {
      id: 2,
      title: "Send & Receive Money",
      description:
        "Quickly transfer money to anyone using phone number or email.",
      icon: Send,
    },
    {
      id: 3,
      title: "Deposit & Withdraw",
      description:
        "Easily add or withdraw funds with agents or integrated banking services.",
      icon: Banknote,
    },
    {
      id: 4,
      title: "Transaction History",
      description:
        "Track all transactions with detailed history and filtering options.",
      icon: FileText,
    },
    {
      id: 5,
      title: "Role-Based Access",
      description:
        "Users, Agents, and Admins have tailored dashboards with specific features.",
      icon: Users,
    },
    {
      id: 6,
      title: "Notifications & Alerts",
      description:
        "Receive instant notifications for transactions and system updates.",
      icon: Bell,
    },
    {
      id: 7,
      title: "Settings & Customization",
      description:
        "Manage your profile, preferences, and notification settings easily.",
      icon: Settings,
    },
    {
      id: 8,
      title: "Guided Tour",
      description:
        "Step-by-step introduction to features for new users with interactive guides.",
      icon: Compass,
    },
    {
      id: 9,
      title: "Mobile Friendly",
      description:
        "Fully responsive design ensures a smooth experience on all devices.",
      icon: Smartphone,
    },
  ];

  return (
    <div>
      <section className="py-20 rounded-xl border-0 shadow-sm bg-gradient-to-br from-background to-muted/50">
        <div className="container text-center">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-5xl">
              Our Features
            </h1>
            <p className="text-muted-foreground text-balance lg:text-lg">
              Explore the powerful features of our secure and user-friendly
              Digital Wallet System.
            </p>
          </div>
        </div>
      </section>
      <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className="flex flex-col items-start gap-4 py-8 px-6 rounded-xl border shadow-sm bg-gradient-to-br from-background to-muted/50 hover:shadow-md transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
