import { FC, useContext } from 'react';
import { ActionType, TodoInterface, TodoIdType, ContextStateType } from '../../types';
import {ContextApp} from "../../App";
import './Todo.css';

const Todo:FC<TodoInterface> = ({id, text, done}) => {
    const { state, changeState } = useContext(ContextApp) as ContextStateType;

    const onToggleDone = (): void => {
        const updateTodos = state.todos.map(todo => todo.id === id ? ({...todo, done: !done}) : todo);
        changeState({type: ActionType.TOGGLE, payload: updateTodos})
    }

    const onRemove = ({ id }: TodoIdType) => {
        const updateTodos = state.todos.filter(todo => todo.id !== id);
        changeState({type: ActionType.REMOVE, payload: updateTodos})
    }


    return (
        <>
            <input
                id={id} 
                type="checkbox"
                checked={done}
                onChange={onToggleDone} 
                className="todos__check"
            />
            <label htmlFor={id} className="todos__text">{text}</label>
            <button
                className="todos__remove"
                onClick={() => onRemove({ id })}
            />
        </>
    )
}

export default Todo