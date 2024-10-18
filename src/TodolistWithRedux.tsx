import {FilterValuesType, TaskType} from "./AppWithReducers";
import {ChangeEvent, memo, useCallback, useMemo} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import Box from "@mui/material/Box";
import {FilterButtonContainerSx} from "./Todolist.styles";
import {TodoListType} from "./AppWithRedux";
import {AppRootStateType} from "./state/state";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {ButtonWithMemo} from "./ButtonWithMemo";
import {TaskWithRedux} from "./TaskWithRedux";

export type PropsType = {
    todolists: TodoListType
}

export const TodolistWithRedux = memo(({todolists}: PropsType) => {

    const {id, filter, title} = todolists;
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const dispatch = useDispatch()

    const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }, [dispatch])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    }, [dispatch])

    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        dispatch(changeTodolistTitleAC(id, updateTitle))
    }, [])

    const updateTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskId, newTitle))
    }, [dispatch])

    const removeTaskHandler = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])

    const changeTaskStatusHandler = useCallback((todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistId, taskId, newStatusValue))
    }, [dispatch])

    tasks = useMemo(() => {
        console.log('UseMemo')
        //фильтрация тасок
        if (filter === 'active') {
            tasks = tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            tasks = tasks.filter(task => task.isDone)
        }
        return tasks
    }, [tasks, filter])

    return (
        <div>
            <h3><EditableSpan oldTitle={title} onClick={updateTodolistTitleHandler}/>
                <IconButton aria-label="delete" size="small" onClick={() => dispatch(removeTodolistAC(id))}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((t) => {
                            return (
                                <TaskWithRedux key={t.id}
                                               taskId={t.id}
                                               todolistId={id}
                                               updateTaskTitleHandler={updateTaskTitleHandler}
                                               removeTaskHandler={removeTaskHandler}
                                               changeTaskStatusHandler={changeTaskStatusHandler}
                                />
                            )
                        })}
                    </List>
            }
            <div>
                <Box sx={FilterButtonContainerSx}>
                    <ButtonWithMemo variant={filter === 'all' ? 'contained' : 'outlined'}
                                    onClick={() => changeFilterTasksHandler('all')}
                                    color='success'> all
                    </ButtonWithMemo>
                    <ButtonWithMemo variant={filter === 'active' ? 'contained' : 'outlined'}
                                    onClick={() => changeFilterTasksHandler('active')}
                                    color='secondary'> active
                    </ButtonWithMemo>
                    <ButtonWithMemo variant={filter === 'completed' ? 'contained' : 'outlined'}
                                    onClick={() => changeFilterTasksHandler('completed')}
                                    color='error'> completed
                    </ButtonWithMemo>
                </Box>
            </div>
        </div>
    )
})
