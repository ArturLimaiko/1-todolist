import React, {memo, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {TaskType, TodoListType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC} from "../state/tasks-reducer";
import {AppRootStateType} from "../state/state";
import {FilterTasksButtons} from "./FilterTasksButtons";
import {TasksWithRedux} from "./TasksWithRedux";
import {TodolistTitle} from "./TodolistTitle";

type Props = { todolist: TodoListType }

export const TodolistWithRedux = memo(({todolist}: Props) => {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])
    const dispatch = useDispatch()

    //addTask
    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }, [dispatch])

    return (

        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskHandler}/>
            <TasksWithRedux todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
})
