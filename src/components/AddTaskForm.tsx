import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddTaskFormType = {
    addTask: (taskTitle: string) => void;
}

export const AddTaskForm = ({addTask}: AddTaskFormType) => {
    const [taskTitle, setTaskTitle] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const onClickHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <Button title='+' onClick={onClickHandler}/>
        </div>
    );
};