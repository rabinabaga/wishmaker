const messagesSvc = require("./messages.service.js");
const MessageModel = require("./message.model.js");
const UserModel = require("../auth/user.model.js")
const ChatModel = require("../chat/chat.model.js")

class MessagesController {
  messagesSvc;
  constructor(svc) {
    this.messagesSvc = svc;
  }
  async createMessage(req, res, next) {
    try {
      let new_message = await messagesSvc.createMessage(req);
      res.status(200).send(new_message);
    } catch (exception) {
      console.log("exception in create msg controller", exception);
    }
  }
  async getAllMessages(req, res, next) {
    try {
      const messages = await MessageModel.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate({
          path:"chat",
          model:"Chat",
          populate:{
            path:'users',
            model:'User'
          }
        })
        res.json(messages);

      //  message = await UserModel.populate(message,{
      //     path:"chat.users",
      //     select:"name pic email"
      // })
// let getAllPopulatedMessages ;
//     if(messages){
//         getAllPopulatedMessages = await messages.map(
//          async (msg) =>
//            await UserModel.populate(msg, {
//              path: "chat.users",
//              select: "name pic email",
//            })
//        );
//     }
//  if(getAllPopulatedMessages){
//        console.log("get all pupulated mes", getAllPopulatedMessages);
//        res.json(getAllPopulatedMessages);
//  }
    } catch (exception) {
      console.log("get all messags exceptio", exception);
      res.status(400);
      throw new Error(exception.message);
    }
  }
}

const messagesCtrl = new MessagesController();
module.exports = messagesCtrl;
