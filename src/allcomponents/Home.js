import React, {useEffect, useContext } from "react";
import "./css/home.css";
import { useNavigate } from "react-router-dom";
import noteContext from "./contexts/noteContext";
import todoContext from "./contexts/todoContext";
import multipageContext from "./contexts/mulitpageContext";



const Home = () => {

  const context1 = useContext(noteContext)
  const context2 = useContext(todoContext)
  const context3 = useContext(multipageContext)
  const {getNotes} = context1
  const {getTodos} = context2
  const {getMultipages} = context3

  const token = localStorage.getItem("notetoken")
  //getting notes ,todos and mulitpages 
  useEffect(() => {
    if (localStorage.getItem("notetoken")!==null) {
      getNotes()
      getTodos()
      getMultipages()
    } else {
      tologin();
    }
  },[token]);

  //if not logged in
  const nevigate = useNavigate();
  const tologin = () => {
    nevigate("/login");
  };


  return (
    <>
      {localStorage.getItem("notetoken")!==null?(
        <></>
      ):
      (<>{tologin()}</>
      )}
    </>
  );
};

export default Home;
