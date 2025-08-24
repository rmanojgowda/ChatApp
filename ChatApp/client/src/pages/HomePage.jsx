import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import RightSidebar from '../components/RightSidebar';
import { userDummyData } from '../assets/assets';

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-80 h-full">
        <Sidebar className="h-full" />
      </div>

      {/* Chat */}
      <div className="flex-1 h-full">
        <ChatContainer selectedUser={selectedUser} />
      </div>

      {/* Right sidebar (optional, e.g., user info or attachments) */}
      <div className="w-80 h-full">
        <RightSidebar selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default HomePage;
