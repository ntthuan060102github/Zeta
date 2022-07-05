import { useState, useEffect } from "react"
import axios from "axios"
import "./chatOnline.css"

export default function FriendChatOnline({onlineUsers, currUserId, setCurrChat, setConversations}) {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currUserId)
      setFriends(res.data)
    }

    getFriends()
  }, [currUserId])

  useEffect(() =>{
    setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)))
  }, [friends, onlineUsers])
  
  const handleClickFriendOnline = async (onlineFriend) => {
    try {
      const res = await axios.get(`/conversation/find/${currUserId}/${onlineFriend._id}`)
      if(res.data === null) {
        const newConv = await axios.post("/conversation", {
          senderId: currUserId,
          receiverId: onlineFriend._id
        })
        setCurrChat(newConv)
      }
      else {
        setCurrChat(res.data)
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="friend-chat-online">
      {
        onlineFriends.map((onlineFriend, idx) => (
          <div 
            className="friend-chat-online__wrap" 
            key={idx} 
            onClick={() => handleClickFriendOnline(onlineFriend)}
          >
              <div className="friend-chat-online__avatar">
                  <img  
                    className="friend-chat-online__img" 
                    src={
                      PF + (onlineFriend?.profilePicture 
                        ? onlineFriend.profilePicture
                        : "person/noAvatar.png"
                        )} 
                    alt="" 
                  />
                  <div className="friend-chat-online__badge"></div>
              </div>
              <span className="friend-chat-online__username">{onlineFriend.username}</span>
          </div>
        ))
      }
    </div>
  )
}
