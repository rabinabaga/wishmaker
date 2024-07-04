// const asyncHandler = require("express-async-handler");
const User = require("../auth/user.model");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
class ChatUserController{
  async allUsers(req, res){
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.authUser._id } });
  res.json(users);
};
}

//@description     Register new user
//@route           POST /api/user/
//@access          Public


//@description     Auth the user
//@route           POST /api/users/login
//@access          Public


const chatUserCtrl = new ChatUserController();
module.exports = chatUserCtrl;
