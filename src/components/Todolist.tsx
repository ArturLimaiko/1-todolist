import React from 'react';
import {AddTaskForm} from "./AddTaskForm";
import {TasksList} from "./TasksList";
import {FilterValuesType, TasksType} from "../App";
import {TodolistHeader} from "./TodolistHeader";
import {Button} from "./Button";

type TodoListsType = {
    tasks: TasksType[]
    title: string
    removeTask: (id: number) => void
    changeFilter:(filter: FilterValuesType) => void
}

export const Todolist = ({tasks, title,removeTask,changeFilter}: TodoListsType) => {
    return (
        <>
            <TodolistHeader title={title}/>
            <AddTaskForm/>
            <TasksList tasks={tasks} removeTask={removeTask}/>
            <div>
                <Button title='All' onClick={() => {changeFilter('all')}}/>
                <Button title='Active' onClick={() => {changeFilter('active')}}/>
                <Button title='Completed' onClick={() => {changeFilter('completed')}}/>
            </div>
        </>
    );
};