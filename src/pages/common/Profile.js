// src/pages/profile/Profile.js

import React from "react";

const getUser = () => {
  // Try Redux first, fallback to localStorage
  let user = null;
  try {
    // If using Redux, replace with: useSelector(state => state.auth.user);
    user = JSON.parse(localStorage.getItem("loggedInUser"));
    // OR, if you store only email, decode token etc.
    if (!user) {
      user = {
        firstName: "John",
        lastName: "Doe",
        email: localStorage.getItem("userEmail") || "unknown@email.com",
        role: localStorage.getItem("userType") || "ROLE_USER",
        phone: "+213 123 456 789",
        bio: "AI Student",
        country: "Algeria",
        city: "Algiers"
      };
    }
  } catch (e) {
    user = {
      firstName: "John",
      lastName: "Doe",
      email: localStorage.getItem("userEmail") || "unknown@email.com",
      role: localStorage.getItem("userType") || "ROLE_USER",
      phone: "+213 123 456 789",
      bio: "AI Student",
      country: "Algeria",
      city: "Algiers"
    };
  }
  return user;
};

const Profile = () => {
  const user = getUser();

  return (
    <div style={{
      background: "#f4f6f9",
      minHeight: "100vh",
      padding: "40px 0",
      width: "100vw",
    }}>
      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}>
        {/* Profile Overview Card */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          padding: 32,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#ede9fe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            color: "#8b5cf6",
            fontWeight: 700,
            border: "4px solid #a78bfa",
          }}>
            {user.firstName ? user.firstName[0] : "U"}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{user.firstName} {user.lastName}</div>
            <div style={{ color: "#7c3aed", fontWeight: 500 }}>{user.role === "ROLE_ADMIN" ? "Admin" : "User"}</div>
            <div style={{ color: "#64748b" }}>{user.city}, {user.country}</div>
          </div>
        </div>

        {/* Personal Info */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          padding: 32,
          marginBottom: 0
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20
          }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Personal Information</div>
            {/* <button style={{ color: "#8b5cf6", fontWeight: 500, background: "none", border: "none" }}>Edit</button> */}
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#64748b" }}>First Name</div>
              <div style={{ fontWeight: 500 }}>{user.firstName}</div>
            </div>
            <div>
              <div style={{ color: "#64748b" }}>Last Name</div>
              <div style={{ fontWeight: 500 }}>{user.lastName}</div>
            </div>
            <div>
              <div style={{ color: "#64748b" }}>Email Address</div>
              <div style={{ fontWeight: 500 }}>{user.email}</div>
            </div>
            <div>
              <div style={{ color: "#64748b" }}>Phone</div>
              <div style={{ fontWeight: 500 }}>{user.phone || "-"}</div>
            </div>
            <div>
              <div style={{ color: "#64748b" }}>Bio</div>
              <div style={{ fontWeight: 700 }}>{user.bio || "-"}</div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          padding: 32,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20
          }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Address</div>
            {/* <button style={{ color: "#8b5cf6", fontWeight: 500, background: "none", border: "none" }}>Edit</button> */}
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#64748b" }}>Country</div>
              <div style={{ fontWeight: 500 }}>{user.country}</div>
            </div>
            <div>
              <div style={{ color: "#64748b" }}>City/State</div>
              <div style={{ fontWeight: 500 }}>{user.city}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
