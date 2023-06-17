import axios from "axios";
import {  useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { GiCancel } from "react-icons/gi";

import "./register.css";


const Register = () => {
  //  const [credentials, setCredentials] = useState({
  //      username: undefined,
  //      password: undefined,
  //  });

  //  const { loading, error, dispatch } = useContext(AuthContext); 
   
   const [file, setFile] = useState("");
   const [success, setSuccess] = useState(false);
   const [failure, setFailure] = useState(false);
   const nameRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
   const countryRef = useRef();
   const phoneRef = useRef();
   const cityRef = useRef();
   const navigate = useNavigate();

//    const handleChange = (e) => {
//         setCredentials((prev) => (
//            { ...prev, [e.target.id] : e.target.value}
//         ));
//    }; 
   const handleClick = () => {
    navigate("/");
   };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","upload");
    try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/harsh-cloud/image/upload",
           data
          );
        const {url} = uploadRes.data;
        
        // const newUser = {
        //   ...info,
        //   img: url,
        // };

        const newUser = {
            username: nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            country:countryRef.current.value,
            city:cityRef.current.value,
            phone:phoneRef.current.value,
            img: url,
        };
        await axios.post("/auth/register", newUser);
        setFailure(false);
        setSuccess(true);

    }catch(err) {
        setSuccess(false);
        setFailure(true);
        console.log(err);
    }
};


    return (
      <div className="register">
            <div className="registerContainer">
        { success && 
          <div className="cancel">
            <GiCancel onClick={handleClick} className="cancelIcon" />
          </div>
        }
        <div className="rTop">
            User Register 
        </div>
        <div className="rBottom">
        <div className="rbTop">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className="rInput"
            />
            <div className="imgContainer">
            Image : 
            <label htmlFor="file" className="rbtInput" >
                   <MdOutlineDriveFolderUpload className="icon" />
            </label>
            <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  className="rbtInput"
            />
            </div>
        </div>
        <div className="rbBottom">
        <form onSubmit = {handleSubmit}>
            {/* whenever those values are changed ref will change  */}

            <input type="text" placeholder="username" ref={nameRef} className="rbbInput" />
            <input type="email" placeholder="email" ref={emailRef} className="rbbInput" />
            <input type="password" placeholder="password" ref={passwordRef} className="rbbInput" />
            <input type="country" placeholder="country" ref={countryRef} className="rbbInput" />
            <input type="city" placeholder="city" ref={cityRef} className="rbbInput" />
            <input type="phone" placeholder="phone" ref={phoneRef} className="rbbInput" />
            <div className="Btn rbbInput">
            <button className="registerBtn">Register</button>
            </div>
            {success &&
                <div className="notification">
                    <span className="success">Successfull ! </span>
                </div>
            }
            {failure &&
                 <div className="notification">
                 <span className="failure">Something went wrong ! </span>
             </div>
            }
        </form>
        </div>

        </div>
    </div>
      </div>
    );
};

export default Register;


