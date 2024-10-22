import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/themeSlice";
import axios from "axios";
import { myContext } from "./MainContainer";
import { io } from "socket.io-client"; // Import socket.io-client

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
  const { refresh, setRefresh } = useContext(myContext);
  const [conversations, setConversations] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [socket, setSocket] = useState(null); // Socket state

  if (!userData) {
    console.log("User not Authenticated");
    navigate("/");
  }

  const user = userData.data;

  // Establish Socket connection and listen to events
  useEffect(() => {
    const newSocket = io("http://localhost:8080"); // Connect to the Socket.IO server
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up connection on component unmount
    };
  }, []);

  // Fetch initial conversations
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.get("http://localhost:8080/chat/", config).then((response) => {
      console.log("Data refresh in sidebar ", response.data);
      setConversations(response.data);
    });
  }, [refresh, user.token]);

  // Listen for new messages or conversation updates through socket events
  useEffect(() => {
    if (socket) {
      // Event triggered when there's a new message
      socket.on("newMessage", (message) => {
        console.log("New message received", message);
        setRefresh((prev) => !prev); // Trigger a refresh on receiving a new message
      });

      // Event triggered when conversation updates
      socket.on("conversationUpdated", (conversation) => {
        console.log("Conversation updated", conversation);
        setRefresh((prev) => !prev); // Trigger a refresh when the conversation updates
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
        socket.off("conversationUpdated");
      }
    };
  }, [socket]);

  return (
    <div className="sidebar-container">
      <div className={"sb-header" + (lightTheme ? "" : " dark")}>
        <div className="other-icons">
          <IconButton onClick={() => navigate("/app/welcome")}>
            <AccountCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          <IconButton onClick={() => navigate("users")}>
            <PersonAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          <IconButton onClick={() => navigate("groups")}>
            <GroupAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          <IconButton onClick={() => navigate("create-groups")}>
            <AddCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>

          <IconButton onClick={() => dispatch(toggleTheme())}>
            {lightTheme ? (
              <NightlightIcon className={"icon" + (lightTheme ? "" : " dark")} />
            ) : (
              <LightModeIcon className={"icon" + (lightTheme ? "" : " dark")} />
            )}
          </IconButton>

          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/");
            }}
          >
            <ExitToAppIcon className={"icon" + (lightTheme ? "" : " dark")} />
          </IconButton>
        </div>
      </div>

      <div className={"sb-search" + (lightTheme ? "" : " dark")}>
        <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
          <SearchIcon />
        </IconButton>
        <input
          placeholder="Search"
          className={"search-box" + (lightTheme ? "" : " dark")}
        />
      </div>

      <div className={"sb-conversations" + (lightTheme ? "" : " dark")}>
        {conversations.map((conversation, index) => {
          // Get the other user by filtering out the current user
          const otherUser = conversation.users.find(
            (user) => user._id !== userData.data._id
          );

          if (!otherUser) return null; // If no other user, skip rendering

          if (!conversation.latestMessage) {
            return (
              <div
                key={index}
                onClick={() => setRefresh(!refresh)}
              >
                <div
                  className="conversation-container"
                  onClick={() => {
                    navigate(
                      "chat/" +
                      conversation._id +
                      "&" +
                      otherUser.name
                    );
                  }}
                >
                  <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                    {otherUser.name[0]}
                  </p>
                  <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {otherUser.name}
                  </p>

                  <p className="con-lastMessage">
                    No previous Messages, click here to start a new chat
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="conversation-container"
                onClick={() => {
                  navigate(
                    "chat/" +
                    conversation._id +
                    "&" +
                    otherUser.name
                  );
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                  {otherUser.name[0]}
                </p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>
                  {otherUser.name}
                </p>

                <p className="con-lastMessage">
                  {conversation.latestMessage.content}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Sidebar;
