import React, {memo, useCallback} from "react";
import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {TodoListType} from "../../../../../app/AppWithRedux";
import {useDispatch} from "react-redux";
import {addTaskAC} from "../../../../../state/tasks-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {TasksWithRedux} from "./Tasks/TasksWithRedux";
import {TodolistTitle} from "./TodolistTitlte/TodolistTitle";

type Props = { todolist: TodoListType }

export const TodolistWithRedux = memo(({todolist}: Props) => {
    // let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])
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