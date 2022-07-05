import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"
import { Link } from "react-router-dom"
import "./login.css"

export default function Login() {
    const username = useRef()
    const password = useRef()
    const {isFetching, dispatch} = useContext(AuthContext);
 
    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({username: username.current.value, password: password.current.value}, dispatch);
    }   
    return (
    <div className="login">
        <div className="login__wrapper">
            <div className="login__left">
                <h3 className="login__logo">Zeta</h3>
                <span className="login__description">
                    Connect with friends and the world around you on Zeta.
                </span>
            </div>
            <div className="login__right">
                <form className="login__form" onSubmit={handleSubmit}>
                    <input 
                        required
                        className="login__input"
                        placeholder="Username" 
                        type="text" 
                        ref={username}
                    />
                    <input 
                        required
                        minLength={6}
                        className="login__input" 
                        placeholder="Password"
                        type="password" 
                        ref={password}
                    />
                    <button className="login__button" disabled={isFetching}>
                        {
                            isFetching 
                            ? <CircularProgress color="inherit" size="26px"/> 
                            : "Log In"
                        }
                    </button>
                    <span className="login__forgot">Forgot password?</span>
                    <div className="login__line"></div>
                    <Link to="/register" className="login__button login__register-btn">
                        Create new Zeta account
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
