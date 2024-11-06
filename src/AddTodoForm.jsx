const  AddTodoForm=(props)=>{

    const handleAddTodo=(event)=>{
        event.preventDefault();
        const title=event.target.title.value;
        props.onAddTodo(title);
        event.target.reset();
        console.log(title);
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
                placeholder="Enter todo title"
            /> 
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;