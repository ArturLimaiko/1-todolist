import {FilterValuesType, TaskType} from "./AppWithReducers";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
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

export type PropsType = {
    todolists:TodoListType
}

export const TodolistWithRedux = ({todolists}: PropsType) => {

    const {id,filter,title} = todolists;
    let tasks = useSelector<AppRootStateType, TaskType[]>(state=> state.tasks[id])
    const dispatch = useDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id,filter))
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(id,title))
    }

    const updateTodolistTitleHandler = (updateTitle: string) => {
        dispatch(changeTodolistTitleAC(id,updateTitle))
    }

    const updateTaskTitleHandler = (taskId: string,newTitle: string) => {
        dispatch(changeTaskTitleAC(id,taskId,newTitle))
    }

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
                <IconButton aria-label="delete" size="small" onClick={()=>dispatch(removeTodolistAC(id))}>
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
                                dispatch(removeTaskAC(task.id,id))
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                dispatch(changeTaskStatusAC(id,task.id,newStatusValue))
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
                    <Button variant={filter === 'all' ? 'contained' : 'outlined'} color="success"
                            onClick={() => changeFilterTasksHandler('all')}>all</Button>
                    <Button variant={filter === 'active' ? 'contained' : 'outlined'} color="secondary"
                            onClick={() => changeFilterTasksHandler('active')}>active</Button>
                    <Button variant={filter === 'completed' ? 'contained' : 'outlined'} color="error"
                            onClick={() => changeFilterTasksHandler('completed')}>completed</Button>
                </Box>
            </div>
        </div>
    )
}
