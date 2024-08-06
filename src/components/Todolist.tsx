import React from 'react';
import {AddTaskForm} from "./AddTaskForm";
import {TasksList} from "./TasksList";
import {TasksType} from "../App";
import {TodolistHeader} from "./TodolistHeader";

type TodolistsType = {
    tasks: TasksType[]
    title: string
}

export const Todolist = ({tasks, title}: TodolistsType) => {
    return (
        <>
            <TodolistHeader title={title}/>
            <AddTaskForm/>
            <TasksList tasks={tasks}/>
        </>
    );
};