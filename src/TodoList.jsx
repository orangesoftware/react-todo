import TodoListItem from "./TodoListItem";

const todoList = [
  { id: 1, title: "Complete assignment" }
  , { id: 2, title: "Complete assignment2" }
  , { id: 3, title: "Complete assignment3" }];

function TodoList() {
  return (
    <ul>
      {
        todoList.map((todo) => {
          return <TodoListItem key={todo.id} todo={todo}/>
        })
      }
    </ul>
  )
}

export default TodoList;
