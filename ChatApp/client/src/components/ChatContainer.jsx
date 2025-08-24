import React, { useState, useEffect, useRef } from "react";
import assets, { messagesDummyData, userDummyData } from "../assets/assets";
import { formatTime, formatMessage, generateId } from "../lib/utils";

const ChatContainer = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const messageEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  // Load messages for selected user
  useEffect(() => {
    if (selectedUser) {
      const filtered = messagesDummyData.filter(
        (msg) =>
          (msg.senderId === selectedUser._id || msg.receiverId === selectedUser._id)
      );
      setMessages(filtered);
    }
  }, [selectedUser]);

  const handleSend = () => {
    if (!newMessage && !imageFile) return;

    const msg = {
      _id: generateId(),
      senderId: "currentUser", // replace with logged-in user ID
      receiverId: selectedUser._id,
      text: newMessage ? formatMessage(newMessage) : null,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      seen: true,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
    setImageFile(null);
  };

  if (!selectedUser)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a user to start chatting
      </div>
    );

  return (
    <div className="flex-1 flex flex-col h-full border-l border-gray-600 border-r border-gray-600">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b border-gray-600">
        <img
          src={selectedUser.profilePic}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">{selectedUser.fullName}</p>
          <p className="text-xs text-gray-400">{selectedUser.bio}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-start ${
              msg.senderId === "currentUser" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.senderId !== "currentUser" && (
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`max-w-xs break-words p-2 rounded-lg ${
                msg.senderId === "currentUser"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="sent"
                  className="max-w-full max-h-60 rounded mt-1"
                />
              )}
              <p className="text-xs text-gray-300 mt-1 text-right">
                {formatTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

<div className="p-4 border-t border-gray-600 flex items-center space-x-2">
  {/* Text input */}
  <input
    type="text"
    placeholder="Type a message..."
    className="flex-1 bg-gray-700 text-white rounded px-3 py-2 focus:outline-none"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSend()}
  />

  {/* Photo icon */}
  <label className="cursor-pointer">
    <img
      src={assets.gallery_icon}
      alt="Send Photo"
      className="w-6 h-6"
    />
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        if (e.target.files[0]) {
          setImageFile(e.target.files[0]);
          handleSend(e.target.files[0]); // send immediately after selecting
          e.target.value = null; // reset input to allow same file again
        }
      }}
    />
  </label>

  {/* Send button */}
  <button
    onClick={handleSend}
    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
  >
    Send
  </button>
</div>

    </div>
  );
};

export default ChatContainer;
