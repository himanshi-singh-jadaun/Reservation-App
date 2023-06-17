import { useContext} from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
    
    const { dispatch } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    // For normal way , use these and instead of checking
    // user check currentUser down 
    // const myStorage = window.localStorage;
    // const [currentUser, setCurrentUser] = useState(user);

    const handleLogout = () => {
        // By using AuthContext
        dispatch({ type: "LOGOUT" });
        navigate('/');
        // this was normal way
        // myStorage.removeItem("user");
        // setCurrentUser(null);
        // window.location.reload(); // To avoid this we used the CurrentUser concept
    };

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">Booking</span>
                </Link>
                {user ? (<>
                    <div className="navItems">
                        {user.username}
                        <button onClick={handleLogout} className="navButton">Logout</button>
                    </div>
                </>) :
                    (
                        <div className="navItems">
                            <button onClick={handleRegister} className="navButton">Register</button>
                            <button onClick={handleLogin} className="navButton">Login</button>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Navbar;