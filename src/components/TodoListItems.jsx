import React from 'react'
import {IoTrash } from "react-icons/io5";
import PropTypes from 'prop-types';
import style from './TodoListItems.module.css';

const TodoListItems = ({todo,onRemoveTodo}) => {
  return (            
      <tbody>
        {todo.map((element) => (
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
  )
}
TodoListItems.propTypes = {
  todo: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired
}

export default TodoListItems
