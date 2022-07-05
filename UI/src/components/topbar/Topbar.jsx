import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Search, Person, Chat, Notifications, ExitToApp } from "@material-ui/icons"
import { Link, useNavigate } from "react-router-dom"
import "./topbar.css"

export default function Topbar () {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const navigate = useNavigate()

    const handleLogout = async () => {
        localStorage.setItem("user", null)
        navigate("/")
        window.location.reload()
    }
    
    return (
        <div className="topbar__container">
            <div className="topbar__left">
                <Link to="/">
                    <span className="topbar__logo">Zeta</span>
                </Link>
            </div>
            <div className="topbar__center">
                <div className="topbar__searchbar">
                    <Search className="topbar__searchbar-icon"/>
                    <input type="text" className="topbar__searchbar-input" 
                        placeholder="Search for friend, post or video..."
                    />
                </div>   
            </div>
            <div className="topbar__right">
                <div className="topbar__links">
                    <span className="topbar__link">Homepage</span>
                    <span className="topbar__link">Timeline</span>
                </div>
                <div className="topbar__icons">
                    <div className="topbar__icon">
                        <Person/>
                        <span className="topbar__icon-badge">1</span>
                    </div>
                    <div className="topbar__icon" onClick={() => navigate("/messenger")}>
                        <Chat/>
                        <span className="topbar__icon-badge">2</span>
                    </div>
                    <div className="topbar__icon">
                        <Notifications/>
                        <span className="topbar__icon-badge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img 
                        src={
                            user.profilePicture 
                            ? PF + user.profilePicture 
                            : PF + "person/noAvatar.png"
                        } 
                        alt="" 
                        className="topbar__img" 
                    />
                </Link>
                <ExitToApp onClick={handleLogout}/>
            </div>
        </div>
    )
}