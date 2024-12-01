import TodoListItem from "./TodoListItem";

function TodoList(props) {
  const {todoList} = props;
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
