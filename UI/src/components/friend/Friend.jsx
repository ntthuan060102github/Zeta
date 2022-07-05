import "./friend.css"

export default function Friend({ user }) {
  // Public folder
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="friend">
        <div className="friend__wrapper">
            <img src={PF + user.profilePicture} alt="" className="friend__img" />
            <span className="friend__isOnline"></span>
        </div>
        <span className="friend__user-name">{user.username}</span>
    </li>
  )
}
