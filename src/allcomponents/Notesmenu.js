import React, { useContext, useEffect, useState } from "react";
import "./css/notesmenu.css";
import star from "./Images/star.png";
import star2 from "./Images/addedtofav.png";
import { Multiselect } from "multiselect-react-dropdown";
import Empty from "./Images/empty.jpg";
import noteContext from "./contexts/noteContext";
import todoContext from "./contexts/todoContext";
import { useNavigate } from "react-router-dom";
import multipageContext from "./contexts/mulitpageContext";

const Notesmenu = () => {
  const nevigate = useNavigate();


  const markascompleted=(tasks)=>{
    let flag = true
    for(let i=0;i<tasks.length;i++){
      if(tasks[i].iscompleted!==true){
        flag=false
      }
    }
    return flag
  }

  //going to show todo
  const totodo = (id) => {
    nevigate("/ShowTodo", { state: { todo: id } });
  };

  //going to show note
  const tonote = (id) => {
    nevigate("/ShowNote", { state: { note: id } });
  };

  //going to show multipage
  const tomultipage = (id) => {
    nevigate("/ShowMultipage", { state: { multipage: id } });
  };

  //getting contexts note and todo
  const context1 = useContext(noteContext);
  const { notes, getNotes } = context1;
  const context2 = useContext(todoContext);
  const { todos, getTodos } = context2;
  const context3 = useContext(multipageContext);
  const { multipages, getMultipages } = context3;

  //getting todos and notes
  useEffect(() => {
    if (localStorage.getItem("notetoken") !== null) {
      getNotes();
      getTodos();
      getMultipages();
    }
  }, []);

  //name of list toshow (notes,todos,multi)
  const [listName, setlistName] = useState("Notes");

  //onselect of list name
  const onSelect = (selectedList, selectedItem) => {
    setlistName(selectedItem.name);
  };

  //option for list names
  const options = [
    { name: "Notes" },
    { name: "Todo-Lists" },
    { name: "Multi-Page Notes" },
  ];

  //style for multiselector
  const multiselectstyle = {
    searchBox: {
      background: "#303030",
      outline: "0px",
      border: "0px",
      position: "unset",
    },
    option: {
      // To change css for dropdown options
      color: "white",
      backgroundColor: "#303030",
    },

    chips: {
      background: "none",
      fontSize: "25px",
      widht: "100%",
    },
  };

  //search input
  const [wsearch, setWsearch] = useState("");

  //on chnage of search input
  const search = (e) => {
    let input = e.target.value.toLowerCase();
    setWsearch(input);
  };

  //search mechnaism
  const onsearch = (list) => {
    const toshow = list.filter((el) => {
      if (wsearch === "") {
        return el;
      } else {
        return el.title.toLowerCase().includes(wsearch);
      }
    });
    return toshow;
  };

  return (
    <div className="notes-menu-list">
      {localStorage.getItem("notetoken") !== undefined ? (
        <>
          {/* Multiselect for notes todos and multipages */}
          <div className="multi-select">
            <Multiselect
              options={options}
              displayValue={"name"}
              singleSelect={true}
              style={multiselectstyle}
              customCloseIcon={Empty}
              selectedValues={options.slice(0, 1)}
              showArrow={true}
              onSelect={onSelect}
            ></Multiselect>
          </div>

          <div className="searchbar">
            <input
              name="search"
              onChange={search}
              type={"search"}
              placeholder={"🔎︎" + " Search..."}
            ></input>
          </div>

          <div className="thisisnoteslist">
            {
              //showing noteslist
              listName === "Notes" ? (
                onsearch(notes).map((note) => {
                  return (
                    <div key={note._id}>
                      <div
                        className="notescard"
                        onClick={() => tonote(note._id)}
                      >
                        <p className="title">
                          {!note.isfavourite ? (
                            <img src={star} alt="star"></img>
                          ) : (
                            <img src={star2} alt="star"></img>
                          )}
                          <>
                            {note.title.length > 30 ? (
                              <>{note.title.slice(0, 30)}..</>
                            ) : (
                              <>{note.title}</>
                            )}
                          </>
                        </p>
                        <p className="subtitle">
                          <>
                            {note.subtitle.length > 35 ? (
                              <>{note.subtitle.slice(0, 35)}..</>
                            ) : (
                              <>{note.subtitle}</>
                            )}
                          </>
                        </p>
                        <p className="notedate">{note.date.split("T")[0]}</p>
                      </div>
                    </div>
                  );
                })
              ) : //showing todolist lists
              listName === "Todo-Lists" ? (
                onsearch(todos).map((todo) => {
                  return (
                    <div key={todo._id}>
                      <div
                        className="notescard"
                        onClick={() => totodo(todo._id)}
                      >
                        <p className="title">
                          <>
                            {todo.title.length > 30 ? (
                              <>{todo.title.slice(0, 30)}..</>
                            ) : (
                              <>{todo.title}</>
                            )}
                          </>
                        </p>
                        <p className="subtitle">
                          <>
                            {markascompleted(todo.tasks) ? (
                              <>COMPLETED</>
                            ) : (
                              <>INCOMPLETE</>
                            )}
                          </>
                        </p>
                        <p className="notedate">{todo.date.split("T")[0]}</p>
                      </div>
                    </div>
                  );
                })
              ) : //showing multipage list
              listName === "Multi-Page Notes" ? (
                onsearch(multipages).map((mulitpage) => {
                  return (
                    <div key={mulitpage._id}>
                      <div
                        className="notescard"
                        onClick={() => tomultipage(mulitpage._id)}
                      >
                        <p className="title">
                          <>
                            {mulitpage.title.length > 30 ? (
                              <>{mulitpage.title.slice(0, 30)}..</>
                            ) : (
                              <>{mulitpage.title}</>
                            )}
                          </>
                        </p>
                        <p className="subtitle">
                          <>{"Pages : " + mulitpage.pages.length.toString()}</>
                        </p>
                        <p className="notedate">
                          {mulitpage.date.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )
            }
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Notesmenu;
