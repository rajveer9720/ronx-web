import { Routes, Route } from "react-router-dom";
import { Dashboard, Login, Activity, Calculator, Program } from "./pages";
import UserLayout from "./layouts";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/*" element={<UserLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="activity" element={<Activity />} />
        <Route path="matrix/:type/:level" element={<Program />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
