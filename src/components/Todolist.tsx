import React, {useState} from 'react';
import {AddTaskForm} from "./AddTaskForm";
import {TasksList} from "./TasksList";
import {FilterValuesType, TasksType} from "../App";
import {TodolistHeader} from "./TodolistHeader";
import {Button} from "./Button";
import s from "./todolist.module.css";

type TodoListsType = {
    tasks: TasksType[]
    title: string
    removeTask: (id: string) => void
    addTask: (newTitle: string)=>void
    changeStatus:(taskID: string,isDone:boolean) => void
    removeAllTasks: () => void
}

export const Todolist = ({tasks, title,removeTask,addTask,changeStatus,removeAllTasks}: TodoListsType) => {
    let tasksForTodoList = tasks
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [nameButton , setNameButton] = useState('all')
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        setFilter(value)
        setNameButton(value)
    }

    return (
        <>
            <TodolistHeader title={title}/>
            <AddTaskForm addTask={addTask}/>
            <TasksList tasks={tasksForTodoList} removeTask={removeTask} changeStatus={changeStatus}/>
            <div>
                <Button className = {nameButton === 'all' ? s.activeFilter : ''} title='all' onClick={()=> changeFilterHandler('all')}/>
                <Button className = {nameButton === 'active' ? s.activeFilter : ''} title='active' onClick={() => changeFilterHandler('active')} />
                <Button className = {nameButton === 'completed' ? s.activeFilter : ''} title='completed' onClick={() => changeFilterHandler('completed')}/>
                <Button className = {nameButton === 'deleteAllTasks' ? s.activeFilter : ''} title={'deleteAllTasks'} onClick={() => removeAllTasks()}/>
            </div>
        </>
    );
};