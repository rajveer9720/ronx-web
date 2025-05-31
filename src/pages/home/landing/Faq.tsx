import React, { useState } from "react";

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How is Ronx better than traditional trading?",
      answer:
        "Ronx offers a decentralized, low-risk earning model powered by smart contracts—no market volatility, no middlemen, just transparent and automated rewards.",
    },
    {
      question: "How does Ronx work behind the scenes?",
      answer:
        "Ronx runs on blockchain-based smart contracts that automate every transaction, ensuring full transparency and eliminating human error or manipulation.",
    },
    {
      question: "What makes Ronx worth joining?",
      answer:
        "Ronx provides passive income opportunities, global accessibility, and complete control over your earnings—without relying on centralized platforms.",
    },
    {
      question: "How do I get started with Ronx?",
      answer:
        "Simply connect your crypto wallet, activate a plan, and let Ronx’s decentralized system handle the rest—no approvals or verifications needed.",
    },
    {
      question: "Is Ronx secure to use?",
      answer:
        "Yes, Ronx is built on blockchain technology using audited smart contracts, making it tamper-proof, secure, and completely transparent.",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-center animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-blue-200),var(--color-red-200),var(--color-blue-50),var(--color-red-300),var(--color-blue-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-indigo-200 mb-8">
          Quick answers to help you make the most of Ronx
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium text-gray-300 hover:bg-gray-800"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className="text-blue-400">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 text-gray-400 bg-gray-900">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
