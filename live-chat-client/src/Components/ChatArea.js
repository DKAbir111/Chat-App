import React, { useContext, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { myContext } from "./MainContainer";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8080"; // Adjust the endpoint as necessary

function ChatArea() {
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const [chat_id, chat_user] = dyParams._id.split("&");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);

  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setLoaded] = useState(false);

  const socket = useRef(); // Create a ref for the socket instance

  // Connect to socket.io server
  useEffect(() => {
    socket.current = io(ENDPOINT); // Connect to the Socket.io server
    socket.current.emit("setup", userData);
    socket.current.emit("join chat", chat_id);

    socket.current.on("messageReceived", (newMessage) => {
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Listen for chat deletion
    socket.current.on("chatDeleted", (deletedChatId) => {
      if (deletedChatId === chat_id) {
        alert("This chat has been deleted by another user.");
        navigate("/app/users"); // Redirect to the chat list
        window.location.reload(); // Reload the page
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [chat_id, userData, navigate]);

  const sendMessage = () => {
    if (!messageContent.trim()) {
      console.error("Cannot send an empty message");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    const payload = {
      content: messageContent,
      chatId: chat_id,
    };

    axios
      .post("http://localhost:8080/message/", payload, config)
      .then(({ data }) => {
        socket.current.emit("new message", data);
        setMessageContent("");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error sending message:", error.response ? error.response.data : error);
      });
  };

  // Function to delete a message
  const deleteMessage = async (messageId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:8080/message/${messageId}`, config);
      setAllMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error.response ? error.response.data : error);
    }
  };

  // Function to delete the entire chat
  const deleteChat = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
    if (!confirmDelete) return;

    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    try {
      await axios.delete(`http://localhost:8080/chat/${chat_id}`, config);
      // Emit chat deletion event to notify other users
      socket.current.emit("delete chat", chat_id);

      console.log("Chat deleted successfully");
      navigate("/app/users"); // Redirect to the chat list
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error deleting chat:", error.response ? error.response.data : error);
    }
  };

  // Fetch messages for the current chat
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    axios
      .get("http://localhost:8080/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error.response ? error.response.data : error);
      });
  }, [refresh, chat_id, userData.data.token]);

  if (!loaded) {
    return (
      <div style={{ border: "20px", padding: "10px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton variant="rectangular" sx={{ width: "100%", borderRadius: "10px" }} height={60} />
        <Skeleton variant="rectangular" sx={{ width: "100%", borderRadius: "10px", flexGrow: "1" }} height={60} />
        <Skeleton variant="rectangular" sx={{ width: "100%", borderRadius: "10px" }} height={60} />
      </div>
    );
  } else {
    return (
      <div className={"chatArea-container" + (lightTheme ? "" : " dark")}>
        <div className={"chatArea-header" + (lightTheme ? "" : " dark")}>
          <p className={"con-icon" + (lightTheme ? "" : " dark")}>
            {chat_user[0]}
          </p>
          <div className={"header-text" + (lightTheme ? "" : " dark")}>
            <p className={"con-title" + (lightTheme ? "" : " dark")}>
              {chat_user}
            </p>
          </div>
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={deleteChat} // Call delete chat function
            sx={{
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: 'red',
                color: '#fff',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={"messages-container" + (lightTheme ? "" : " dark")}>
          {allMessages.slice(0).reverse().map((message, index) => {
            const sender = message.sender;
            const self_id = userData.data._id;
            if (sender._id === self_id) {
              return <MessageSelf props={message} key={index} onDelete={deleteMessage} />;
            } else {
              return <MessageOthers props={message} key={index} onDelete={deleteMessage} />;
            }
          })}
        </div>
        <div ref={messagesEndRef} className="BOTTOM" />
        <div className={"text-input-area" + (lightTheme ? "" : " dark")}>
          <input
            placeholder="Type a Message"
            className={"search-box" + (lightTheme ? "" : " dark")}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                sendMessage();
              }
            }}
          />
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default ChatArea;
