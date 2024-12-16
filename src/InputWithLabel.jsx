import { useEffect, useRef } from "react";

function InputWithLabel(props){

    let inputRef = useRef();

    useEffect(()=>{
        inputRef.current.focus();
    });

    return (
        <>
        <label htmlFor="title">{props.children}</label>
            <input 
                type="text" 
                name="title" 
                id="title"
                value = {props.todoTitle}
                placeholder="Enter todo title"
                ref={inputRef}
                onChange={props.handledTitleChange}
            /> 
        </>    
    );
}

export default InputWithLabel;