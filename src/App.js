// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginSuccess, logout } from "./redux/authSlice";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import AllFiles from "./pages/common/AllFiles";
import SignIn from "./pages/auth/SignIn";
import Profile from "./pages/common/Profile";
import Dashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/UserDashboard";
import Users from "./pages/admin/Users";
import Categories from "./pages/admin/Categories";
import Departments from "./pages/admin/Departments";
import DocumentUpload from "./pages/user/DocumentUpload";
import DocumentsList from "./pages/user/DocumentsList";

// Route protection wrapper
const RequireAuth = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !user.roles?.includes("ROLE_ADMIN"))
    return <Navigate to="/user/dashboard" replace />;

  return children;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          dispatch(logout());
        } else {
          dispatch(loginSuccess({ token, user: decoded }));
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<SignIn />} />

        {/* Protected Routes */}
        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          {/* Admin-specific */}
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth adminOnly={true}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/categories"
            element={
              <RequireAuth adminOnly={true}>
                <Categories />
              </RequireAuth>
            }
          />
          <Route
            path="/departments"
            element={
              <RequireAuth adminOnly={true}>
                <Departments />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth adminOnly={true}>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/all-files"
            element={
              <RequireAuth adminOnly={true}>
                <AllFiles />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth adminOnly={true}>
                <Profile />
              </RequireAuth>
            }
          />

          {/* Regular user */}
          <Route
  path="/user/dashboard"
  element={<Navigate to="/files" replace />}
/>

          <Route path="/files" element={<DocumentsList />} />
<Route path="/upload" element={<DocumentUpload />} />


        </Route>
        


        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
