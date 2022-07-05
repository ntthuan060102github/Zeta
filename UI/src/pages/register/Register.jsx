import { useRef, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "./register.css"

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()

    const history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Password don't match!")
        } 
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                const res = await axios.post("users/register", user)
                history("/login")
            }
            catch (err) {
                console.log(err)
            }
        }
    } 
    useEffect(() => {
        username.current.value = ""
        email.current.value = ""
        password.current.value = ""
    }, [])
  return (
    <div className="register">
        <div className="register__wrapper">
            <div className="register__left">
                <h3 className="register__logo">Zeta</h3>
                <span className="register__description">
                    Connect with friends and the world around you on Zeta.
                </span>
            </div>
            <div className="register__right">
                <form className="register__form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="register__input"
                        placeholder="Username" 
                        ref={username}
                        required
                    />
                    <input 
                        type="email" 
                        className="register__input"
                        placeholder="Phone or email" 
                        ref={email}
                        required
                    />
                    <input 
                        type="password" 
                        className="register__input" 
                        placeholder="Password"
                        ref={password}
                        required
                        minLength="6"
                    />
                    <input 
                        type="password" 
                        className="register__input" 
                        placeholder="Password again"
                        ref={passwordAgain}
                        required
                        minLength="6"
                    />
                    <button className="register__button" type="submit">Sign Up</button>
                    <div className="register__line"></div>
                    <Link to="/login" className="register__button register__register-btn">Log into account</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
