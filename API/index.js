const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const conversationRoute = require('./routes/conversation')
const messageRoute = require('./routes/message')
const process = require('process')

const app = express()

dotenv.config()

mongoose.connect(
    "mongodb+srv://Zeta:thuan2002@cluster0.pmjo1.mongodb.net/Zeta?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    () => {
        console.log('Connected to MongoDB...')
    }
)

app.use("/images", express.static(path.join(__dirname, "public/images")))

// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
// app.use(cors({origin: process.env.CLIENT_URL}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})
const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully!")
    }
    catch (err) {
        console.log(err)
    }
})

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/message", messageRoute)

app.get("/", (req, res) => {
    res.send("Welcome to Zeta!")
})

app.listen(process.env.PORT || 8800 , () => {
    console.log("Backend server is running...")
})

const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
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