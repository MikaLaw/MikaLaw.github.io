import { FC, useReducer, createContext, Reducer, useEffect } from 'react';
import { StateInterface, ContextStateType, Action, ActionType } from './types';
import { todoReducer, initialState } from './reducer'
import {TodoAd, TodoFooter, Todos}  from './components';
import {todosList} from './mockData';

export const ContextApp = createContext<Partial<ContextStateType>>({});

const App:FC = () => {
  const [state, changeState] = useReducer<Reducer<StateInterface, Action>>(todoReducer, initialState);
  const ContextState: ContextStateType = {
    state,
    changeState
  };

  useEffect(() => {
    changeState({type: ActionType.REQUEST, payload: todosList})
  }, [])
  
  return (
    <ContextApp.Provider value={ContextState}>
      <div className="todos">
        <div className="todos__head">
          <h1 className="todos__title">todos</h1>
        </div>
        <div className='todos__body'>
          <TodoAd />
          <Todos />
          <TodoFooter/>
        </div>
      </div>
    </ContextApp.Provider>
  );
}

export default App;
