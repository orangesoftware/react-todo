import './App.css';
import TodoList from './TodoList';
import AddTodoForm from "./AddTodoForm";
import { useState, useEffect, Fragment } from 'react';

function App() {
  const [todoList,setTodoList] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  
  useEffect(()=>{
     new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve({
            data:{
              todoList:JSON.parse(localStorage.getItem("saveTodoList")) || []
            }
          });
      },2000);
    }).then((result)=>{
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });

  },[])

  useEffect(()=>{
    // TODO: check if this is correct
    if (!isLoading){    
      localStorage.setItem("saveTodoList",JSON.stringify(todoList));
    }
    
  },[todoList,isLoading]);


  const addTodo=(newTodo)=>{
    setTodoList([...todoList,newTodo]);
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
   setTodoList(newTodoList);
  };

  return (
    <Fragment>
     <h1>Todo List</h1>
     <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (<p>Loading...</p>) : (<TodoList todoList={todoList} onRemoveTodo={removeTodo}/>)}
    </Fragment>
  )
}

export default App
