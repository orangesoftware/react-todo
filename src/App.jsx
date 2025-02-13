import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import {get,deleteReq} from './utils/api';

function App() {
  const [todoList,setTodoList] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [sortOrder,setSortOrder] = useState({key:"",direction:"none"});
  const DELETE_SERVICE =`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/`;
  const URL_SERVICE = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;
  
  const fetchData = async () => {
    setIsLoading(true);    
    try{
      let response = await get(URL_SERVICE);
      if (!response.ok){
        throw new Error(`Error ${response.status}`);     
      }
      let data = await response.json();

      let todos = data.records.map((todo)=>{
        return {
          id: todo.id,
          title: todo.fields.title,
          createdTime:todo.createdTime,
        }
      });

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

   const addTodo=(newTodo)=>{    
    setTodoList(prevTodoList =>[...prevTodoList,newTodo]);    
    fetchData();
  }

  const removeTodo = async (id) => {         
      try{
        let response = await deleteReq(`${DELETE_SERVICE}${id}`);
        // if response is ok, remove the todo from the list state
        if (response.ok){
          const newTodoList = todoList.filter((todo) => todo.id !== id);
          setTodoList(newTodoList);
        }
      }
      catch(error){
        console.error(error);
      }
  };

  /*
    if  a < b return -1
    if a > b return 1
    if  a = b return 0
  */
  const sortItems = (items, key, direction)=>{
    return [...items].sort((a,b)=>{      
      return direction ==="asc"
        ?a[key].localeCompare(b[key])
        :b[key].localeCompare(a[key])
    });
  }

  useEffect(()=>{
    if (sortOrder.key){
      const sortedList = sortItems(todoList,sortOrder.key,sortOrder.direction);
      setTodoList(sortedList);
    }
  },[sortOrder])
  
 

  return (
    <Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (<p>Loading...</p>) : (
              <TodoList 
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}                
                todoList={todoList} 
                onRemoveTodo={removeTodo}/>
                )}
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
