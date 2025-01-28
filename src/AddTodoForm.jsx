import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';
import { IoAddCircle } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";

const  AddTodoForm=(props)=>{
    const {onAddTodo}=props;
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

        
        let options ={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
            },
            body: JSON.stringify(newRecord)
        }

        let url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
        try{
            debugger;
            let response = await fetch(url,options);
        if (!response.ok){
            throw new Error(`Error ${response.status}`);     
        }
        let result = await response.json();

      //setTodoList(todo);        
    }
    catch(error){
      console.error(error);
    }
  }



    const handledTitleChange=(event)=>{
        const newTodoTitle=event.target.value;       
        setTodoTitle(newTodoTitle);

    }

    const handleAddTodo=(event)=>{
        event.preventDefault();
        postData();
        onAddTodo({id:Date.now(),title:todoTitle});
        setTodoTitle("");
    }

    return (
        <div className="card">   
            <div className='card-header'>                
                <FaListCheck/> 
                <span className={style.title}>Add Todo</span>
                
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

export default AddTodoForm;