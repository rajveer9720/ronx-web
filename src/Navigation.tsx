import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Login,
  Activity,
  Calculator,
  Program,
  Partner,
  Stats,
  LevelCards,
  Invite,
  MainLayout,
  GuestLayout,
} from "./pages";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route element={<GuestLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="invitation" element={<Invite />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="activity" element={<Activity />} />
        <Route path="partner" element={<Partner />} />
        <Route path="stats" element={<Stats />} />
        <Route path="program/:name" element={<Program />} />
        <Route path="program/:name/level/:level" element={<LevelCards />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
