import React from 'react';
import {TasksType} from "../App";


export const Task = ({id, isDone, title, changeStatus}: TasksType) => {

    const changeStatusHandler = (taskID: string, value: boolean) => {
        //     тут выдавало ворнинг типа нельзя вызвать объект который возможно не определен
        //     Cannot invoke an object which is possibly undefined
        if (changeStatus) {
            changeStatus(taskID, value)
        }
    }

    return (
        <li key={id}>
            <input type="checkbox" checked={isDone}
                   onChange={(e) => changeStatusHandler(id,e.currentTarget.checked)}/>
            <span>{title}</span>
        </li>
    )
}