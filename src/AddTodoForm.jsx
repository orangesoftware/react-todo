const  AddTodoForm=()=>{
    return (
        <form>
            <label htmlFor="todoTitle">Title</label>
            <input 
                type="text" 
                name="todoTitle" 
                id="todTitle"
            />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm;