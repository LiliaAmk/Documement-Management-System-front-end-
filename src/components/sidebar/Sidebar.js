import { useState } from "react";
import { Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  User,
  File,
  LogOut,
  UserCircle,
  Folder,
  FolderCog,
  Shield,
} from "lucide-react";


// The component gets userType as a prop: "ROLE_ADMIN" or "ROLE_USER"
const Sidebar = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // User links (only see these)
  const userLinks = [
    //{ name: "Dashboard", path: "/user/dashboard", icon: <User size={20} /> },
    { name: "My Files", path: "/files", icon: <File size={20} /> },
    //{ name: "Profile", path: "/profile", icon: <UserCircle size={20} /> },
  ];

  // Admin links (see everything)
  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <User size={20} /> },
    { name: "User Management", path: "/users", icon: <Shield size={20} /> },
    { name: "Departments", path: "/departments", icon: <Folder size={20} /> },
    { name: "Categories", path: "/categories", icon: <FolderCog size={20} /> },
    { name: "All Files", path: "/all-files", icon: <File size={20} /> },
    { name: "Profile", path: "/profile", icon: <UserCircle size={20} /> },
  ];

  // Determine which links to display
  const links = userType === "ROLE_ADMIN" ? adminLinks : userLinks;

  const handleLogout = () => {
    Modal.confirm({
      title: 'Are you sure you want to logout?',
      content: 'You will be returned to the login page.',
      okText: 'Logout',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
      // onCancel: () => {}, // optional
    });
  };

  return (
    <div
      className={`bg-white text-gray-900 h-screen transition-all shadow-lg ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col border-r`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className={`${isOpen ? "block" : "hidden"} text-xl font-bold text-gray-800`}>
          TailAdmin
        </span>
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900">
          <Menu size={24} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-3 p-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-lg">
          U
        </div>
        {isOpen && (
          <span className="text-lg font-semibold text-gray-800">
            {userType === "ROLE_ADMIN" ? "Admin" : "User"}
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all text-gray-700 ${
              location.pathname === link.path
                ? "bg-gray-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            {link.icon}
            <span className={`${isOpen ? "block" : "hidden"}`}>{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-500 hover:text-red-700"
        >
          <LogOut size={20} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
