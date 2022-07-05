import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Friend from "../friend/Friend"
import { Users } from "../../dummyData.js"
import {AuthContext} from "../../context/AuthContext"
import { Add, Remove } from "@material-ui/icons"
import "./rightbar.css"


export default function Rightbar ({ user }) {
    // Public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const {user: currentUser, dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id))

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id))
    }, [user?._id])

    useEffect(() => {
        const getFriends = async () => {
            if (user?._id) {
                try {
                    const friendList = await axios.get("/users/friends/" + user._id)
                    setFriends(friendList.data)
                }
                catch (err) {
                    console.log(err)
                }   
            }
        }
        getFriends()
    }, [user?._id])

    const handleFollow = async () => {
        try {
            if(followed) {
                await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id})
                dispatch({type: "UNFOLLOW", payload: user._id})
            }
            else {
                await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id})
                dispatch({type: "FOLLOW", payload: user._id})
            }
            setFollowed(!followed)
        }
        catch (err) {
            console.log(err)
        }
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthday">
                    <img src="assets/gift.png" alt="" className="birthday__img" />
                    <span className="birthday__text">
                        <b>N.T.Thuan</b> and <b>3 other friends</b> has a birthday today.
                    </span>
                </div>
                <img src="assets/ad.png" alt="" className="rightbar__ads" />
                <h4 className="rightbar__title">Online Friends</h4>
                <ul className="friends">
                    {Users.map(user => <Friend user={user} key={user.id}/>)}
                </ul>
            </>
        )
    }
    const ProfileRightbar = ({user}) => {
    
        return (
            <>
                {currentUser.username !== user.username && (
                    <button className="rightbar__follow-btn" onClick={handleFollow}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove/> : <Add/>}
                    </button>
                )}
                <h4 className="rightbar__title--profile">User Information</h4>
                <div className="rightbar__informations">
                    <div className="rightbar__information">
                        <span className="rightbar__information-key">City:</span>
                        <span className="rightbar__information-value">{user.city}</span>
                    </div>
                    <div className="rightbar__information">
                        <span className="rightbar__information-key">From:</span>
                        <span className="rightbar__information-value">{user.from}</span>
                    </div>
                    <div className="rightbar__information">
                        <span className="rightbar__information-key">Relationship:</span>
                        <span className="rightbar__information-value">
                            {user.relationship === 1 
                                ? "Single" 
                                :user.relationship === 2 
                                ? "Married" 
                                : "---"}
                        </span>
                    </div>
                </div>
                <h4 className="rightbar__title">User Friends</h4>
                <div className="rightbar__followers">
                    {friends.map((friend, idx) => (
                        <Link to={`/profile/${friend.username}`} key={idx}>
                            <div className="rightbar__follower">
                                <img 
                                src={
                                    PF + (friend.profilePicture
                                    ? friend.profilePicture
                                    : "person/noAvatar.png")
                                } 
                                alt="" 
                                className="rightbar__follower-img" />
                                <span className="rightbar__follower-name">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbar__wrapper">
                {user ? <ProfileRightbar user={user}/> : <HomeRightbar/>}
            </div>
        </div>
    )
}