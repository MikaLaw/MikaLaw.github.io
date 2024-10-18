import { FC, useContext } from 'react';
import { filters } from '../../consts';
import { ActionType, FilterValueType, ContextStateType} from '../../types';
import {ContextApp} from "../../App";
import './TodoFooter.css';

const TodoFooter:FC = () => {
    const { state, changeState } = useContext(ContextApp) as ContextStateType;

    const onFilterChange = (value: FilterValueType): void => {
        changeState({type: ActionType.FILTER_CHANGE, payload: value})
    }

    const onClear = (): void => {
        const updateTodos = state.todos.filter(todo => !todo.done)
        changeState({type: ActionType.REMOVE, payload: updateTodos})
    }

    const {activeCount, completedCount, filterSelected} = state;    
    
    return (
        <div className="todos__footer">
            <div className='todos__count'>{activeCount} items left</div>
            <div className='todos__filters'>
                {Object.values(filters).map((value) => {
                    return (
                        <button
                            key={value}
                            className={`todos__filter${value === filterSelected ? ' todos__filter_active' : ''}`}
                            onClick={() => onFilterChange(value)}
                        >
                            {value}
                        </button>
                    )
                })}
            </div>
            {
                completedCount > 0 && (
                    <div className='todos__clear-btn'>
                        <button 
                            className='todos__clear'
                            onClick={onClear}
                        >
                            Clear complete
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default TodoFooter