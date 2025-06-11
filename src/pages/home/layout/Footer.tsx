import Logo from "./logo";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <img
            className="max-w-none"
            src="assets/images/footer-illustration.svg"
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>

        <div className="grid grid-cols-2 gap-12 py-8 sm:grid-rows-[auto_auto] md:grid-cols-4 md:grid-rows-[auto_auto] md:py-12 lg:grid-cols-5 lg:grid-rows-1 xl:gap-20">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className="text-indigo-200/65 transition hover:text-indigo-500"
                  href="#0"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block" />

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">
              Content Library
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="text-white/80 transition hover:text-indigo-500"
                  href="#0"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  className="text-white/80 transition hover:text-indigo-500"
                  href="#0"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-8 lg:col-start-5 lg:col-span-1 lg:text-right">
            <div className="mb-3">
              <Logo />
            </div>
            <div className="text-sm">
              <p className="mb-3 text-indigo-200/65">
                © Ronx.com
                <a
                  className="text-indigo-200/65 transition hover:text-indigo-500 ml-1"
                  href="#0"
                >
                  Terms
                </a>
              </p>
              <ul className="inline-flex gap-6">
                <li>
                  <a
                    className="flex items-center justify-center text-white/80 transition hover:text-indigo-400"
                    href="#0"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-8 w-8 fill-current" />
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-white/80 transition hover:text-indigo-400"
                    href="#0"
                    aria-label="Telegram"
                  >
                    <TelegramIcon className="h-8 w-8 fill-current" />
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-white/80 transition hover:text-indigo-400"
                    href="#0"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon className="h-8 w-8 fill-current" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
