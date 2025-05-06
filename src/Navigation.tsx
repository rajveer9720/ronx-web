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
} from "./pages";
import UserLayout from "./layouts";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<UserLayout />}>
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
