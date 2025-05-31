import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
        <div className="bg-gradient-to-r from-transparent via-gray-800/50 to-transparent py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="bg-gradient-to-r from-gray-200 via-indigo-300 to-gray-50 bg-[length:200%_auto] bg-clip-text text-3xl font-semibold text-transparent animate-[gradient_6s_linear_infinite] md:text-4xl"
              data-aos="fade-up"
            >
              Empower decisions, trade confidently.
            </h2>

            <div className="mx-auto mt-8 max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <div data-aos="fade-up" data-aos-delay={400}>
                <a
                  href="#0"
                  className="btn-sm flex items-center gap-2 bg-[#fff] py-[8px] px-4 text-gray-900 font-medium rounded-lg hover:bg-[#fe7e7e] hover:scale-[1.02] transition mb-4 w-full sm:mb-0 sm:w-auto"
                >
                  <span className="relative flex items-center gap-1">
                    Get Started
                    <ArrowForwardIcon className="text-gray-900 text-[18px]" />
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
