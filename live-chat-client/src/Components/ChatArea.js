import React, { useContext, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { myContext } from "./MainContainer";
import io from "socket.io-client"; // Import socket.io-client

const ENDPOINT = "http://localhost:8080"; // Adjust the endpoint as necessary

function ChatArea() {
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();

  const [chat_id, chat_user] = dyParams._id.split("&");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);

  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setLoaded] = useState(false);

  const socket = useRef(); // Create a ref for the socket instance

  // Connect to socket.io server
  useEffect(() => {
    socket.current = io(ENDPOINT); // Connect to the Socket.io server

    // Emit setup event with user data
    socket.current.emit("setup", userData);

    // Join the specific chat room
    socket.current.emit("join chat", chat_id);

    // Listen for incoming messages
    socket.current.on("messageReceived", (newMessage) => {
      setAllMessages((prevMessages) => [...prevMessages, newMessage]); // Update state with new message
    });

    // Cleanup on component unmount
    return () => {
      socket.current.disconnect(); // Disconnect the socket
    };
  }, [chat_id, userData]);

  // Function to send messages
  const sendMessage = () => {
    if (!messageContent.trim()) {
      console.error("Cannot send an empty message");
      return; // Prevent sending empty messages
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

    console.log("Sending message:", payload); // Log the payload to check its structure

    axios
      .post("http://localhost:8080/message/", payload, config)
      .then(({ data }) => {
        console.log("Message sent successfully:", data);
        socket.current.emit("new message", data); // Emit the new message to the server
        setMessageContent(""); // Clear input field after sending
        setRefresh(!refresh); // Trigger a refresh if needed
      })
      .catch((error) => {
        console.error("Error sending message:", error.response ? error.response.data : error);
      });
  };

  // Fetch messages for the current chat
  useEffect(() => {
    console.log("Users refreshed");
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
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
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
          <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={"messages-container" + (lightTheme ? "" : " dark")}>
          {allMessages
            .slice(0)
            .reverse()
            .map((message, index) => {
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                return <MessageSelf props={message} key={index} />;
              } else {
                return <MessageOthers props={message} key={index} />;
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
                sendMessage(); // Send message on Enter key
              }
            }}
          />
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={sendMessage} // Send message on button click
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default ChatArea;
