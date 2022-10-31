import {React,useState} from 'react'
import './css/login.css'
import {useNavigate } from "react-router-dom";
import loginlogo from './Images/login.png'
import { Link } from 'react-router-dom';

const Login = () => {
    const nevigate = useNavigate();

    //initializing user
    const [user, setUser] = useState({email: "",password: ""});

  //collecting text
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //add user
  const addUser= async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/login",{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:user.email,password:user.password})
      }); 
      const json = await  response.json()
      if(json.success){
        localStorage.setItem("notetoken",json.authtoken)
        localStorage.setItem("notename",json.username)
        localStorage.setItem("noteemail",user.email)
        window.location.reload(false)
        nevigate("/")
      }else{
        alert(json.error,"failed")
      }
  }

  return (
    <>
    {/* Main sign in form */}
    <div className="signinbody">
      <div className="signinform">
        <img src={loginlogo} alt="logo"></img>
        <form onSubmit={addUser}>
          <label>Email:</label>
          <input type={"email"} onChange={onChange} required={true} name="email"></input>
          <label>Password:</label>
          <input type={"password"} onChange={onChange} required={true} name="password"></input>
          <input className="signinsubmit" type={"submit"} value={"Sign In"}></input>
        </form>
        <Link to={"/Signup"}>New User ? Sign Up Here </Link>
      </div>
    </div>
    </>)
}

export default Login
