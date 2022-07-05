import "./closeFriend.css"

export default function CloseFriend({ user }) {
  // Public folder
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="sidebar__friend">
        <img src={PF + user.profilePicture} alt="" className="sidebar__friend-img" />
        <span className="sidebar__friend-name">{user.username}</span>
    </li>
  )
}
