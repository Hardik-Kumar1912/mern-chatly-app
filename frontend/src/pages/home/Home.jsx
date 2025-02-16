import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex sm:h-[450px] md:h-[550px]  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className={`w-full md:w-auto ${selectedConversation ? "hidden sm:block md:block" : ""}`}>
        <Sidebar />
      </div>
      <div className={`w-full md:w-auto ${!selectedConversation ? "hidden sm:block md:block" : ""}`}>
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
