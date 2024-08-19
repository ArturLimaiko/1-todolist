import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import s from "./todolist.module.css";

type AddTaskFormType = {
    addTask: (taskTitle: string) => void;
}

export const AddTaskForm = ({addTask}: AddTaskFormType) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error,setError] = useState<null | string >(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null);
    }

    const addTaskHandler = () => {
        // если пустая строка то не выполнится , если не пустая то выполнится
        if (taskTitle.trim()) {
            addTask(taskTitle.trim())
        } else {
            setError('Title is required!');
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
            <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} className={error ? s.error: ''}/>
            <Button title='+' onClick={addTaskHandler}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};