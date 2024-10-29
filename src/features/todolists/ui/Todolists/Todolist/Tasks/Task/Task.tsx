import React, {ChangeEvent, memo, useCallback} from "react";
import {getListItemSx} from "../../../../../../../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskType, TodoListType} from "../../../../../../../app/AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../../../../state/tasks-reducer";

type Props = { task: TaskType, todolist: TodoListType };

export const Task = memo(({task, todolist}: Props) => {
    const dispatch = useDispatch()

    const updateTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolist.id, task.id, newTitle))
    }, [dispatch])

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(todolist.id, task.id))
    }, [dispatch])

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolist.id, task.id, newStatusValue))
    }, [dispatch])

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox color="default" size="small" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan oldTitle={task.title} onClick={updateTaskTitleHandler}/>
            </div>
            <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    )
})