import React from 'react';
import {AddTaskForm} from "./AddTaskForm";
import {TasksList} from "./TasksList";
import {TasksType} from "../App";
import {TodolistHeader} from "./TodolistHeader";

type TodoListsType = {
    tasks: TasksType[]
    title: string
    removeTask:(taskId:number) => void
}

export const Todolist = ({tasks, title,removeTask}: TodoListsType) => {
    return (
        <>
            <TodolistHeader title={title}/>
            <AddTaskForm/>
            <TasksList tasks={tasks} removeTask={removeTask}/>
        </>
    );
};