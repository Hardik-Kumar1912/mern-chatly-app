import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { IoArrowBack } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col h-[550px] sm:h-[450px] rounded-lg overflow-hidden max-h-screen">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center bg-slate-600 px-4 py-3 shadow-md">
            {/* Back Button (Visible Only on Mobile) */}
            <button
              className="sm:block md:hidden text-white mr-3"
              onClick={() => setSelectedConversation(null)}
            >
              <IoArrowBack className="w-6 h-6" />
            </button>
            
            {/* User Name */}
            <span className="text-white font-semibold text-lg">{selectedConversation.fullName}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
            <Messages />
          </div>

          {/* Message Input */}
          <div className="px-4 py-2 bg-transparent backdrop-blur-md">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
