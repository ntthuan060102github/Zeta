const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
    console.log("A user connected...")
    
    // Take userId and socketID from users

    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected...")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })

    // Send & get message
    socket.on("sendMessage", ({senderId, receiverId, content}) => {
        const user = getUser(receiverId)
        io.to(user?.socketId).emit("getMessage", {senderId, content})
    })

})