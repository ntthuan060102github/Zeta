import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation.jsx"
import Message from "../../components/message/Message.jsx"
import ChatOnline from "../../components/chatOnline/ChatOnline.jsx"
import { Send } from "@material-ui/icons"
import { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { io } from "socket.io-client"
import "./messenger.css"

export default function Messenger() {
    const [conversations, setConversations] = useState([])
    const [currChat, setCurrChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { user } = useContext(AuthContext)
    const scrollEnd = useRef()
    const socket = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.content,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage 
            && currChat?.members.includes(arrivalMessage.sender)
            && setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(user.followings.filter(f => users.some(u => u.userId === f)))
        })
    }, [user])

    useEffect(() => {
        const getConversation = async () => {
            try {
                const conv = await axios.get("/conversation/" + user._id)
                setConversations(conv.data)
            }
            catch (err) {
                console.error(err)
            }
        }
        getConversation()
    }, [user._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/message/" + currChat?._id)
                setMessages(res.data)
            }
            catch (err) {
                console.error(err)
            }
        }
        getMessages()
    }, [currChat])

    useEffect(() => {
        scrollEnd.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault()

        if (newMessage !== "")
        { 
            const mess = {
                sender: user._id,
                text: newMessage,
                conversationId: currChat._id
            }

            const receiverId = currChat.members.find(member => member !== user._id)
            
            socket.current.emit("sendMessage", {
                senderId: user._id,
                receiverId,
                content: newMessage
            })

            try {
                setNewMessage("")
                const res = await axios.post("/message", mess)
                setMessages([...messages, res.data])
            }
            catch (err) {
                console.error(err)
            }
        }
    }
    const handleEnterKey = (e) => {
        if(e.key === "Enter"){
            handleSendMessage(e)
        }
    }
    return (
    <>
        <Topbar/>
        <div className="messenger">
            <div className="chat-menu">
                <div className="chat-menu__wrap">
                    <input 
                        type="text" 
                        className="chat-menu__search" 
                        placeholder="Search for friends..."
                    />
                    {conversations.map((conversation, idx) =>( 
                        <div key={idx} onClick={() => setCurrChat(conversation)}>
                            <Conversation 
                                conversation={conversation}
                                currUser={user}
                            />
                        </div>))
                    }
                </div>
            </div>
            <div className="chat-box">
                <div className="chat-box__wrap">
                    {
                        currChat ?
                    <>
                        <div className="chat-box__top">
                            {messages.map((message, idx) => 
                                <div key={idx} ref={scrollEnd}>

                                    <Message 
                                        message={message} 
                                        own={message.sender === user._id}
                                        user={user} 
                                    />
                                </div>
                            )}
                        </div>
                        <div className="chat-box__bottom">
                            <input 
                                placeholder="Aa" 
                                className="chat-box__input"
                                onChange={e => setNewMessage(e.target.value)}
                                value={newMessage}
                                onKeyDown={handleEnterKey}
                            />
                            <button 
                                className="char-box__submit"
                                onClick={handleSendMessage}
                            >
                                <Send className="char-box__submit-icon"/>
                            </button>
                        </div>
                    </>
                    : <span className="chat-box__notification">Open a conversation to start a chat.</span>}
                </div>
            </div>
            <div className="chat-online">
                <div className="chat-online__wrap">
                    <ChatOnline 
                        onlineUsers={onlineUsers}
                        currUserId={user._id}
                        setCurrChat={setCurrChat}
                        setConversations={setConversations}
                    />
                </div>
            </div>
        </div>
    </>
  )
}
