import React from 'react';
import {DataType} from "../App";

export type TasksType = {
    data: DataType
}

export const Tasks = ({data}: TasksType) => {
    return (
        <ul>
            <h3>{data.title}</h3>
            <div> Tasks for Students : {data.tasks.map(t =>
                <li key={t.taskId}>
                    <h4>--{t.title}--</h4>
                    <span> TaskId: {t.taskId} </span>
                    <input type="checkbox" checked={t.isDone}/>
                </li>
            )}
            </div>
            <h3> Students List : </h3>
            <li>{data.students.map(s => <li>{s}</li>)}</li>
        </ul>
    );
};