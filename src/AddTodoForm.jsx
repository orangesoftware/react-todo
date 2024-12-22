import { useState } from 'react';
import InputWithLabel from './InputWithLabel';

const  AddTodoForm=(props)=>{
    const {onAddTodo}=props;

    const [todoTitle,setTodoTitle]=useState("");

    const handledTitleChange=(event)=>{
        const newTodoTitle=event.target.value;
        setTodoTitle(newTodoTitle);

    }

    const handleAddTodo=(event)=>{
        event.preventDefault();
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