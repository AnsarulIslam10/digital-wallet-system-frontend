export default function FeaturesPage() {
  // Define the team data
  const team = {
    features: [
      {
        id: 1,
        title: "Secure Wallet",
        description:
          "Your funds are safe with advanced encryption and multi-layer security."
      },
      {
        id: 2,
        title: "Send & Receive Money",
        description:
          "Quickly transfer money to anyone using phone number or email."
      },
      {
        id: 3,
        title: "Deposit & Withdraw",
        description:
          "Easily add or withdraw funds with agents or integrated banking services."
      },
      {
        id: 4,
        title: "Transaction History",
        description:
          "Track all transactions with detailed history and filtering options."
      },
      {
        id: 5,
        title: "Role-Based Access",
        description:
          "Users, Agents, and Admins have tailored dashboards with specific features."
      },
      {
        id: 6,
        title: "Notifications & Alerts",
        description:
          "Receive instant notifications for transactions and system updates."
      },
      {
        id: 7,
        title: "Settings & Customization",
        description:
          "Manage your profile, preferences, and notification settings easily."
      },
      {
        id: 8,
        title: "Guided Tour",
        description:
          "Step-by-step introduction to features for new users with interactive guides."
      },
      {
        id: 9,
        title: "Mobile Friendly",
        description:
          "Fully responsive design ensures a smooth experience on all devices."
      },
    ],
  };

  return (
    <div>
      <section className="py-20 bg-accent">
        <div className="container text-center">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-5xl">
              Our Features
            </h1>
            <p className="text-muted-foreground text-balance lg:text-lg">
              Explore the powerful features of our secure and user-friendly
              Digital Wallet System. it.
            </p>
          </div>
        </div>
      </section>   
        <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {team.features.map((feature) => (
            <div key={feature.id} className="flex flex-col border py-8 px-6">
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
    </div>
  );
}
