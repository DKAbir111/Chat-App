import React, { useContext, useEffect, useState } from "react";
import "./myStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../Images/live-chat_512px.png";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { myContext } from "./MainContainer";

function Users() {
  const { refresh, setRefresh } = useContext(myContext);
  const lightTheme = useSelector((state) => state.themeKey);
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const nav = useNavigate();
  const dispatch = useDispatch();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!userData) {
      console.log("User not Authenticated");
      nav(-1);
    }
  }, [userData, nav]); // Include userData and nav in the dependency array

  useEffect(() => {
    const fetchUsers = async () => {
      if (userData) {
        console.log("Users refreshed");
        const config = {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        };
        try {
          const { data } = await axios.get("http://localhost:8080/user/fetchUsers", config);
          console.log("UData refreshed in Users panel ");
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [refresh, userData?.data.token]); // Include userData?.data.token in the dependency array

  const createChat = async (userId) => {
    if (!userData) return;

    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    try {
      await axios.post("http://localhost:8080/chat/", { userId }, config);
      dispatch(refreshSidebarFun());
      setRefresh((prev) => !prev); // Toggle refresh to trigger sidebar update
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: "0.3" }}
        className="list-container"
      >
        <div className={"ug-header" + (lightTheme ? "" : " dark")}>
          <img
            src={logo}
            alt="Chat Application Logo"
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className={"ug-title" + (lightTheme ? "" : " dark")}>
            Available Users
          </p>
          <IconButton
            className={"icon" + (lightTheme ? "" : " dark")}
            onClick={() => setRefresh((prev) => !prev)}
          >
            <RefreshIcon />
          </IconButton>
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
        <div className="ug-list">
          {users.map((user, index) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={"list-tem" + (lightTheme ? "" : " dark")}
              key={index}
              onClick={() => createChat(user._id)} // Call createChat when a user is clicked
            >
              <p className={"con-icon" + (lightTheme ? "" : " dark")}>T</p>
              <p className={"con-title" + (lightTheme ? "" : " dark")}>
                {user.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Users;
