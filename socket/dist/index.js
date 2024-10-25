"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server({
    cors: {
        origin: 'http://localhost:3000'
    }
});
let onlineUsers = [];
const addUser = ({ fullName, socketId }) => {
    if (!onlineUsers.some((user) => user.fullName === fullName)) {
        onlineUsers.push({ fullName, socketId });
    }
};
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (fullName) => {
    return onlineUsers.find((user) => user.fullName === fullName);
};
io.on("connection", (socket) => {
    socket.on("newUser", (fullName) => {
        addUser({ fullName, socketId: socket.id });
    });
    socket.on("likeComment", ({ fullName, type }) => {
        const reciever = getUser(fullName);
        if (reciever)
            io.to(reciever === null || reciever === void 0 ? void 0 : reciever.socketId).emit("sendUserLikeNotification", { fullName, type });
    });
    socket.on("deleteTask", (taskId) => {
        io.emit("sendDeleteTaskNotification", taskId);
    });
    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});
io.listen(4000);
