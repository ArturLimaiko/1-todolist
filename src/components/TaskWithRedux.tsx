import React, {memo} from 'react';
import {useSelector} from "react-redux";
import {getListItemSx} from "../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {AppRootStateType} from "../state/state";
import {TaskType} from "./AppWithRedux";
import {EditableSpan} from "./EditableSpan";

export type TaskWithReduxType = {
    taskId: string
    todolistId: string
    updateTaskTitleHandler: (id: string, updateTitle: string) => void
    removeTaskHandler: (todolistId: string, id: string) => void
    changeTaskStatusHandler: (todolistId: string, id: string, e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TaskWithRedux = memo(({
                                       taskId,
                                       todolistId,
                                       updateTaskTitleHandler,
                                       removeTaskHandler,
                                       changeTaskStatusHandler
                                   }: TaskWithReduxType) => {

    // Тут ищем в Redux состоянии задачу с конкретным taskId внутри списка дел с todolistId
    const task = useSelector<AppRootStateType, TaskType>(state =>
        state.tasks[todolistId].find(el => el.id === taskId) as TaskType);
    //as TaskType — это TypeScript оператор приведения типов. Он используется здесь для явного указания, что результат вызова метода .find() будет иметь тип TaskType.
    //Это делается для того, чтобы TypeScript знал, что возвращаемый результат всегда является задачей типа TaskType.
    // Без этого приведения TypeScript мог бы предположить, что результат может быть TaskType | undefined, так как .find() может вернуть undefined, если элемент не найден.

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox color="default" size='small' checked={task.isDone}
                          onChange={(e) => changeTaskStatusHandler(todolistId, task.id, e)}/>
                <EditableSpan oldTitle={task.title}
                              onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
            </div>
            <IconButton aria-label="delete" size="small" onClick={() => removeTaskHandler(todolistId, task.id)}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
});