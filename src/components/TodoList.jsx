import PropTypes from "prop-types";
import { FaSortDown,FaSortUp  } from "react-icons/fa6";
import TodoListItems from "./TodoListItems";
import style from './TodoList.module.css';

function TodoList({sortOrder,setSortOrder,todoList,onRemoveTodo}) {  
  
  const sortOderHandler = (key) => {
    let direction = "asc";
    if(sortOrder.key === key && sortOrder.direction === "asc"){
      direction = "desc";
    }
    setSortOrder({key,direction});
  }

  const getCurrentSortDirecction = (key) => {
    if(sortOrder.key === key){
      return sortOrder.direction;
    }
    return "asc";
  }

  return (
    <>  
      { todoList.length > 0 ?(
      <table className={style.table}>
        <thead>
          <tr> 
            <th onClick={()=>{
              sortOderHandler("title");              
            }}>Title {
              getCurrentSortDirecction("title")==="asc"?(<FaSortUp />):(<FaSortDown />)}</th>
            <th onClick={()=>{
              sortOderHandler("createdTime");              
            }}>Created Time { getCurrentSortDirecction("createdTime")==="asc"?(<FaSortUp />):(<FaSortDown />)}</th>
            <th>Action</th>
          </tr>
        </thead>
        {TodoListItems({todo:todoList,onRemoveTodo})}        
      </table>   
      ):(<h3 className={style.noItems}>Todo List is empty.</h3>)}
    </>
  )
}
TodoList.propTypes = {
  sortOrder: PropTypes.object.isRequired,
  setSortOrder: PropTypes.func.isRequired,  
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired
}

export default TodoList;
