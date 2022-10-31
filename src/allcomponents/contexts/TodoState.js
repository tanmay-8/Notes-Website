import { useState } from "react";
import todoContext from "./todoContext"

const TodoState = (props) => {
  const todosinit = []

  const [todos,setTodos]=useState(todosinit);
  const [todo,setTodo]=useState(undefined);
  
  const getTodos = async()=>{
    const response = await fetch("http://localhost:5000/api/todo/gettodos",{
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("notetoken")
      },
     
    }); 
    let json = await  response.json()
    json = json.reverse()
    setTodos(json);
}

const getTodo = async(id)=>{
  const response = await fetch(`http://localhost:5000/api/todo/gettodo/${id}`,{
  method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem("notetoken")
    },
   
  }); 
  let json = await  response.json()
  setTodo(json)
}

const deleteTodo = async(id)=>{
  const response = await fetch(`http://localhost:5000/api/todo/deletetodo/${id}`,{
    method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("notetoken")
      },
    }); 
    const json = await  response.json()
    getTodos()
    setTodo(null)
    return json
}
  //adding todos
  const addTodo = async(Todo)=>{
    const response = await fetch("http://localhost:5000/api/todo/addtodo",{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem("notetoken")
        },
        body: JSON.stringify(Todo) 
      }); 
      const json = await  response.json()
      getTodos()
      return json
  }


  const changeComplete = async(todoid,taskid)=>{
    const response = await fetch(`http://localhost:5000/api/todo/changecomplete/${todoid}/${taskid}`,{
      method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem("notetoken")
        },
      }); 
      getTodos()
      getTodo(todoid)
      const json = await  response.json()
      return json
  }
  const changeCompleteTodo = async(id)=>{
    const response = await fetch(`http://localhost:5000/api/todo/changecompletetodo/${id}`,{
      method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem("notetoken")
        },
      }); 
      const json = await  response.json()
      getTodo(id)
      getTodos()
      return json
  }

  const updateTodo = async(id,todo)=>{
    const response = await fetch(`http://localhost:5000/api/todo/updatetodo/${id}`,{
      method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem("notetoken")
        },
        body:JSON.stringify(todo)
      }); 
      const json = await  response.json()
      getTodos()
      getTodo(id)
      return json
  }
  return (
    <todoContext.Provider value={{todos,setTodos,addTodo,changeComplete,getTodos,getTodo,todo,deleteTodo,changeCompleteTodo,updateTodo}}>{props.children}</todoContext.Provider>
  );
};

export default TodoState;
