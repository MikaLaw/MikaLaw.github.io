import { FC, useContext, FormEvent, useState} from 'react';
import { ActionType, TodoInterface, ContextStateType } from '../../types';
import {ContextApp} from "../../App";
import { nanoid } from 'nanoid';
import './TodoAd.css';

const TodoAd:FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const {changeState} = useContext(ContextApp) as ContextStateType;
    const addTask = (e: FormEvent<HTMLFormElement>, text: string) => {
        e.preventDefault();
        if (inputValue.length > 0) {  
            setIsValid(true);          
            const newTodo: TodoInterface = {text: text, id: nanoid(), done: false}
            changeState({type: ActionType.ADD, payload: newTodo})
            setInputValue('')            
        } else {
            setIsValid(false);
        }
    }

    return (
        <form className='todos__form' onSubmit={(e)=>addTask(e, inputValue)} data-testid='submit-elem'>
            <input 
                type="text" 
                data-testid='value-elem'
                className='todos__input' 
                placeholder='What needs to be done?'
                value={inputValue}
                onChange={(e)=>{
                    setIsValid(true);         
                    setInputValue(e.target.value)
                }} 
            />
            <span className="todos__error">{isValid ? '' : 'The field cannot be empty'}</span>
        </form>
    )
}

export default TodoAd