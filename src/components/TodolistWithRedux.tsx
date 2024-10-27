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
    // const {id, filter, title} = todolist;

    const dispatch = useDispatch()

    //addTask
    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }, [dispatch])
//
    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, updateTitle))
    }, [])

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

        <div>
            <h3><EditableSpan oldTitle={todolist.title} onClick={updateTodolistTitleHandler}/>
                <IconButton aria-label="delete" size="small" onClick={() => dispatch(removeTodolistAC(todolist.id))}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
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
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
})
