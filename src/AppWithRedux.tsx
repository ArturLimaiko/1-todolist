import './App.css';
import {useState} from "react";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/state";
import {useDispatch, useSelector} from "react-redux";
import {TodolistWithRedux} from "./TodolistWithRedux";


export type TaskType = { id: string, title: string, isDone: boolean }

export type TodoListType = { id: string, title: string, filter: FilterValuesType }

export type TasksStateType = { [todolistId: string]: TaskType[] }

export type FilterValuesType = 'all' | 'active' | 'completed'

export type ThemeModeType = 'dark' | 'light'

function AppWithReducers() {
    let todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolist)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    //присваиваем переменной метод useDispatch() и прокинем его в каждую функцию
    //а он дальше сам разберется куда прокидывать
    const dispatch = useDispatch()

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    const changeTaskStatus = (taskId: string, todolistId: string, taskStatus: boolean) => {
        dispatch(changeTaskStatusAC(taskId, todolistId, taskStatus))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const updateTodolistTitle = (todolistId: string, updatedTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, updatedTitle))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }

    const todoListsComp: JSX.Element[] = todolists.map(t => {
        let tasksForTodolist = tasks[t.id]

        return (
            <Grid sx={{p: '30px'}} key={t.id}>
                <Paper elevation={5} sx={{p: '30px'}}>
                    <TodolistWithRedux todolists={t}/>
                </Paper>
            </Grid>
        )
    })

    const [themeMode, setThemeMode] = useState<ThemeModeType>('dark')

    const theme = createTheme({
        palette: {
            // mode: themeMode === 'light' ? 'light' : 'dark',
            mode: themeMode === 'dark' ? 'dark' : 'light',
            primary: {
                main: '#087EA4'
            }
        }
    });

    const changeModeHandler = () => {
        // setThemeMode(themeMode == 'light' ? 'dark' : 'light')
        setThemeMode(themeMode == 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Container fixed>
                    <Grid>
                        <ButtonAppBar onChange={changeModeHandler}/>

                        <Grid container>
                            <AddItemForm addItem={addTodoList}/>
                        </Grid>

                        <Grid container spacing={2}>
                            {todoListsComp}
                        </Grid>
                    </Grid>
                </Container>
                <CssBaseline/>
            </ThemeProvider>
        </div>
    );
}

export default AppWithReducers;
