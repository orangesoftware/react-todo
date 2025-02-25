import React from 'react'
import PropTypes from 'prop-types'
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState, useEffect} from 'react';
import {get,deleteReq,patch} from '../utils/api';

const TodoContainer = ({tableName}) => {
  const [todoList,setTodoList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [sortOrder,setSortOrder] = useState({key:"",direction:"none"});
    const DELETE_SERVICE =`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/`;
    const URL_SERVICE = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;
    
    
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
            status: todo.fields?.status,
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
    },[tableName])
  
     const addTodo=(newTodo)=>{    
      setTodoList(prevTodoList =>[...prevTodoList,newTodo]);    
      fetchData();
    }
    
    const onCheckedTask = async (event,element) => {
      const status = element.status === "done" ? "pending" : "done";
      const data = {
        records: [
          {
            id: element.id,
            fields: {
              status: status
            }
          }
        ]
      };
      // update the todo in the database
      const response = await patch(`${DELETE_SERVICE}`,data);
      if (response.ok){
        const target = event.target;
        debugger; 
        if (target.nodeName === "TD"){
          target.parentElement.classList.toggle("marked");
        }
        else if (target.nodeName === "TR"){
          target.classList.toggle("marked");
        }
      }
      else{
        alert(`Error ${response.status}`);
      }
      
    };
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
    <>
      <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? (<p>Loading...</p>) : (
          <TodoList 
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}                
            todoList={todoList} 
            onRemoveTodo={removeTodo}
            onCheckedTask={onCheckedTask}/>
          )}
    </>
  )
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,  
}


export default TodoContainer
