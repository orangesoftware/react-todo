import PropTypes from "prop-types";
import { FaSortDown,FaSortUp  } from "react-icons/fa6";
import {IoTrash } from "react-icons/io5";
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
      <table className="table">
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
        <tbody>
          {todoList.map((element) => (
            <tr key={element.id}>
              <td>{element.title}</td>
              <td>{element.createdTime}</td>
              <td>
                <a 
                  href="#" 
                  title="Remove item"
                  className={style.removeItem}
                  onClick={() => onRemoveTodo(element.id)}>
                  <IoTrash />
                </a>                
              </td>
            </tr>
          ))}
        </tbody>  
      </table>   
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
