import React, {memo, useCallback} from "react";
import {AddItemForm} from "../../../../components/AddItemForm";
import {TodoListType} from "../../../../components/AppWithRedux";
import {useDispatch} from "react-redux";
import {addTaskAC} from "../../../../state/tasks-reducer";
import {FilterTasksButtons} from "./Todolist/FilterTasksButtons/FilterTasksButtons";
import {TasksWithRedux} from "./Todolist/Tasks/TasksWithRedux";
import {TodolistTitle} from "./Todolist/TodolistTitlte/TodolistTitle";

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
