import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getListItemSx} from "../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {AppRootStateType} from "../state/state";
import {TaskType, TodoListType} from "./AppWithRedux";
import {EditableSpan} from "./EditableSpan";
import List from "@mui/material/List";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

type Props = {
    todolist: TodoListType
}

export const TaskWithRedux = memo(({todolist}: Props) => {

    const dispatch = useDispatch()
    // Тут ищем в Redux состоянии задачу с конкретным taskId внутри списка дел с todolistId
    const task = useSelector<AppRootStateType, TaskType>(state =>
        state.tasks[todolist.id].find(el => el.id === todolist.id) as TaskType);
    //as TaskType — это TypeScript оператор приведения типов. Он используется здесь для явного указания, что результат вызова метода .find() будет иметь тип TaskType.
    //Это делается для того, чтобы TypeScript знал, что возвращаемый результат всегда является задачей типа TaskType.
    // Без этого приведения TypeScript мог бы предположить, что результат может быть TaskType | undefined, так как .find() может вернуть undefined, если элемент не найден.

    // let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])

    const updateTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolist.id, taskId, newTitle))
    }, [dispatch])

    const removeTaskHandler = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])

    const changeTaskStatusHandler = useCallback((todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistId, taskId, newStatusValue))
    }, [dispatch])


    let filteredTasks = useMemo(() => {
        console.log('UseMemo')
        //фильтрация тасок
        if (todolist.filter === 'active') {
            tasks = tasks.filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
            tasks = tasks.filter(task => task.isDone)
        }
        return tasks
    }, [tasks, todolist.filter])

    return (
        <>
            {
                filteredTasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {filteredTasks.map((t) => {
                            return (
                                <TaskWithRedux key={t.id}
                                               taskId={t.id}
                                               todolistId={todolist.id}
                                               updateTaskTitleHandler={updateTaskTitleHandler}
                                               removeTaskHandler={removeTaskHandler}
                                               changeTaskStatusHandler={changeTaskStatusHandler}
                                />
                            )
                        })}
                    </List>
            }

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
        </>

    )

});