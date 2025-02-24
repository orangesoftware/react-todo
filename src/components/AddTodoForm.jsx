import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';
import { IoAddCircle } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { post } from '../utils/api';

const  AddTodoForm=({onAddTodo})=>{
    const ADD_SERVICE = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const [todoTitle,setTodoTitle]=useState("");
    
    const postData = async () => {
        let title = todoTitle;
        let newRecord = {
            "records": [
                {
                    "fields": {
                        "title": `${title}`
                    }
                }
            ]
        }
       
        try{
            let response = await post(ADD_SERVICE,newRecord);
        if (!response.ok){
            throw new Error(`Error ${response.status}`);     
        }
        let result = await response.json();
        return result;
    }
    catch(error){
      console.error(error);
      return null;
    }
  }

    const handledTitleChange=(event)=>{
        const newTodoTitle=event.target.value;       
        setTodoTitle(newTodoTitle);
    }

    const handleAddTodo= async(event)=>{
        event.preventDefault();
        let newItem = await postData();
        if(newItem === null) return;
        let record = newItem.records[0]; 
        setTodoTitle("");
        onAddTodo({id:record.id,title:record.fields.title,createdTime:record.createdTime});
    }

    return (
        <div className="card">   
            <div className='card-header'>                
                <FaListCheck/> 
                <span className={style.title}>Todo List</span>
                
            </div>
            <form id="addFormTask" 
                onSubmit={handleAddTodo}
            >
                <InputWithLabel 
                    todoTitle={todoTitle}                 
                    handledTitleChange={handledTitleChange}
                >
                    <span className={style.addTitle}>Title </span>
                </InputWithLabel>
                <button  className={style.buttonAdd} type="submit"><IoAddCircle /> Add</button>
            </form>
        </div>
    )
}
AddTodoForm.propTypes={
    onAddTodo:PropTypes.func.isRequired
}

export default AddTodoForm;