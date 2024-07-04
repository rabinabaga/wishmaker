const dotenv = require("dotenv");

const app = require("./src/config/express.config.js");
dotenv.config();

const http = require("http");

const server = http.createServer(app);

const server_new = server.listen(8001, "localhost", (err) => {
  if (!err) {
    console.log("server is running on port", process.env.PORT);
  }
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connect to socket .io");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    console.log(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined", room);
  });

  socket.on("newMessage", (newMessageReceived) => {
    console.log("new message received", newMessageReceived);
    var chat = newMessageReceived.chat;
    if (!chat?.users) return console.log("chat users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});
