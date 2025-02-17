import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';


function App() {
  const [todoList,setTodoList] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  
  const fetchData = async () => {
    setIsLoading(true);
    let options ={
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    }
    let url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    try{
      let response = await fetch(url,options);
      if (!response.ok){
        throw new Error(`Error ${response.status}`);     
      }
      let data = await response.json();
      let todos = data.records.map((todo)=>{
        return {
          id: todo.id,
          title: todo.fields.title
        }
      });

      //let result = data.records;
      setTodoList(todos);
    }
    catch(error){
      console.error(error);
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
  },[])

  useEffect(()=>{
    // TO.envDO: check if this is correct
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
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (<p>Loading...</p>) : (<TodoList todoList={todoList} onRemoveTodo={removeTodo}/>)}
          </>          
        } />
        <Route path="/new" element={
          <>
            <h1>New Todo List</h1>            
          </>          
        }
        />
      </Routes>
    </BrowserRouter>


     
    </Fragment>
  )
}

export default App
