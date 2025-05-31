import React, { FC, SVGProps } from "react";
import {
  ShieldCheckIcon,
  GlobeAltIcon,
  EyeIcon,
  BoltIcon,
  ShareIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";

import BlurredShapeGray from "/assets/images/blurred-shape-gray.svg";
import BlurredShape from "/assets/images/blurred-shape.svg";

const features: {
  title: string;
  description: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: "Independence",
    description:
      "The Ronx ecosystem is powered by smart contracts and NFTs, operating fully autonomously and eliminating any influence from human intervention.",
    icon: GlobeAltIcon,
  },
  {
    title: "Stable environment",
    description:
      "The terms of the smart contract are immutable and cannot be altered by anyone, including the developers, ensuring the platform's stability and reliability.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Accountability",
    description:
      "All transactions and actions are logged on the blockchain, making them accessible to the public. This guarantees full transparency in every step of the process.",
    icon: EyeIcon,
  },
  {
    title: "End-to-end automation",
    description:
      "Every process within the Ronx ecosystem is driven by smart contracts, removing the need for manual involvement and ensuring continuous, round-the-clock operation.",
    icon: BoltIcon,
  },
  {
    title: "Distribution",
    description:
      "The platform runs on a decentralized network, ensuring that no single entity holds control, which makes it immune to censorship.",
    icon: ShareIcon,
  },
  {
    title: "Fully digital",
    description:
      "The platform is fully online, enabling users to join and engage from anywhere in the world, at any time, without any geographical limitations.",
    icon: DevicePhoneMobileIcon,
  },
];

const Features: React.FC = () => {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <img
          className="max-w-none"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <img
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 md:py-20 [border-image:linear-gradient(to_right,transparent,var(--color-slate-400)/.25,transparent)1]">
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-[linear-gradient(to_right,#fff9cc,#fff9cc)] bg-clip-text text-transparent">
                Technology of smart contracts and non-fungible tokens
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-blue-200),var(--color-indigo-200),var(--color-blue-50),var(--color-indigo-300),var(--color-blue-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Decentralized marketing with smart contracts and Forsage’s secure
              open code.
            </h2>
          </div>

          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <article key={idx}>
                <feature.icon className="mb-3 h-6 w-6 text-indigo-500" />
                <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-indigo-200/65">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
