import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Colors } from "../../../utils/colors";

export default function Cta() {
  const BlurredShape = "/assets/images/blurred-shape.svg";
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className=" py-12 md:py-20 my-5 rounded-2xl" style={{ color: Colors.card_text, border: `1px solid ${Colors.border}` }}>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="bg-gradient-to-r bg-[length:200%_auto] bg-clip-text text-3xl font-semibold text-transparent animate-[gradient_6s_linear_infinite] md:text-4xl"
              data-aos="fade-up" style={{ color: Colors.heading }}
            >
              Empower decisions, trade confidently.
            </h2>

            <div className="mx-auto mt-8 max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <div data-aos="fade-up" data-aos-delay={400}>
                <a
                  href="/dashboard"
                  className="btn-sm flex items-center gap-2 py-[8px] px-4 = font-medium rounded-lg hover:scale-[1.02] transition mb-4 w-full sm:mb-0 sm:w-auto" style={{
                    backgroundColor: Colors.button_bg,
                    color: Colors.button_text,
                    '--hover-bg': Colors.hover
                  } as React.CSSProperties & { '--hover-bg': string }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = Colors.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = Colors.button_bg;
                  }}
                >
                  <span className="relative flex items-center gap-1">
                    Get Started
                    <ArrowForwardIcon className=" text-[18px]" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
