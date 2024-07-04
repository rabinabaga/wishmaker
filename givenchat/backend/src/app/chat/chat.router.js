const router = require("express").Router();
const checkAuthentication = require("../../middlewares/auth.middleware");
const chatUserCtrl = require("./chat-user.controller");
const chatCtrl = require("./chat.controller")



router.get("/user", checkAuthentication, chatUserCtrl.allUsers);
router.post("/", checkAuthentication,chatCtrl.accessChat)
router.get("/", checkAuthentication, chatCtrl.fetchChats);
router.post("/group", checkAuthentication, chatCtrl.createGroupChat);
router.put("/group-rename", checkAuthentication, chatCtrl.renameGroup);
router.put("/add-to-group", checkAuthentication, chatCtrl.addToGroup);

router.put("/remove-from-group", checkAuthentication, chatCtrl.removeFromGroup);


module.exports = router;
