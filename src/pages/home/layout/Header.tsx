import Logo from "./logo";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Colors } from "../../../utils/colors";

export default function Header() {
  return (
    <header
      className="z-30 w-full pt-2"
      style={{ backgroundColor: Colors.nav_bg }}
    >
      <div className="relative flex h-16 items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex items-center justify-end">
          <button
            className="btn-sm flex items-center gap-2 py-[8px] px-4 font-medium rounded-lg hover:scale-[1.02] transition"
            style={{ 
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
            onClick={() => window.open("/dashboard", "_self")}
          >
            Access Platform
            <ArrowForwardIcon fontSize="small" />
          </button>
        </div>
      </div>
    </header>
  );
}
