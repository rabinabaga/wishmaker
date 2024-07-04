const UserModel = require("../auth/user.model");
const MessageModel = require("./message.model")
const ChatModel = require("../chat/chat.model.js")

class MessagesService{
   async createMessage(req){
      //alternate {content, chatId}   = req.body
      //validation
      //if(!content || !child){
      //return res.sendStatus(400)
      let message = new MessageModel({
        chat: req.body.chatId,
        content: req.body.content,
        sender: req.authUser._id,
      });
      try{
        let newMessage = await MessageModel.create(message);

        message = await newMessage.populate("sender", "name pic")

        message = await newMessage.populate("chat")

        message = await UserModel.populate(message,{
            path:"chat.users",
            select:"name pic email"
        })

        await ChatModel.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })

        return message;
    }catch(exception){
        res.status(400)
        throw new Error(exception.message)
      }
    }
  
      }
    

    //   try {
    //     response = await new_game_plan.save();
      
    //   } catch (exception) {
    //     console.log("exception", exception);
    //     throw exception;
    //   }
    


const messagesSvc = new MessagesService();
module.exports = messagesSvc;