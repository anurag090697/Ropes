/** @format */

import React, { useEffect, useRef, useState } from "react";
import { SiWechat } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { axiosInstance, getConversation } from "../../slice";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import io from "socket.io-client";

function Messages() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const { sender, recipient } = location.state || [];
  const socket = useRef();
  const { user, conversations, responseObj, otherprofile } = useSelector(
    (state) => state.ropes
  );
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  useEffect(() => {
    if (user.logged) {
      socket.current = io('http://localhost:6835');
  }
},[])

  useEffect(() => {
    if (recipient) {
      dispatch(
        getConversation({
          sender,
          recipient,
        })
      );
    } else dispatch(getConversation({ sender: user._id }));
  }, [recipient]);
  // console.log(import.meta.env.VITE_ROPES_API);

  async function sendmsg(e) {
    e.preventDefault();
    console.log(msg, sender, recipient);
    const res = await axiosInstance.post("/sendMsg", {
      sender: user._id,
      recipient:
        selectedChat.participants[0].userId == user._id
          ? selectedChat.participants[1].userId
          : selectedChat.participants[0].userId,
      message: { sender: user.username, text: msg },
    });
    console.log(res);
    setMsg("");
  }

  return (
    <div className='flex flex-col gap-1 w-full md:px-20 md:py-10 items-center justify-center '>
      <div className='p-1 sm:p-8 w-full lg:w-3/4 xl:w-3/5 max-w-full rounded-lg border-2 min-h-[480px] text-white bg-gradient-to-r grid grid-cols-4 from-slate-500 to-gray-500'>
        <div className='border-r-2 col-span-1 overflow-y-auto'>
          <h3 className='w-fit mx-auto text-xl font-medium'>Chats</h3>
          <p className='w-fit mx-auto text-sky-300'>
            {selectedChat ? "" : "Select any chat"}
          </p>
          <div className='flex flex-col gap-1 items-start justify-start p-1 lg:p-2 text-amber-500 col-span-3 w-full'>
            {conversations.length &&
              conversations.map((ele, idx) => {
                return (
                  <div
                    onClick={() => setSelectedChat(ele)}
                    key={idx}
                    className='bg-sky-900/40 w-full border border-transparent hover:border-amber-500 p-2 rounded-xl hover:bg-sky-900 gap-2 flex flex-wrap md:flex-nowrap items-start justify-start'
                  >
                    {/* ele.participants.find((ele)=>ele!=user._id) */}
                    <img
                      className='w-12 md:w-14 h-14 object-cover rounded-full'
                      src={
                        ele.participants[0].userId == user._id
                          ? ele.participants[1].displaypicture
                          : ele.participants[0].displaypicture
                      }
                      alt=''
                    />{" "}
                    <div>
                      <h2 className=''>
                        {ele.participants[0].userId == user._id
                          ? ele.participants[1].name
                          : ele.participants[0].name}
                      </h2>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className='col-span-3 flex items-center justify-center overflow-y-auto h-full'>
          {selectedChat ? (
            <div className='w-full flex flex-col items-start justify-between h-full'>
              <div className='w-full flex items-center gap-2 p-1 border-b bg-slate-700'>
                <img
                  className='w-16 h-16 object-cover rounded-full'
                  src={
                    selectedChat.participants[0].userId == user._id
                      ? selectedChat.participants[1].displaypicture
                      : selectedChat.participants[0].displaypicture
                  }
                  alt=''
                />
                <h2 className=''>
                  {selectedChat.participants[0].userId == user._id
                    ? selectedChat.participants[1].name
                    : selectedChat.participants[0].name}
                </h2>
              </div>
              <div className='w-full h-full flex flex-col justify-end gap-2 py-2 border-r overflow-auto'>
                {selectedChat.messages.length ? (
                  selectedChat.messages.map((ele, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex items-center ${
                          ele.sender == user.username
                            ? "justify-end "
                            : "justify-start"
                        } gap-2`}
                      >
                        {" "}
                        <h3
                          className={`${
                            ele.sender == user.username
                              ? "place-self-end rounded-l-lg"
                              : "place-self-start rounded-r-lg"
                          } bg-slate-700 p-1 text-sky-100 font-medium border `}
                        >
                          {ele.text}
                        </h3>
                        <img
                          className={`w-9 h-9 object-cover rounded-full ${
                            ele.sender == user.username ? "-order-1" : ""
                          }`}
                          src={
                            ele.sender == selectedChat.participants[0].username
                              ? selectedChat.participants[0].displaypicture
                              : selectedChat.participants[1].displaypicture
                          }
                          alt=''
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className='text-center w-full'>Start sending messages</p>
                )}{" "}
              </div>
              <div className='flex gap-1 items-center justify-center w-full border-2 bg-blue-900 border-sky-800 rounded-lg '>
                <input
                  type='text'
                  name='message'
                  className='w-full py-1 px-3 text-sky-700 text-lg rounded-l-lg '
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder='Type a message...'
                />{" "}
                <div className='relative'>
                  <button
                    className='text-2xl text-amber-400 hover:text-orange-400'
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                  >
                    <BsEmojiHeartEyesFill />
                  </button>{" "}
                  <div className='absolute bottom-10 right-0'>
                    <EmojiPicker
                      open={showEmojiPicker}
                      onEmojiClick={handleEmojiClick}
                      lazyLoadEmojis={true}
                      width={"300px"}
                      height={"350px"}
                      previewConfig={{ showPreview: false }}
                    />
                  </div>
                </div>
                <button
                  className='bg-lime-500 py-1 px-2 text-lg  rounded-r-lg '
                  onClick={(e) => sendmsg(e)}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-2 text-xl text-cyan-300'>
              <h2 className='text-6xl border-cyan-400 border-2 p-3 rounded-full'>
                <SiWechat className='' />
              </h2>
              <p>Select Any Chat</p>
              <p>or</p>
              <button className='text-violet-300 hover:underline'>
                Start a new chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
