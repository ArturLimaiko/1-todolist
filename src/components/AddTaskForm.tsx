import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddTaskFormType = {
    addTask: (taskTitle: string) => void;
}

export const AddTaskForm = ({addTask}: AddTaskFormType) => {
    const [taskTitle, setTaskTitle] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const addTaskHandler = () => {
        // если пустая строка то не выполнится , если не пустая то выполнится
        if (taskTitle.trim()) {
            addTask(taskTitle.trim())
        }
        setTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <Button title='+' onClick={addTaskHandler}/>
        </div>
    );
};