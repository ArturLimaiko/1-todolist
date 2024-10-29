import React, {memo, useMemo} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../../state/state";
import {TasksStateType, TodoListType} from "../../../../../../components/AppWithRedux";
import List from "@mui/material/List";
import {Task} from "./Task/Task";

type Props = { todolist: TodoListType }

export const TasksWithRedux = memo(({todolist}: Props) => {

    // Тут ищем в Redux состоянии задачу с конкретным taskId внутри списка дел с todolistId
    // const task = useSelector<AppRootStateType, TaskType>(state =>
    //     state.tasks[todolist.id].find(el => el.id === todolist.id) as TaskType);
    //as TaskType — это TypeScript оператор приведения типов. Он используется здесь для явного указания, что результат вызова метода .find() будет иметь тип TaskType.
    //Это делается для того, чтобы TypeScript знал, что возвращаемый результат всегда является задачей типа TaskType.
    // Без этого приведения TypeScript мог бы предположить, что результат может быть TaskType | undefined, так как .find() может вернуть undefined, если элемент не найден.

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

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
                        return (
                            <Task key={task.id} todolist={todolist} task={task}/>
                        );
                    })}
                </List>
            )}
        </>

    )
});