import { FC, useContext } from 'react';
import {ContextApp} from "../../App";
import './Todos.css';
import { Todo } from '../index';
import { ContextStateType } from  '../../types';
import { filters } from '../../consts';

const Todos:FC = () => {
    const { state } = useContext(ContextApp) as ContextStateType;    
    const { todos, filterSelected } = state;
    const filteredTodos = filterSelected === filters.ACTIVE ? todos.filter(todo => !todo.done) : filterSelected === filters.COMPLETED ? todos.filter(todo => todo.done) : todos;

    return (
        <ul className="todos__list">
            {filteredTodos.map(todo => (
                <li key={todo.id} className={`todos__item${todo.done ? ' todos__item_done' : ''}`}>
                    <Todo {...todo}/>
                </li>
            ))}
        </ul>
    )
}

export default Todos