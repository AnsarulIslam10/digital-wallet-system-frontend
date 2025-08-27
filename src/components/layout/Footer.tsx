import Logo from "@/assets/icons/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Footer() {
  const sections = [
    {
      title: "Services",
      links: ["Deposit Money", "Withdraw Money", "Send Money", "Transaction History"],
    },
    {
      title: "Company",
      links: ["About SecurePay", "Team", "Careers"],
    },
    {
      title: "Help & Support",
      links: ["FAQs", "Live Chat", "Contact Support"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Refund Policy"],
    },
  ];

  return (
    <footer>
      <div className="mx-auto container space-y-8 px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo & Description */}
          <div>
            <div className="text-foreground">
              <Logo />
            </div>

            <p className="mt-4 max-w-xs text-muted-foreground/80">
              SecurePay is your trusted digital wallet solution. Send, receive,
              and manage your money seamlessly and securely.
            </p>

            <ul className="mt-8 flex gap-6">
              {/* Social links placeholders */}
              <li><a href="#" className="text-muted-foreground/80 hover:opacity-75">FB</a></li>
              <li><a href="#" className="text-muted-foreground/80 hover:opacity-75">IG</a></li>
              <li><a href="#" className="text-muted-foreground/80 hover:opacity-75">TW</a></li>
              <li><a href="#" className="text-muted-foreground/80 hover:opacity-75">GH</a></li>
            </ul>
          </div>

          {/* Footer Sections */}
          <div className="lg:col-span-2">
            <div className="hidden lg:grid grid-cols-4 gap-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <p className="font-medium text-muted-foreground">{section.title}</p>
                  <ul className="mt-6 space-y-4 text-sm">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-muted-foreground/80 hover:opacity-75">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Accordion for Mobile */}
            <div className="lg:hidden">
              <Accordion type="single" collapsible>
                {sections.map((section) => (
                  <AccordionItem key={section.title} value={section.title}>
                    <AccordionTrigger>{section.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        {section.links.map((link) => (
                          <li key={link}>
                            <a href="#" className="text-muted-foreground/80 hover:opacity-75">
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; 2025 SecurePay. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
