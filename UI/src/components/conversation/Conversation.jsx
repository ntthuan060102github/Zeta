import axios from "axios"
import { useState, useEffect } from "react"
import "./conversation.css"

export default function Conversation({conversation, currUser}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const friendId = conversation.members.find(m => m !== currUser._id)
    const getUser = async () => {
      try {
        const res = await axios.get('/users/' + friendId)
        setUser(res.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [currUser, conversation])

  return (
    <div className="conversation">
        <img 
          src={PF + (user?.profilePicture ? user.profilePicture : "person/noAvatar.png")} 
          alt="" 
          className="conversation__avatar" />
        <span className="conversation__username">{user?.username}</span>
    </div>
  )
}
