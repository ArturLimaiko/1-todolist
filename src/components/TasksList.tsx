import React from 'react';
import {TasksType} from "../App";
import {Task} from "./Task";
import {Button} from "./Button";

type TasksListType = {
    tasks: TasksType[]
}

export const TasksList = ({tasks}: TasksListType) => {
    const tasksList =
        <ul>
            {tasks.map(t => {
                return (
                    <li key={t.id}>
                        <Task id={t.id} title={t.title} isDone={t.isDone}/>
                    </li>
                )
            })}
        </ul>
    return (
        <>
            {tasksList}
            <div>
                <Button title='All'/>
                <Button title='Active'/>
                <Button title='Completed'/>
            </div>
        </>
    );
};