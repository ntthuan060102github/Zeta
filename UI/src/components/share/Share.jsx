import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import axios from "axios"
import "./share.css"

export default function Share() {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const description = useRef()
    const [file, setFile] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPost = {
            userId: user._id,
            description: description.current.value,
        }
        
        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            newPost.image = fileName

            try {
                await axios.post("/upload", data)
            }
            catch (err) {
                console.log(err)
            }
        }

        try {
            await axios.post("/posts", newPost)
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    }

  return (
    <div className="share">
        <div className="share__wrapper">
            <div className="share__top">
                <img 
                    src={
                        PF + (user.profilePicture 
                        ? user.profilePicture
                        : "person/noAvatar.png")
                    } 
                    alt="" 
                    className="share__profile-img" />
                <input 
                    type="text" 
                    className="share__input" 
                    placeholder={"What's on your mind " + user.username + "?"} 
                    ref={description}
                />
            </div>
            <hr className="share__hr" />
            {file && (
                <div className="share__img-preview">
                    <img className="share__img" src={URL.createObjectURL(file)} alt="" />
                    <Cancel 
                        className="share__cancel-preview"
                        onClick={() => setFile(null)}
                    />
                </div>
            )}
            <form className="share__bottom" onSubmit={handleSubmit}>
                <div className="share__options">
                    <label htmlFor="input__file" className="share__option">
                        <PermMedia htmlColor="tomato" className="share__icon"/>
                        <span className="share__option-text">Photo or Video</span>
                        <input 
                            type="file" 
                            className="share__option-feature" 
                            id="input__file"
                            accept=".png, .jpg, .jpeg"
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </label>
                    <div className="share__option">
                        <Label htmlColor="blue" className="share__icon"/>
                        <span className="share__option-text">Tag</span>
                    </div>
                    <div className="share__option">
                        <Room htmlColor="green" className="share__icon"/>
                        <span className="share__option-text">Location</span>
                    </div>
                    <div className="share__option">
                        <EmojiEmotions htmlColor="goldenrod" className="share__icon"/>
                        <span className="share__option-text">Feeling</span>
                    </div>
                </div>
                <button className="share__button" type="submit">Post</button>
            </form>
        </div>
    </div>
  )
}
