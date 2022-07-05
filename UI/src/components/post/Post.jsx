import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { MoreVert } from "@material-ui/icons"
import { useState, useEffect, useContext } from "react"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import "./post.css"

export default function Post({post}) {  
    // const user = Users.filter(currUser => currUser.id === post.userId)
    const [like, setLike] = useState(post.likes.length)
    const [liked, setLiked] = useState(false)
    const [user, setUser] = useState({})
    const {user: currentUser} = useContext(AuthContext)
    // Public folder
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        setLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(async () => {
        const fetchUsers = async () => {
            const restore = await axios.get(`/users?userId=${post.userId}`)
            setUser(restore.data)
        }
        fetchUsers()
    }, [post.userId])
    
    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", {userId: currentUser._id})
        }
        catch (err) {
            console.error(err)
        }
        setLike(liked ? like - 1 : like + 1)
        setLiked(!liked)
    }
    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__top">
                    <div className="post__top-left">
                        <Link to={`/profile/${user.username}`}>
                            <img src={PF + (user.profilePicture || "person/noAvatar.png")} alt="" className="post__profile-img" />
                        </Link>
                        <span className="post__user-name">{user.username}</span>
                        <span className="post__user-date">{format(post.createdAt)}</span>
                    </div>
                    <div className="post__top-right">
                        <MoreVert/>
                    </div>
                </div>
                <div className="post__center">
                    <span className="post__content-text">{post?.description}</span>
                    <img src={PF + post.image} alt="" className="post__content-img" />
                </div>
                <div className="post__bottom">
                    <div className="post__bottom-left">
                        <img 
                            src={`${PF}like.png`} 
                            alt="" 
                            className="post__bottom-icon" 
                            onClick={likeHandler}
                        />
                        <img src={`${PF}heart.png`} alt="" className="post__bottom-icon" />
                        <span className="post__bottom-like-count">{like} people like it.</span>
                    </div>
                    <div className="post__bottom">
                        <span className="post__bottom-comment">{post.comment || "0"} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}