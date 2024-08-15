import React, {useState} from 'react';
import {AddTaskForm} from "./AddTaskForm";
import {TasksList} from "./TasksList";
import {FilterValuesType, TasksType} from "../App";
import {TodolistHeader} from "./TodolistHeader";
import {Button} from "./Button";

type TodoListsType = {
    tasks: TasksType[]
    title: string
    removeTask: (id: string) => void
    addTask: (newTitle: string)=>void
}

export const Todolist = ({tasks, title,removeTask,addTask}: TodoListsType) => {
    let tasksForTodoList = tasks
    let [filter, setFilter] = useState<FilterValuesType>('all')
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    if(filter === 'deleteAllTasks') {
        tasksForTodoList = []
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        setFilter(value)
    }

    return (
        <>
            <TodolistHeader title={title}/>
            <AddTaskForm addTask={addTask}/>
            <TasksList tasks={tasksForTodoList} removeTask={removeTask}/>
            <div>
                <Button title='All' onClick={()=> changeFilterHandler('all')}/>
                <Button title='Active' onClick={() => changeFilterHandler('active')} />
                <Button title='Completed' onClick={() => changeFilterHandler('completed')}/>
                <Button title={'DeleteAllTasks'} onClick={() => changeFilterHandler('deleteAllTasks')}/>
            </div>
        </>
    );
};