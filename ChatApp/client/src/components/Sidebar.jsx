import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets, { userDummyData } from '../assets/assets';

const Sidebar = ({ className, selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = userDummyData.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`bg-gray-800 text-white h-full flex flex-col ${className}`}>
      {/* Logo */}
      <div className="flex justify-center mb-6 p-2">
        <img src={assets.logo} alt="logo" className="w-20 h-20 object-contain" />
      </div>

      {/* Search bar */}
      <div className="flex items-center bg-gray-700 rounded-md p-2 mb-4 relative mx-2">
        <img src={assets.search_icon} alt="Search" className="w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search users"
          className="bg-gray-700 text-white placeholder-gray-400 focus:outline-none w-full pr-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={assets.menu_icon}
          alt="Options"
          className="w-4 h-4 absolute right-2 cursor-pointer"
        />
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-2 rounded-md cursor-pointer transition ${
                selectedUser?._id === user._id
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-700'
              }`}
            >
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate">{user.fullName}</p>
                <p className="text-sm text-gray-400 truncate">{user.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
