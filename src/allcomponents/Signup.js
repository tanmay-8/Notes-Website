import {React,useState} from 'react'
import {useNavigate } from "react-router-dom";
import loginlogo from './Images/login.png'

const Signup = () => {
    const nevigate = useNavigate();

    //initializing user
    const [user, setUser] = useState({username:"",email: "",password: ""});

  //collecting text
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //add user
  const addUser= async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/createuser",{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:user.username,email:user.email,password:user.password})
      }); 
      const json = await  response.json()
      if(json.success){
        localStorage.setItem("notetoken",json.authtoken)
        localStorage.setItem("notename",user.username)
        localStorage.setItem("noteemail",user.email)
        nevigate("/")
      }else{
        alert(json.error,"Failed")
      }
  }
  return (
    <div>
    <div className="signinbody">
      <div className="signinform">
        <img src={loginlogo} alt="logo"></img>
        <form onSubmit={addUser}>
          <label>Username:</label>
          <input type={"text"} onChange={onChange} required={true} minLength={5} maxLength={10} name="username"></input>
          <label>Email:</label>
          <input type={"email"} onChange={onChange} required={true} name="email"></input>
          <label>Password:</label>
          <input type={"password"} onChange={onChange} required={true} name="password" minLength={8}></input>
          <input className="signinsubmit" type={"submit"} value={"Sign In"}></input>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup
