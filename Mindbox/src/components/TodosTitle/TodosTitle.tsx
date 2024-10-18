import { FC, memo } from "react";
import './TodosTitle.css';

const TodosTitle:FC = () => {
    return <h1 className="todos__title">todos</h1>
}

export default memo(TodosTitle)