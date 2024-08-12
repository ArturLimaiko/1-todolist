import React from 'react';
import {AddTaskForm} from "./AddTaskForm";
import {TasksList} from "./TasksList";
import {TasksType} from "../App";
import {TodolistHeader} from "./TodolistHeader";
import {Button} from "./Button";

type TodoListsType = {
    tasks: TasksType[]
    title: string
    removeTask: (id: number) => void
}

export const Todolist = ({tasks, title,removeTask,}: TodoListsType) => {
    return (
        <>
            <TodolistHeader title={title}/>
            <AddTaskForm/>
            <TasksList tasks={tasks} removeTask={removeTask}/>
            <div>
                <Button title='All' onClick={() => {}}/>
                <Button title='Active' onClick={() => {}}/>
                <Button title='Completed' onClick={() => {}}/>
            </div>
        </>
    );
};