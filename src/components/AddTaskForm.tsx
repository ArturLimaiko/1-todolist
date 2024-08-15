import React, {useRef} from 'react';
import {Button} from "./Button";

type AddTaskFormType = {
    addTask: (newTitle: string) => void;
}

export const AddTaskForm = ({addTask}: AddTaskFormType) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input ref={inputRef} onKeyDown={(e) => {
                if (e.key === 'Enter' && inputRef.current) {
                    addTask(inputRef.current.value);
                    inputRef.current.value = '';
                }
            }}/>
            <Button title='+' onClick={() => {
                if (inputRef.current) {
                    addTask(inputRef.current.value)
                    inputRef.current.value = '';
                }
            }}/>
        </div>
    );
};