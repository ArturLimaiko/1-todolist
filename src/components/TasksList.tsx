import React from 'react';
import {TasksType} from "../App";
import {Task} from "./Task";

type TasksListType = {
    tasks: TasksType[]
    removeTask: (taskId: number) => void
}

export const TasksList = ({tasks, removeTask}: TasksListType) => {
    const tasksList =
        <ul>
            {tasks.map(t => {
                return (
                    <li key={t.id} style={{display: 'flex', gap: '10px'}}>
                        <Task id={t.id} title={t.title} isDone={t.isDone}/>
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