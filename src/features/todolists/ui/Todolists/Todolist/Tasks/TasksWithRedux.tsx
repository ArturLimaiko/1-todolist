import React, {memo, useMemo} from 'react';
import {TodoListType} from "../../../../../../app/AppWithRedux";
import List from "@mui/material/List";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";

type Props = { todolist: TodoListType }

export const TasksWithRedux = memo(({todolist}: Props) => {

    let tasks = useAppSelector(state => state.tasks)

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