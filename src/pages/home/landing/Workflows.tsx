import Spotlight from "./Spotlight";
import WorflowImg01 from "../../../../public/assets/images/workflow-01.png";
import WorflowImg02 from "../../../../public/assets/images/workflow-02.png";
import WorflowImg03 from "../../../../public/assets/images/workflow-03.png";
import { Colors } from "../../../utils/colors";
import { APP_NAME } from "../../../utils/constants";

export default function Workflows() {
  return (
    <section>
      <style>{`
        .workflow-card {
          border: 1px solid var(--border);
        }
        .workflow-card::before {
          background: var(--primary-color-80) !important;
        }
        .workflow-card::after {
          background: var(--primary-color) !important;
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-indigo-200/50">
              <span
                className="inline-flex bg-gradient-to-r bg-clip-text text-transparent"
                style={{ color: Colors.heading }}
              >
                Decentralized Smart Contracts
              </span>
            </div>
            <h2
              className="animate-[gradient_6s_linear_infinite] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl"
              style={{ color: Colors.heading }}
            >
              Power Your Financial Growth with {Colors.title}
            </h2>
            <p className="text-lg" style={{ color: Colors.paragraph }}>
              {Colors.title} is a 100% decentralized platform powered by blockchain smart contracts.
              It offers peer-to-peer transactions, instant payments, and complete transparency.
              With automated programs like X3 and X4, every interaction is secure, scalable,
              and free from middlemen or hidden fees. Start building your journey in a trusted ecosystem.
            </p>
          </div>

          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {[
              {
                img: WorflowImg01,
                tag: "X3 Program",
                text: "Earn directly from referrals in a fast, automated structure. The X3 plan is designed for direct partners, giving you instant rewards on every activation."
              },
              {
                img: WorflowImg02,
                tag: "X4 Program",
                text: "Unlock team power with X4. A community-driven matrix where spillovers from uplines and downlines maximize your earning potential with global participation."
              },
              {
                img: WorflowImg03,
                tag: `Why ${APP_NAME}?`,
                text: "Built with transparency and automation at its core. No admins, no risk of manipulation—only trustless smart contracts that work 24/7 on blockchain."
              },
            ].map((item, idx) => (
              <a
                key={idx}
                className="workflow-card group/card relative h-full overflow-hidden rounded-2xl p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                style={{
                  '--primary-color': Colors.primary,
                  '--primary-color-80': Colors.primary + 'cc', // Adding 80% opacity
                  '--border': Colors.border
                } as React.CSSProperties & {
                  '--primary-color': string;
                  '--primary-color-80': string;
                  '--border': string;
                }}
                href="#0"
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] after:absolute after:inset-0 after:bg-gradient-to-br " style={{ backgroundColor: Colors.card_bg, color: Colors.card_text }}>
                  <div
                    className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border  transition-opacity group-hover/card:opacity-100"

                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={9}
                      height={8}
                      fill="none"
                    >
                      <path
                        fill="#F4F4F5"
                        d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                      />
                    </svg>
                  </div>

                  <img
                    className="inline-flex"
                    src={item.img}
                    width={350}
                    height={288}
                    alt={`Workflow ${idx + 1}`}
                  />

                  <div className="p-6">
                    <div className="mb-3">
                      <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,rgba(55,65,81,0.15),rgba(55,65,81,0.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                        <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ color: Colors.paragraph }}>
                          {item.tag}
                        </span>
                      </span>
                    </div>
                    <p style={{ color: Colors.card_text }}>{item.text}</p>
                  </div>
                </div>
              </a>
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
