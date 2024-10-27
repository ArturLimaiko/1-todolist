import React, {ChangeEvent, memo, useCallback, useMemo} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType, TodoListType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {changeTodolistTitleAC, removeTodolistAC} from "../state/todolist-reducer";
import List from "@mui/material/List";
import {TaskWithRedux} from "./TaskWithRedux";
import {AppRootStateType} from "../state/state";
import {FilterTasksButtons} from "./FilterTasksButtons";

type Props = {
    todolist: TodoListType
}

export const TodolistWithRedux = memo(({todolist}: Props) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])
    const dispatch = useDispatch()

    //addTask
    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }, [dispatch])

    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, updateTitle))
    }, [])

    return (

        <div>
            <h3><EditableSpan oldTitle={todolist.title} onClick={updateTodolistTitleHandler}/>
                <IconButton aria-label="delete" size="small" onClick={() => dispatch(removeTodolistAC(todolist.id))}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>

            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
})
