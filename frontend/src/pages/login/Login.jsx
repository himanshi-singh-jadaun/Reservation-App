import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";


const Login = () => {
   const [credentials, setCredentials] = useState({
       username: undefined,
       password: undefined,
   });

   const { loading, error, dispatch } = useContext(AuthContext); 
   
   // this was basic method
   // use this and in place of error , use loginfail down there
   // for checking condition
  //  const [loginFail, setLoginFail] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e) => {
        setCredentials((prev) => (
           { ...prev, [e.target.id] : e.target.value}
        ));
   }; 

   const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type : "LOGIN_SUCCESS", payload: res.data.details});
            navigate("/");
            // setLoginFail(false);
        } catch(err) {
            // setLoginFail(true);
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
   };


    return (
      <div className="login">
         <div className="lHeader">
          <span>User Login</span>
         </div>
        <div className="lContainer">
           <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
           <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
           <button
            onClick = {handleClick} 
            disabled = {loading}
            className="lButton"
            >
            Login
            </button>
           {error && <>
            <div className="lfail">
            <span>
              Invaild credentials !
            </span>
            </div>
           </>}
        </div>
      </div>
    );
};

export default Login;

