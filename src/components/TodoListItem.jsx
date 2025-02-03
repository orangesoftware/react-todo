import style from './TodoListItem.module.css';
import {IoTrash } from "react-icons/io5";
import PropTypes from "prop-types";

function TodoListItem({todo,onRemoveTodo}){    
    return(
        <li className={style.ListItem}>
            <span>{todo.title}</span>
            
            <a 
                href="#" 
                title="Remove item"
                className={style.removeItem}
                onClick={() => onRemoveTodo(todo.id)}>
            <IoTrash />
            </a>            
        </li>
    )
}

TodoListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired
}

export default TodoListItem;