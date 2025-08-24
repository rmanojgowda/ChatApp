import React from "react";
import assets, { messagesDummyData } from "../assets/assets";

const RightSidebar = ({ selectedUser }) => {
  if (!selectedUser)
    return (
      <div className="h-full flex items-center justify-center text-gray-400 p-4 rounded-xl bg-gray-800">
        Select a user to see details
      </div>
    );

  // Filter messages between currentUser and selectedUser
  const sharedMessages = messagesDummyData.filter(
    (msg) =>
      (msg.senderId === "currentUser" && msg.receiverId === selectedUser._id) ||
      (msg.receiverId === "currentUser" && msg.senderId === selectedUser._id)
  );

  // Extract shared images
  const sharedImages = sharedMessages.filter((msg) => msg.image);

  // Dummy docs/files (replace with real data later)
  const sharedDocs = [
    { name: "ProjectProposal.pdf", size: "120KB" },
    { name: "Resume.docx", size: "85KB" },
  ];
  const sharedFiles = [
    { name: "Report.xlsx", size: "250KB" },
    { name: "Presentation.pptx", size: "3MB" },
  ];

  return (
    <div className="h-full flex flex-col border-l border-gray-600 bg-gray-800 text-white rounded-xl overflow-hidden">
      {/* User Info (fixed at top) */}
      <div className="flex items-center p-4 border-b border-gray-600">
        <img
          src={selectedUser.profilePic}
          alt={selectedUser.fullName}
          className="w-14 h-14 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold text-lg">{selectedUser.fullName}</p>
          <p className="text-sm text-gray-400">{selectedUser.bio}</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Shared Media Section */}
        <div>
          <h3 className="font-semibold mb-2">Shared Images</h3>
          <div className="flex space-x-2 overflow-x-auto">
            {sharedImages.length > 0 ? (
              sharedImages.map((msg) => (
                <img
                  key={msg._id}
                  src={msg.image}
                  alt="shared"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))
            ) : (
              <p className="text-gray-400 text-sm">No images shared</p>
            )}
          </div>
        </div>

        {/* Shared Documents */}
        <div>
          <h3 className="font-semibold mb-2">Documents</h3>
          <ul className="space-y-2">
            {sharedDocs.map((doc, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
              >
                <span>{doc.name}</span>
                <span className="text-xs text-gray-400">{doc.size}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shared Files */}
        <div>
          <h3 className="font-semibold mb-2">Files</h3>
          <ul className="space-y-2">
            {sharedFiles.map((file, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
              >
                <span>{file.name}</span>
                <span className="text-xs text-gray-400">{file.size}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
