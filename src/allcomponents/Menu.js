import React from "react";
import "./css/menu.css";
import person from "./Images/person.png";
import note from "./Images/note.png";
import tasks from "./Images/tasks.png";
import Logout from "./Images/setting.png";
import multipage from "./Images/multipage.png"
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const nevigate = useNavigate()
  const username = localStorage.getItem("notename")
  // console.log(username)

  const logout = ()=>{
    localStorage.removeItem("notetoken")
    localStorage.removeItem("notename")
    localStorage.removeItem("noteemail")
    nevigate("/")
    window.location.reload(false)
  }
  return (
    <>{(localStorage.getItem("notetoken")!==undefined)?(
    <div className="menu-cont">
      <ul className="menu-list">

        <li className="user-info">
          <img src={person} alt="logo"></img>
          <p>{username}</p>
        </li>

        <li className="options">

          <ul>
            <li onClick={() => {
                nevigate("/CreateNote")
                }}>
              <img
                src={note}
                alt={"logo"}
                
              ></img>
              <p>Note</p>
            </li>

            <li onClick={() => {
                 nevigate("/CreateTodo")
                }}>
              <img
                src={tasks}
                alt={"logo"}
              ></img>
              <p>Todo</p>
            </li>

            <li onClick={() => {
                 nevigate("/Multipage")
                }}>
              <img
                src={multipage}
                alt="logo"
              ></img>
              <p>Multi-Page</p>
            </li>

          </ul>
        </li>

        <li
          className="setting"
          onClick={logout}>
          <img src={Logout} alt="logo"></img>
          <p>Log Out</p>
        </li>

      </ul>

    </div>):<></>}
    </>
  );
};

export default Menu;
