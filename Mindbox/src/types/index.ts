import { type filters } from '../consts'
import {Dispatch} from "react";

export interface TodoInterface {
    id: string
    text: string
    done: boolean
}

export type TodoIdType = Pick<TodoInterface, 'id'>
export type TodoTextType = Pick<TodoInterface, 'text'>
export type TodoDoneType = Pick<TodoInterface, 'done'>
export type TodosType = TodoInterface[]
export type FilterValueType = typeof filters[keyof typeof filters]

export interface StateInterface {
    activeCount: number
    completedCount: number
    filterSelected: FilterValueType
    todos: TodosType
}

export enum ActionType {
    REQUEST = 'REQUEST',
    ADD = 'ADD',
    TOGGLE = 'TOGGLE',
    FILTER_CHANGE = 'FILTER_CHANGE',
    REMOVE = 'REMOVE',
    CLEAR = 'CLEAR'
    
}

type ActionObjectPayload = {
    type: ActionType.ADD,
    payload: TodoInterface
}

type ActionArrayPayload = {
    type: ActionType.REMOVE | ActionType.CLEAR | ActionType.TOGGLE | ActionType.REQUEST,
    payload: TodosType
}

type ActionFilterPayload = {
    type: ActionType.FILTER_CHANGE,
    payload: FilterValueType
}

export type Action =  ActionObjectPayload | ActionArrayPayload | ActionFilterPayload;

export type ContextStateType = {
    state: StateInterface;
    changeState: Dispatch<Action>
}

export type ChangeStateType = {
    state: StateInterface;
    changeState: Dispatch<Action>
}