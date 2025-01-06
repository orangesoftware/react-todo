import { useState } from 'react';
import InputWithLabel from './InputWithLabel';

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
        <form id="addFormTask" 
            onSubmit={handleAddTodo}
        >
            <InputWithLabel 
                todoTitle={todoTitle}                 
                handledTitleChange={handledTitleChange}
            >
                Title 
            </InputWithLabel>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;