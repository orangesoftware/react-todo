import { useState } from 'react';

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
            <label htmlFor="title">Title </label>
            <input 
                type="text" 
                name="title" 
                id="title"
                value = {todoTitle}
                placeholder="Enter todo title"
                onChange={handledTitleChange}
            /> 
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;