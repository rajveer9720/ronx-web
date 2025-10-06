import { LOGO } from "../../../utils/constants";

export default function Logo() {
  return (
    <a href="/" className="inline-flex items-center" aria-label="Cruip">
      <img src={LOGO} alt="Cruip Logo" className="h-10 sm:h-12 w-auto" />
    </a>
  );
}
