import style from './TodoListItem.module.css';
import {IoTrash } from "react-icons/io5";

function TodoListItem(props){
    const {todo,onRemoveTodo} = props;
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
            {/*
            <button type='button' className={style.btn}
                onClick={() => onRemoveTodo(todo.id)}>
                <IoTrash /> Remove
            </button>
            */}
        </li>
    )
}

export default TodoListItem;