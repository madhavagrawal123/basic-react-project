import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function TodoList() {
  const [todos,settodos] = useState([{task:"",key:uuidv4(),isDone:false}]);
  const [newtodo,setnewtodo] = useState("");
   let handlevalue  = (event)=> {
     setnewtodo(event.target.value);
    // console.log(event.target.value);
   }
   let handlesubmit = ()=> {
    if(newtodo ===""){
      return;
    }
     settodos([...todos, {task:newtodo,key:uuidv4(),isDone:false}])
      setnewtodo("");
   }
   let deletetask  = (key)=> {
      settodos(todos.filter(todo => todo.key !== key))
   }
   
      let upperCaseOne = (id) => {
  settodos((prevTasks) =>
    prevTasks.map((todo) => {
      if (todo.key === id) {
        return {
          ...todo,
            isDone:true
        };
      } else {
        return todo;
      }
    })
  );
};
   

  return (

    <>
    <h1>Your very own Todo</h1>
    <br />
      <input type="text" value = {newtodo} onChange={handlevalue}  />
      <br /><br />
      <button onClick={handlesubmit}>submit</button>
      <br /><br />
      <h3>remaining work</h3>
      <ul>
        {todos.map((todo) => (
         <li key={todo.key}>
          <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>{todo.task}</span>
          <button onClick={() => deletetask(todo.key)}>Delete</button>
          <button onClick={() => upperCaseOne(todo.key)}>uppercase the task</button>
          </li>
         
        ))}
       
      
      </ul>


    </>
  );
}