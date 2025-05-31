import { Link } from "react-router-dom";
import logo from "../../../../public/assets/images/logo.svg";

export default function Logo() {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="Cruip">
      <img src={logo} alt="Cruip Logo" className="h-10 sm:h-12 w-auto" />
    </Link>
  );
}
