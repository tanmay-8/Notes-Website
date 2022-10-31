import React, { useContext, useState } from "react";
import "./css/todo.css";
import Remove from "./Images/cross.png";
import Add from "./Images/add.png";
import todoContext from "./contexts/todoContext";

const Todo = () => {
  //getting context todo context
  const context = useContext(todoContext);
  const { addTodo} = context;

  //intializing titles and inputs for tasks
  const [title, setTitle] = useState("");
  const [inputlist, setInputlist] = useState([{ task: "" }]);

  //checking if task input is empty
  const isempty = (list) => {
    let flag = false;
    for (let k = 0; k < list.length; k++) {
      if (list[k].task.length < 5) {
        flag = true;
      }
    }
    return flag;
  };

  //getting tasks from inputlist
  const gettasks = (list) => {
    let tasks = [];
    for (let i = 0; i < list.length; i++) {
      let task = { task: list[i].task };
      tasks.push(task);
    }
    return tasks;
  };

  //adding new task input
  const addinput = () => {
    const list = [...inputlist, { task: "" }];
    setInputlist(list);
  };

  //onchange of task input
  const onChange = (e, i) => {
    const list = [...inputlist];
    list[i] = { ...list[i], [e.target.name]: e.target.value };
    setInputlist(list);
  };

  //removing task input
  const removeinput = (i) => {
    if (i !== 0) {
      const list = inputlist.filter((li) => {
        return inputlist.indexOf(li) !== i;
      });
      setInputlist(list);
    }
  };

  //adding todolist
  const addtodo = () => {
    if (title.length <= 15) {
      alert("Title Should Be Of Atleast 15 Characters");
    } else if (isempty(inputlist)) {
      alert("Task Can Not Be Blank Should Be Atleast 5 Characters Long.");
    } else {
      let todo = { title: title, tasks: gettasks(inputlist) };
      addTodo(todo);
    }
  };

  return (
    <div className="todo-main-container">
      {/* Todo title */}
      <input
        id="todo-title"
        className="todo-title"
        name="todo-title"
        placeholder="Title"
        autoComplete="off"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>

      {/* input for tasks */}
      <div className="tasks-main-container">
        {inputlist.map((input) => {
          const i = inputlist.indexOf(input);
          return (
            <div className="taskcontainer" key={i}>
              <input
                placeholder="Task"
                className="task-input"
                name={"task"}
                required={true}
                autoComplete="off"
                onChange={(e) => onChange(e, i)}
              ></input>
              <button
                onClick={() => {
                  removeinput(i);
                }}
              >
                <img src={Remove} alt="remove"></img>
              </button>
            </div>
          );
        })}

        <button className="add-task" onClick={addinput}>
          <img src={Add} alt="add"></img>
        </button>
      </div>

      {/* save button */}
      <button className="todo-save" onClick={addtodo}>
        SAVE
      </button>
    </div>
  );
};

export default Todo;
