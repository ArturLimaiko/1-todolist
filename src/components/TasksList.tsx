import React from 'react';
import {TasksType} from "../App";
import {Task} from "./Task";
import {Button} from "./Button";

type TasksListType = {
    tasks: TasksType[]
    removeTask:(taskId:number) => void
}

export const TasksList = ({tasks,removeTask}: TasksListType) => {
    const tasksList =
        <ul>
            {tasks.map(t => {
                return (
                    <li key={t.id} style={{display: 'flex', gap: '10px'}}>
                            <Task id={t.id} title={t.title} isDone={t.isDone}/>
                            <button onClick={() => removeTask(t.id)}> X </button>
                    </li>
                )
            })}
        </ul>
    return (
        tasks.length === 0
            ? (<p><b>No tasks found.</b></p>)
            : (
                <>
                    {tasksList}
                    <div>
                        <Button title='All' callBack={()=>{}}/>
                        <Button title='Active' callBack={()=>{}}/>
                        <Button title='Completed' callBack={()=>{}}/>
                    </div>
                </>
            )
    );
};