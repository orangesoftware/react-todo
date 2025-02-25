import React from 'react'
import {IoTrash,IoPencil } from "react-icons/io5";
import PropTypes from 'prop-types';
import style from './TodoListItems.module.css';

const TodoListItems = ({todo,onRemoveTodo,onCheckedTask}) => {

  return (            
      <tbody>
        {todo.map((element) => (
          
          <tr className={element?.status === "done" ? "marked" : ""}
            onClick={(event) => onCheckedTask(event,element)}
            key={element.id}>
            <td>{element.title}</td>
            <td>{element.createdTime}</td>
            <td>
              <a 
                href="#" 
                title="Remove item"
                className={style.removeItem}
                onClick={(event) =>{ 
                  event.stopPropagation();
                  onRemoveTodo(element.id)
                  }}>
                <IoTrash />
              </a>               
            </td>
          </tr>
        ))}
      </tbody>
  )
}
TodoListItems.propTypes = {
  todo: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onCheckedTask: PropTypes.func.isRequired
}

export default TodoListItems
