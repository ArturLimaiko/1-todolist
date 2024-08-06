import React from 'react';
import {TasksType} from "../App";

export const Task = ({id, isDone, title}: TasksType) => {
    return (
        <li key={id}>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    )
}