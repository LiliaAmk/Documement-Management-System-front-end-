import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const user = useSelector((state) => state.auth.user);

  const userType = user?.roles?.includes("ROLE_ADMIN")
    ? "ROLE_ADMIN"
    : user?.roles?.[0] || localStorage.getItem("userType") || "ROLE_USER";

  return (
    <div className="flex h-screen">
      <Sidebar userType={userType} />
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
