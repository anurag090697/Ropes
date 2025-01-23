/** @format */

import React, { useEffect, useRef, useState } from "react";
import { SiWechat } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance, getConversation } from "../../slice";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { io } from "socket.io-client";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck, FaCheckDouble } from "react-icons/fa";

function Messages() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const { sender, recipient } = location.state || [];
  const [typing, setTyping] = useState(false);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { user, conversations, otherprofile } = useSelector(
    (state) => state.ropes
  );
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  useEffect(() => {
    if (user.logged) {
      const newSocket = io(import.meta.env.VITE_ROPES_API, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: true,
        timeout: 10000,
      });

      setSocket(newSocket);
      // console.log(newSocket);
      newSocket.on("connect", () => {
        // console.log("Connected to socket server");
        newSocket.emit("register_user", user.username);
      });

      // Cleanup on component unmount
      return () => {
        newSocket.close();
      };
    }
  }, []);

  useEffect(() => {
    if (socket && selectedChat) {
      // console.log(socket);
      socket.emit("join_conversation", {
        chatId: selectedChat._id,
        user: user.username,
      });
      socket.on("joined_conversation", (data) => {
        // setSelectedChat(data);
        // console.log(data);
      });

      socket.on("receive_message", (data) => {
        // setMessages(prev => [...prev, data]);
        // console.log(data);
        setSelectedChat(data);
        scrollToBottom();
      });

      socket.on("user_typing", (data) => {
        // console.log(data);
        setTyping(true);
        scrollToBottom();
      });
      socket.on("not_typing", (data) => {
        // console.log(data);
        setTyping(false);
      });
      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
    }
  }, [socket, selectedChat]);

  useEffect(() => {
    if (recipient) {
      dispatch(
        getConversation({
          sender,
          recipient,
        })
      );
    } else dispatch(getConversation({ sender: user._id }));
  }, [recipient, user]);

  async function sendmsg(e) {
    e.preventDefault();

    socket.emit("send_message", {
      sender: user._id,
      recipient:
        selectedChat.participants[0].userId == user._id
          ? selectedChat.participants[1].username
          : selectedChat.participants[0].username,
      message: { sender: user.username, text: msg },
      chatId: selectedChat._id,
    });
    let temp = selectedChat.messages;
    temp = [...temp, { sender: user.username, text: msg }];
    setSelectedChat((prev) => ({ ...prev, messages: temp }));
    setMsg("");
    setShowEmojiPicker(false);
    scrollToBottom();
  }

  // async function removeSelected() {
  //   socket.emit("left_conversation", {
  //     chatId: selectedChat._id,
  //     user: user.username,
  //   });
  // }
  if (!user.logged) {
    return navigate("/login");
  }

  return (
    <div className='mx-auto w-full md:w-3/4 xl:w-3/5 max-w-full md:rounded-lg md:border-2 md:h-[600px] overflow-y-scroll relative text-white bg-gradient-to-r from-slate-500 to-gray-500 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full  [&::-webkit-scrollbar-track]:bg-gray-100  [&::-webkit-scrollbar-thumb]:rounded-full  [&::-webkit-scrollbar-thumb]:bg-gray-700 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
      {" "}
      {selectedChat ? (
        <>
          <div className='w-full flex flex-col items-start justify-between '>
            {" "}
            <div className=' w-full flex items-center justify-start gap-2 p-1 border border-amber-500 bg-slate-700 fixed md:sticky md:top-0 right-0'>
              <button
                className='hover:bg-slate-500 text-3xl h-10 md:h-16 hover:text-amber-500'
                onClick={() => setSelectedChat(null)}
              >
                <IoIosArrowBack />
              </button>{" "}
              <img
                className='h-10 w-10 md:w-16 md:h-16 object-cover rounded-full'
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
            <div className='w-full min-h-[480px] flex flex-col justify-end gap-2 md:py-2 py-14 pb-24 border'>
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
                        } bg-slate-700 p-1 text-sky-100 font-medium border flex items-center justify-center gap-2`}
                      >
                        {ele.text}{" "}
                        {ele.sender == user.username ? (
                          ele.seen ? (
                            <span className='text-sm text-cyan-500'>
                              <FaCheckDouble />
                            </span>
                          ) : (
                            <span className='text-sm text-gray-500'>
                              <FaCheck />
                            </span>
                          )
                        ) : (
                          ""
                        )}
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
              {typing ? (
                <div className='flex items-center justify-start '>
                  <h3
                    className={`place-self-start rounded-r-lg p-1 text-sky-100 font-medium border animate-pulse `}
                  >
                    Typing....
                  </h3>
                  <img
                    className={`w-9 h-9 object-cover rounded-full `}
                    src={
                      selectedChat.participants[1].username == user.username
                        ? selectedChat.participants[0].displaypicture
                        : selectedChat.participants[1].displaypicture
                    }
                    alt=''
                  />
                </div>
              ) : (
                ""
              )}
            </div>{" "}
            <div className='flex gap-1 items-center justify-center w-full border-2 bg-blue-900 border-sky-800 rounded-lg fixed bottom-14 md:sticky z-50 md:bottom-0 right-0'>
              <input
                type='text'
                name='message'
                className='w-full py-1 px-3 text-sky-700 text-lg rounded-l-lg outline-lime-500'
                value={msg}
                onFocus={() =>
                  socket.emit("typing", {
                    sender: user._id,
                    recipient:
                      selectedChat.participants[0].userId == user._id
                        ? selectedChat.participants[1].username
                        : selectedChat.participants[0].username,
                  })
                }
                onBlur={() => {
                  socket.emit("not_typing", {
                    sender: user._id,
                    recipient:
                      selectedChat.participants[0].userId == user._id
                        ? selectedChat.participants[1].username
                        : selectedChat.participants[0].username,
                  });
                }}
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
                className='bg-lime-500 py-1 px-2 text-lg rounded-r-lg '
                onClick={(e) => sendmsg(e)}
              >
                Send
              </button>
            </div>
          </div>
          {/* <div ref={messageEndRef} className='mb-4' /> */}
        </>
      ) : (
        <div className='w-full overflow-y-auto '>
          <h3 className='w-fit mx-auto text-3xl font-medium'>Chats</h3>
          <p className='w-fit mx-auto text-sky-300'>Select any chat</p>
          <div className='flex flex-col gap-1 items-start justify-start p-1 lg:p-2 text-amber-500 w-full'>
            {conversations.length ? (
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
                      <p className='text-gray-400'>
                        {ele.messages.length
                          ? ele.messages[ele.messages.length - 1].text
                          : ""}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='flex flex-col items-center gap-2 text-xl w-full text-cyan-300'>
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
      )}
      <div ref={messageEndRef} className='mb-4' />
    </div>
  );
}

export default Messages;

// console.log(msg, sender, recipient);
// const res = await axiosInstance.post("/sendMsg", {
//   sender: user._id,
//   recipient:
//     selectedChat.participants[0].userId == user._id
//       ? selectedChat.participants[1].userId
//       : selectedChat.participants[0].userId,
//   message: { sender: user.username, text: msg },
// });

// const socket = io(import.meta.env.VITE_ROPES_API, {
//   withCredentials: true,
// });
