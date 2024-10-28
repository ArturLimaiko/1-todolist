import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getListItemSx} from "../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {AppRootStateType} from "../state/state";
import {TasksStateType, TodoListType} from "./AppWithRedux";
import {EditableSpan} from "./EditableSpan";
import List from "@mui/material/List";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

type Props = {
    todolist: TodoListType
    // task: TaskType
}

export const TasksWithRedux = memo(({todolist}: Props) => {

    const dispatch = useDispatch()
    // Тут ищем в Redux состоянии задачу с конкретным taskId внутри списка дел с todolistId
    // const task = useSelector<AppRootStateType, TaskType>(state =>
    //     state.tasks[todolist.id].find(el => el.id === todolist.id) as TaskType);
    //as TaskType — это TypeScript оператор приведения типов. Он используется здесь для явного указания, что результат вызова метода .find() будет иметь тип TaskType.
    //Это делается для того, чтобы TypeScript знал, что возвращаемый результат всегда является задачей типа TaskType.
    // Без этого приведения TypeScript мог бы предположить, что результат может быть TaskType | undefined, так как .find() может вернуть undefined, если элемент не найден.

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    //
    // const updateTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
    //     dispatch(changeTaskTitleAC(todolist.id, taskId, newTitle))
    // }, [dispatch])
    //
    // const removeTaskHandler = useCallback((taskId: string, todolistId: string) => {
    //     dispatch(removeTaskAC(todolistId, taskId))
    // }, [dispatch])
    //
    // const changeTaskStatusHandler = useCallback((todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    //     const newStatusValue = e.currentTarget.checked
    //     dispatch(changeTaskStatusAC(todolistId, taskId, newStatusValue))
    // }, [dispatch])

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    let filteredTasks = useMemo(() => {
        console.log('UseMemo')
        //фильтрация тасок
        if (todolist.filter === 'active') {
            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
        }
        return tasks
    }, [tasks, todolist.filter])


    return (
        <>
            {tasksForTodolist.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasksForTodolist.map((task) => {
                        const updateTaskTitleHandler = (newTitle: string) => {
                            dispatch(changeTaskTitleAC(todolist.id, task.id, newTitle))
                        };

                        const removeTaskHandler = () => {
                            dispatch(removeTaskAC(todolist.id, task.id));
                        };

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked;
                            dispatch(changeTaskStatusAC(todolist.id, task.id, newStatusValue));
                        };

                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox
                                        color="default"
                                        size="small"
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <EditableSpan
                                        oldTitle={task.title}
                                        onClick={updateTaskTitleHandler}
                                    />
                                </div>
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={removeTaskHandler}
                                >
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </>

    )
});