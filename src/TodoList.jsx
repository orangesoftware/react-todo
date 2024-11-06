import TodoListItem from "./TodoListItem";

const todoList = [
  { id: 1, title: "Complete assignment" }
  , { id: 2, title: "Complete assignment2" }
  , { id: 3, title: "Complete assignment3" }];

function TodoList() {
  return (
    <ul>
      {
        todoList.map((item) => {
          return <TodoListItem key={item.id} todo={item}/>
        })
      }
    </ul>
  )
}

export default TodoList;


