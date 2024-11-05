var todoList = [
    {id:1,title:"Complete assignment"}
   ,{id:2,title:"Complete assignment2"}
   ,{id:3,title:"Complete assignment3"}];

function TodoList() {
  return (
      <ul>
        {
          todoList.map((item)=>{
            return <li id={item.id}>{item.title}</li>
          })
        }
      </ul>
  )
}

export default TodoList;