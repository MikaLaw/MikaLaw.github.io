import { StateInterface, Action, ActionType } from '../types'
import { filters } from '../consts';

export const initialState: StateInterface = {
    activeCount: 0,
    completedCount: 0,
    filterSelected: filters.ALL,
    todos: []
}

export const todoReducer = (state: StateInterface, action: Action):StateInterface => {
    switch (action.type) {
        case ActionType.REQUEST: {
          return { ...state, todos: [...action.payload], activeCount: [...action.payload].filter(item => !item.done).length, completedCount: [...action.payload].filter(item => item.done).length }
        }
        case ActionType.ADD: {
          return { ...state, todos: [...state.todos, {...action.payload} ]}
        }
        case ActionType.TOGGLE:
        case ActionType.REMOVE: {
          return { ...state, todos: [...action.payload], activeCount: [...action.payload].filter(item => !item.done).length, completedCount: [...action.payload].filter(item => item.done).length }
        }
        case ActionType.CLEAR: {
          return { ...state, todos: [...action.payload], completedCount: [...action.payload].filter(item => item.done).length}
        }   
        case ActionType.FILTER_CHANGE: {
          return { ...state, filterSelected: action.payload}
        }
        default: 
          return state
    }
};