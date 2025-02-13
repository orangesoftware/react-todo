import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';

function InputWithLabel({children,todoTitle,handledTitleChange}) {

    let inputRef = useRef();

    useEffect(()=>{
        inputRef.current.focus();
    });

    return (
        <>
        <label htmlFor="title">{children}</label>
            <input 
                type="text" 
                name="title" 
                id="title"
                autoComplete="off"
                value = {todoTitle}
                placeholder="Enter todo title"
                ref={inputRef}
                onChange={handledTitleChange}
            /> 
        </>    
    );
}


InputWithLabel.propTypes = {
    children: PropTypes.object.isRequired,
    todoTitle: PropTypes.string.isRequired,
    handledTitleChange: PropTypes.func.isRequired
}
export default InputWithLabel;