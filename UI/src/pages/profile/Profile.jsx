import { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios"

import Topbar from "../../components/topbar/Topbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Feed from "../../components/feed/Feed.jsx"
import Rightbar from "../../components/rightbar/Rightbar.jsx"
import "./profile.css"


export default function Profile() {
    // Public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER 
    const [user, setUser] = useState({})
    const username = useParams().username

    useEffect(async () => {
        const fetchUsers = async () => {
            const restore = await axios.get(`/users?username=${username}`)
            setUser(restore.data)
        }
        fetchUsers()
    }, [username])

    return (
        <>
            <Topbar/>
            <div className="profile-container">
                <Sidebar/>
                <div className="profile__right">
                    <div className="profile__right-top">
                        <div className="profile__cover">
                            <img 
                                src={user.coverPicture 
                                    ? `${PF}${user.coverPicture}`
                                    : `${PF}person/noCover.png`} 
                                alt="" 
                                className="profile__background" 
                            />
                            <img 
                                src={user.profilePicture 
                                    ? `${PF}${user.profilePicture}`
                                    :`${PF}person/noAvatar.png`} 
                                alt="" 
                                className="profile__avatar" 
                            />
                        </div>
                        <div className="profile__information">
                            <h4 className="profile__name">{user.username}</h4>
                            <span className="profile__description">
                                {user.description}
                            </span>
                        </div>
                    </div>
                    <div className="profile__right-bottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}
