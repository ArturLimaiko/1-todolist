import React, {memo, useCallback} from "react";
import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {TodoListType} from "../../../../../app/AppWithRedux";
import {addTaskAC} from "../../../../../state/tasks-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {TasksWithRedux} from "./Tasks/TasksWithRedux";
import {TodolistTitle} from "./TodolistTitlte/TodolistTitle";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

type Props = { todolist: TodoListType }

export const TodolistWithRedux = memo(({todolist}: Props) => {
    const dispatch = useAppDispatch()

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
