import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  SignUp,
  Activity,
  Calculator,
  Program,
  Referral,
  LevelCards,
  Invite,
  MainLayout,
  GuestLayout,
  Home,
} from "./pages";
import { RoutePaths } from "./utils/routes";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutePaths.BASE} element={<Home />} />
      <Route element={<GuestLayout />}>
        <Route path={RoutePaths.SIGNUP} element={<SignUp />} />
        <Route path={RoutePaths.INVITE} element={<Invite />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path={RoutePaths.DASHBOARD} element={<Dashboard />} />
        <Route path={RoutePaths.CALCULATOR} element={<Calculator />} />
        <Route path={RoutePaths.ACTIVITY} element={<Activity />} />
        <Route path={RoutePaths.REFERRAL} element={<Referral />} />
        <Route path={RoutePaths.PROGRAM} element={<Program />} />
        <Route path={RoutePaths.LEVEL_CARDS} element={<LevelCards />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
