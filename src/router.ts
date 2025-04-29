// router.ts
import { Router } from "@toolpad/core/AppProvider";
import { useNavigate, useLocation } from "react-router-dom";

export function useToolpadRouter(): Router {
  const navigateRR = useNavigate();
  const location = useLocation();

  // Wrap the navigate function to match Toolpad's Navigate signature
  const navigate: Router["navigate"] = (to, _options) => {
    navigateRR(to);
  };

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}
