import React, {useRef, useState} from 'react';
import {Button} from "./Button";

type AddTaskFormType = {
    addTask: (newTitle: string) => void;
}

export const AddTaskForm = ({addTask}: AddTaskFormType) => {
    const inputRef = useRef<HTMLInputElement>(null);
    //
    // const handleAddTask = () => {
    //     if (inputRef.current) {
    //         const newTitle = inputRef.current.value.trim();
    //         if (newTitle) {
    //             addTask(newTitle);
    //             inputRef.current.value = ''; // Clear input
    //         }
    //     }
    // };

    return (
        <div>
            <input ref={inputRef} onKeyDown={(e) => {
                if(e.key === 'Enter' && inputRef.current){
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