import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  supportHeading?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
}

const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is Digital Wallet?",
    answer:
      "A Digital Wallet is an online service or app that allows you to store money, make payments, and transfer funds securely using your mobile device or computer.",
  },
  {
    id: "faq-2",
    question: "How do I create an account?",
    answer:
      "To create an account, download our app or visit the website, click on 'Sign Up', provide your phone number and basic details, and verify your account through the OTP sent to your phone.",
  },
  {
    id: "faq-3",
    question: "How can I add money to my wallet?",
    answer:
      "You can add money via bank transfer, debit/credit card, or through agents available in your area. The added amount will instantly reflect in your wallet balance.",
  },
  {
    id: "faq-4",
    question: "How do I send money to someone?",
    answer:
      "To send money, open your wallet, choose 'Send Money', enter the recipient’s phone number, amount, and confirm the transaction. The recipient will receive the money instantly.",
  },
  {
    id: "faq-5",
    question: "Is my money safe in the wallet?",
    answer:
      "Yes, we use high-level encryption and secure authentication methods to ensure that your funds and personal information are fully protected.",
  },
  {
    id: "faq-6",
    question: "What are transaction limits?",
    answer:
      "Transaction limits depend on your account type and verification level. Basic accounts may have lower daily/monthly limits, while verified accounts can transact higher amounts.",
  },
  {
    id: "faq-7",
    question: "How do I contact support?",
    answer:
      "You can reach our support team via in-app chat, email, or phone. For urgent issues, we recommend using the live chat feature for faster assistance.",
  },
  {
    id: "faq-8",
    question: "Can I use the wallet without internet?",
    answer:
      "No, an active internet connection is required to make transactions, check balances, and access wallet features.",
  },
  {
    id: "faq-9",
    question: "Are there fees for using the wallet?",
    answer:
      "Most transactions are free, but some services like instant transfers or payments to certain merchants may incur small fees. Details are provided in the app.",
  },
  {
    id: "faq-10",
    question: "How do I reset my wallet password?",
    answer:
      "If you forget your password, click on 'Forgot Password' on the login page and follow the instructions to reset it securely via your registered phone number.",
  },
];

export const FAQ = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
  supportHeading = "Need help?",
  supportDescription = "Contact our support team anytime for assistance.",
  supportButtonText = "Contact Support",
  supportButtonUrl = "/contact",
}: Faq3Props) => {
  return (
    <section className="py-32">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support section */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <h3 className="mb-2 text-2xl font-semibold">{supportHeading}</h3>
          <p className="mb-4 text-muted-foreground">{supportDescription}</p>
          <Link
            to={supportButtonUrl}
            className="inline-block rounded-md bg-primary px-6 py-3 text-white hover:bg-primary/80"
          >
            {supportButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
};