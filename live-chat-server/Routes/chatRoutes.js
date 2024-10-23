const express = require("express");
const {
  accessChat,
  fetchChats,
  deleteChat
} = require("../Controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.delete('/:chatId', deleteChat); // Use this route to match '/chat/:chatId'



module.exports = router;
