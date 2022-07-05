import { format } from "timeago.js"
import "./message.css"

export default function Message({message, own, user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className={own ? "message own" : "message"}>
        <div className="message__top">
            <img 
                src={PF + (user.profilePicture ? user.profilePicture : "person/noAvatar.png")} 
                alt="" 
                className="message__avatar" 
            />
            <p className="message__content">{message.text}</p>
        </div>
        <div className="message__bottom">{format(message.createdAt)}</div>
    </div>
  )
}
