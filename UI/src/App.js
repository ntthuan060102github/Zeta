import { useContext } from "react"
import { AuthContext } from "../src/context/AuthContext"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Messenger from "./pages/messenger/Messenger"
import Profile from "./pages/profile/Profile"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

function App() {
  const { user } = useContext(AuthContext)
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={user ? <Messenger/> : <Login/>}/>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>    
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/messenger" element={user ? <Messenger/> : <Navigate to="/"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
