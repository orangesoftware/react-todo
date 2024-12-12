import './App.css';
import TodoList from './TodoList';
import AddTodoForm from "./AddTodoForm";
import { useState, useEffect, Fragment } from 'react';


const useSemiPersistentState = (()=>{
  const [todoList,setTodoList] = useState(
    JSON.parse(localStorage.getItem("saveTodoList")) || []
  );

  useEffect(()=>{
    localStorage.setItem("saveTodoList",JSON.stringify(todoList));
    
  },[todoList]);

  return [todoList,setTodoList];
});

function App() {

  const [todoList,setTodoList] = useSemiPersistentState();

 

  const addTodo=(newTodo)=>{
    setTodoList([...todoList,newTodo]);
  }

  return (
    <Fragment>
     <h1>Todo List</h1>
     <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList}/>
    </Fragment>
  )
}

export default App
