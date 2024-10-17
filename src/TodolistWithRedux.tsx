import {FilterValuesType, TaskType} from "./AppWithReducers";
import {ChangeEvent, memo, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {FilterButtonContainerSx, getListItemSx} from "./Todolist.styles";
import {TodoListType} from "./AppWithRedux";
import {AppRootStateType} from "./state/state";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {ButtonWithMemo} from "./ButtonWithMemo";

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
    }, [dispatch])

    const updateTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskId, newTitle))
    }, [dispatch])

    //фильтрация тасок
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }

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
                        {tasks.map((task) => {
                            const removeTaskHandler = () => {
                                dispatch(removeTaskAC(task.id, id))
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                dispatch(changeTaskStatusAC(id, task.id, newStatusValue))
                            }

                            return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox color="default" size='small' checked={task.isDone}
                                              onChange={changeTaskStatusHandler}/>
                                    <EditableSpan oldTitle={task.title}
                                                  onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
                                </div>
                                <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </ListItem>
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
