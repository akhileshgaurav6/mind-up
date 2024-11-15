import { Button } from "flowbite-react";
import React from "react";
import { useAuth } from "../context/authContext";

const UserProfileCard = ({ user1 }) => {
    const { isLogin,  user } = useAuth()
  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        {/* Placeholder for avatar */}
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
          {user1.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user1.name}</h2>
          <p className="text-sm text-gray-500">{user1.email}</p>
          <p className={`text-sm font-semibold ${user1.active ? "text-green-500" : "text-red-500"}`}>
            {user.active ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-gray-700">
        <p className="text-sm">{user.about}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Phone: {user.phoneNumber}</p>
        <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-600">Roles:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {user1.roles.map((role, index) => (
            <li key={index} className="text-sm">
              {role.roleName}
            </li>
          ))}
        </ul>
      </div>
      {
        isLogin() && user1.id == user.id ? ( <div className="flex mt-3 justify-center">
            <Button>Update Profile</Button>
          </div>):''
      }
      
    </div>
  );
};

export default UserProfileCard;
