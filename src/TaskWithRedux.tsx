import React, {ChangeEvent, memo} from 'react';
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC} from "./state/tasks-reducer";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskType} from "./AppWithRedux";

export type TaskWithReduxType = {
    task: TaskType
    todolistId: string
    updateTaskTitleHandler: (id: string, updateTitle: string) => void
}

export const TaskWithRedux = memo(({task, todolistId, updateTaskTitleHandler}: TaskWithReduxType) => {

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistId, task.id, newStatusValue))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox color="default" size='small' checked={task.isDone}
                          onChange={() => changeTaskStatusHandler}/>
                <EditableSpan oldTitle={task.title}
                              onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
            </div>
            <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
});