const router = require("express").Router();
const MessageModel = require("./message.model");


const messagesCtrl = require("./messages.controller");
const checkAuthentication = require("../../middlewares/auth.middleware");
const messagesSvc = require("./messages.service");



router.post("/", checkAuthentication, messagesCtrl.createMessage);
router.get("/:chatId", checkAuthentication, messagesCtrl.getAllMessages);
// router.put("/", checkAuthentication, messagesCtrl.updateMessage);

//http://localhost:3000/api/v1/banner?search=string&page=2


// router.get('/me',checkAuthentication,authCtrl.profile)
// router.get('/admin',checkAuthentication,checkPermission('admin'), authCtrl.adminPage);

module.exports = router;