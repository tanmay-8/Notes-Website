import React, { useContext, useEffect} from "react";
import "./css/showtodo.css";
import todoContext from "./contexts/todoContext";
import { useLocation, useNavigate } from "react-router-dom";
import edit from "./Images/edit.png";
import deleteimg from "./Images/delete.png";

const ShowTodo = () => {
  //Number of completed tasks
  const getCompleted = (list) => {
    let completed = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].iscompleted) {
        completed = completed + 1;
      }
    }
    return completed;
  };


  //getting context todo context
  const context = useContext(todoContext);
  const { changeComplete, getTodo, todo, deleteTodo, changeCompleteTodo ,getTodos } =
    context;

  //getting id of todo
  const id = useLocation().state.todo;

  //when first rendered
  useEffect(() => {
    //get todo
    getTodo(id);
  }, [id]);



  const nevigate = useNavigate();

  //change on clicking on checkboxes
  const change = (todoid, taskid) => {
    changeComplete(todoid, taskid);
    getTodo(todoid)
    if (todo.tasks.length === getCompleted(todo.tasks)) {
      changeCompleteTodo(todo._id);
    }
  };

  return (
    <div>
      {todo !== undefined && todo !== null ? (
        <div className="style2">
          {/* edit and delete button */}
          <div className="headshownote">
            <div className="showimages">
              <>
                <img
                  src={deleteimg}
                  alt="logo"
                  onClick={() => {
                    deleteTodo(id);
                  }}
                ></img>
                <img
                  id="edittodo"
                  src={edit}
                  onClick={() => {
                    if (!todo.iscompleted) {
                      nevigate("/EditTodo", { state: { prevtodo: todo } });
                    } else {
                      alert("Already Completed");
                    }
                  }}
                  alt="logo"
                ></img>
              </>
            </div>
          </div>

          {/* Title of todo list */}
          <div className="showtitle">❖{" " + todo.title}</div>

          {/* Tasks in todo list */}
          <div className="show-todos-tasks">
            {todo.tasks.map((task) => {
              return (
                <div key={task._id} className="task-item">
                  <p>{task.task}</p>
                  <input
                    id="iscompleted"
                    type={"checkbox"}
                    className={"checkbox"}
                    defaultChecked={task.iscompleted ? true : false}
                    disabled={(todo.tasks.length==getCompleted(todo.tasks))?true:false}
                    onClick={() => {
                      change(todo._id, task._id);
                    }}
                  ></input>
                </div>
              );
            })}
          </div>

          {/* Showing completed tasks */}
          {/* <div className="completed-tasks">
            {completed + "/" + todo.tasks.length + " tasks are completed."}
          </div> */}

          {/* showing date */}
          <div className="showdate2">{todo.date.split("T")[0]}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShowTodo;
