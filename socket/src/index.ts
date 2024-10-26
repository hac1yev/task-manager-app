import { Server } from 'socket.io';
 
const io = new Server({
    cors: {
        origin: 'https://taskzen-management.vercel.app'
    }
});

let onlineUsers: {
    fullName: string;
    socketId: string;
}[] = [];

const addUser = ({ fullName,socketId }: { fullName: string, socketId: string }) => {  
    if(!onlineUsers.some((user) => user.fullName === fullName)) {        
        onlineUsers.push({ fullName,socketId });
    }
};

const removeUser = (socketId: string) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (fullName: string) => {       
    return onlineUsers.find((user) => user.fullName === fullName);
};

io.on("connection", (socket) => {
    socket.on("newUser", (fullName) => {        
        addUser({ fullName, socketId: socket.id });
    });

    socket.on("likeComment", ({ fullName,type }) => {
        const reciever = getUser(fullName);
        if(reciever) io.to(reciever?.socketId).emit("sendUserLikeNotification", { fullName,type });
    });

    socket.on("deleteTask", (taskId) => {
        io.emit("sendDeleteTaskNotification", taskId);
    });
    
    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});

io.listen(4000);