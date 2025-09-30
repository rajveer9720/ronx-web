import Logo from "./logo";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Header() {
  return (
    <header
      className="z-30 w-full pt-2"
      style={{ backgroundColor: " oklch(.13 .028 261.692) " }}
    >
      <div className="relative flex h-16 items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex items-center justify-end">
          <button className="btn-sm flex items-center gap-2 bg-[#fff] py-[8px] px-4 text-gray-900 font-medium rounded-lg hover:bg-[#fe7e7e] hover:scale-[1.02] transition"
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
