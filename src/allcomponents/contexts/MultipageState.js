import { useState } from "react";
import multipageContext from "./mulitpageContext";

const MultipageState = (props) => {
  const multipagesinit = [];

  const [multipages, setMultipages] = useState(multipagesinit);
  const [multipage, setMultipage] = useState(undefined);

  const getMultipages = async () => {
    // api call
    const response = await fetch("http://localhost:5000/api/multipage/getmultipages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("notetoken"),
      },
    });
    let json = await response.json();
    json = json.reverse();
    setMultipages(json);
  };

  const getMultipage = async (id) => {
    // api call
    const response = await fetch(
      `http://localhost:5000/api/multipage/getmultipage/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("notetoken"),
        },
      }
    );
    const json = await response.json();
    // console.log(json)
    setMultipage(json);
  };

  const addMultipage = async (mulitpage) => {
    const response = await fetch("http://localhost:5000/api/multipage/addmultipage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("notetoken"),
      },
      body: JSON.stringify(mulitpage),
    });
    const json = await response.json();
    getMultipages()
    return json 
  };


  const deleteMultipage = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/multipage/deletemultipage/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("notetoken"),
        },
      }
    );
    const json = await response.json();
    setMultipage(undefined);
    getMultipages();
    return json;
  };
  
  const updateMultipage = async (id, mulitpage) => {
    const response = await fetch(
      `http://localhost:5000/api/multipage/updatemultipage/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("notetoken"),
        },
        body: JSON.stringify(mulitpage),
      }
    );
    const json = await response.json();
    getMultipages()
    getMultipage(id)
    return json;
  };

  return (
    <multipageContext.Provider
      value={{
        multipages,
        addMultipage,
        deleteMultipage,
        getMultipages,
        updateMultipage,
        multipage,
        setMultipage,
        getMultipage,
      }}
    >
      {props.children}
    </multipageContext.Provider>
  );
};

export default MultipageState;
