import Logo from "./logo";
import { APP_NAME } from "../../../utils/constants";
import { Colors } from "../../../utils/colors";

export default function Footer() {
  return (
    <footer className="w-full pt-8 pb-4" style={{ background: Colors.footer_bg, color: Colors.footer_text }}>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6" >
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

        <div className="flex items-center justify-between py-8 md:py-12">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Main content with copyright */}
          <div className="flex-grow text-center">
            <div className="text-md fw-bold">
              <p style={{ color: Colors.footer_text }}>
                © 2025 {APP_NAME}.com All Right Reserved
              </p>
            </div>
          </div>

        
        </div>
      </div>
    </footer>
  );
}
