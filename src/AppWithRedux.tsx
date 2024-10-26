import './App.css';
import {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/state";
import {useDispatch, useSelector} from "react-redux";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {changeThemeAC, ThemeMode} from "./state/changeTheme-reducer";
import {getTheme} from "./common/theme/theme";

export type TaskType = { id: string, title: string, isDone: boolean }

export type TodoListType = { id: string, title: string, filter: FilterValuesType }

export type TasksStateType = { [todolistId: string]: TaskType[] }

export type FilterValuesType = 'all' | 'active' | 'completed'


function AppWithRedux() {
    //в дженерике - 1 параметр тип стейта с которым работает , 2ой - тип то что мы хотим вернуть из нашего селектора - в нашем случае массив TodoListType
    //внутри в колбеке лежит наш стейт
    let todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolist)

    let changeTheme = useSelector<AppRootStateType, ThemeMode> (state=> state.changeTheme.themeMode)

    const theme = getTheme(changeTheme);

    //присваиваем переменной метод useDispatch()-хук, прокинем его в каждую функцию
    //а он дальше сам разберется куда прокидывать
    const dispatch = useDispatch()

    const removeTask = useCallback( (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    } , [dispatch])

    const changeTaskStatus = useCallback( (todolistId: string, taskId: string, taskStatus: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, taskStatus))
    } , [dispatch])

    const addTask = useCallback( (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    },[dispatch])

    const updateTaskTitle = useCallback( (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    } , [dispatch])

    const removeTodolist = useCallback( (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    } , [dispatch])

    const addTodoList = useCallback ((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const updateTodolistTitle = useCallback( (todolistId: string, updatedTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, updatedTitle))
    } , [dispatch])

    const changeFilter = useCallback( (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    } , [dispatch])

    //вынес отдельно .map тудулистов в переменную и использую ее  ниже
    //маппинг создаёт массив JSX-элементов,
    const todoListsComp: JSX.Element[] = todolists.map(t => {
        return (
            <Grid sx={{p: '30px'}} key={t.id}>
                <Paper elevation={5} sx={{p: '30px'}}>
                    <TodolistWithRedux todolists={t}/>
                </Paper>
            </Grid>
        )
    })

    const changeModeHandler = () => {
        dispatch(changeThemeAC())
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

export default AppWithRedux;
