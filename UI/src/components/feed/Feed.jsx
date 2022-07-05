import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Share from "../share/Share"
import Post from "../post/Post"
import "./feed.css"

export default function Feed ({username}) {
    const [posts, setPosts] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(async () => {
        const fetchPosts = async () => {
            const restore = username 
                ? await axios.get("/posts/profile/" + username) 
                : await axios.get("/posts/timeline/" + user._id)
            setPosts(restore.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPosts()
    }, [username, user._id])

    return (
        <div className="feed">
            <div className="feed__wrapper">
                {(!username || username === user.username) && <Share/>}
                {posts.map((post, idx) => <Post key={idx} post={post}/>)}
            </div>
        </div>
    )
}
