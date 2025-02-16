import React, { useState } from 'react';
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) return; // Prevent sending empty messages

        await sendMessage(message);
        setMessage(""); // Clear input after sending
    };

    return (
        <form className='px-4 my-3 relative' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message} // Controlled input
                    onChange={(e) => setMessage(e.target.value)} // Update state on input change
                />
                <button
                    type='submit'
                    className='absolute inset-y-0 right-3 flex items-center'
                    disabled={loading} // Disable button while sending
                >
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
