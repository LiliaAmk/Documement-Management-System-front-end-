import React from "react";
import { CameraIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-4">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <div className="flex items-center gap-6 relative">
          <div className="relative w-20 h-20">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
            <button className="absolute bottom-0 right-0 bg-purple-700 p-1 rounded-full border-2 border-white hover:bg-gray-600">
              <CameraIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Musharof Chowdhury</h3>
            <p className="text-gray-500">Team Manager • Arizona, United States</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <button className="text-purple-600 hover:underline">Edit</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">First Name</p>
            <p className="font-medium">Musharof</p>
          </div>
          <div>
            <p className="text-gray-500">Last Name</p>
            <p className="font-medium">Chowdhury</p>
          </div>
          <div>
            <p className="text-gray-500">Email Address</p>
            <p className="font-medium">randomuser@pimjo.com</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">+09 363 398 46</p>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <p className="text-gray-500">Bio</p>
            <p className="font-medium">Team Manager</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Address</h2>
          <button className="text-purple-600 hover:underline">Edit</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Country</p>
            <p className="font-medium">United States</p>
          </div>
          <div>
            <p className="text-gray-500">City/State</p>
            <p className="font-medium">Phoenix, Arizona, United States</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
