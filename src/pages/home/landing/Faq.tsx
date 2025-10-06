import React, { useState } from "react";

import { APP_NAME } from "../../../utils/constants";
import { Colors } from "../../../utils/colors";

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: `How is ${APP_NAME} different from traditional trading?`,
      answer:
        `${APP_NAME} doesn’t depend on market ups and downs. Instead of risky trades, it uses automated smart contracts to provide stable, transparent, and instant rewards—without middlemen.`,
    },
    {
      question: `How does ${APP_NAME} actually work?`,
      answer:
        `${APP_NAME} is powered by blockchain smart contracts. Once you activate a plan, all transactions are processed automatically—removing human error, delays, or manipulation.`,
    },
    {
      question: `Why should I join ${APP_NAME}?`,
      answer:
        `${APP_NAME} gives you global earning opportunities with zero dependency on centralized platforms. You get passive income, direct control over your funds, and a system that never sleeps (24/7 automation).`,
    },
    {
      question: `How do I start using ${APP_NAME}?`,
      answer:
        `Just connect your crypto wallet, choose your preferred plan, and the system activates instantly. No lengthy registrations, no approvals—purely decentralized access.`,
    },
    {
      question: `Is ${APP_NAME} secure?`,
      answer:
        `${APP_NAME} is built on audited blockchain smart contracts. It cannot be changed, hacked, or shut down—making it fully secure, transparent, and trustless.`,
    },
    {
      question: `Do I need any prior trading experience?`,
      answer:
        `No, ${APP_NAME} is beginner-friendly. Since everything runs automatically on smart contracts, you don’t need trading knowledge or technical expertise to earn.`,
    },
    {
      question: `Can I use ${APP_NAME} from anywhere in the world?`,
      answer:
        `Yes, ${APP_NAME} is 100% global. As long as you have internet and a crypto wallet, you can join and earn without restrictions.`,
    },
    {
      question: `What makes ${APP_NAME} sustainable in the long run?`,
      answer:
        `Unlike schemes that rely on external factors, ${APP_NAME} is self-executing on blockchain. The smart contract code ensures fairness, stability, and lifetime transparency.`,
    },
  ];


  return (
    <section className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-center animate-[gradient_6s_linear_infinite] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl" style={{ color: Colors.heading }}>
          Frequently Asked Questions
        </h2>
        <p className="text-center mb-8" style={{ color: Colors.paragraph }}>
          Quick answers to help you make the most of {APP_NAME}
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden" style={{ borderColor: Colors.border }}
            >
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium" style={{ color: Colors.paragraph }}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className="text-blue-400">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3" style={{ color: Colors.card_text, background: Colors.card_bg }}>
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
