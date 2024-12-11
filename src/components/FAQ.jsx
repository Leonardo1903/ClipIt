import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does ClipIt work?",
    answer:
      "ClipIt generates a short, unique URL that redirects to your original long URL. Simply paste your long URL, click 'Shorten', and share your new ClipIt link!",
  },
  {
    question: "Do I need an account to use ClipIt?",
    answer:
      "While you can create short links without an account, signing up allows you to manage your URLs, view detailed analytics, and create custom branded links.",
  },
  {
    question: "What analytics does ClipIt provide?",
    answer:
      "ClipIt offers comprehensive analytics including click counts, geographic data, referral sources, and device types. This data helps you understand your audience and measure the success of your shared links.",
  },
  {
    question: "Can I customize my shortened URLs?",
    answer:
      "Yes! With our advanced features, you can create custom branded domains and choose your own URL slugs for a more personalized touch.",
  },
  {
    question: "Is there an API available for integration?",
    answer:
      "Yes, we offer API access for seamless integration, allowing you to incorporate ClipIt's powerful URL shortening and analytics capabilities directly into your own applications and workflows.",
  },
];

function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b border-blue-400/30"
        >
          <AccordionTrigger className="text-left hover:text-blue-400 transition-colors">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-blue-200">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FAQ;