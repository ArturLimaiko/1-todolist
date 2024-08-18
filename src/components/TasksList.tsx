import React from 'react';
import {TasksType} from "../App";
import {Task} from "./Task";

type TasksListType = {
    tasks: TasksType[]
    removeTask: (taskId: string) => void
    changeStatus:(taskID: string,isDone:boolean) => void
}

export const TasksList = ({tasks, removeTask,changeStatus}: TasksListType) => {
    const tasksList =
        <ul>
            {tasks.map(t => {
                return (
                    <li key={t.id} style={{display: 'flex', gap: '10px'}}>
                        <Task id={t.id} title={t.title} isDone={t.isDone} changeStatus={changeStatus}/>
                        <button onClick={() => removeTask(t.id)}> x </button>
                    </li>
                )
            })}
        </ul>
    return (
        tasks.length === 0
            ? (<p><b>No tasks found.</b></p>)
            : (
                <div>
                    {tasksList}
                </div>
            )
    );
};