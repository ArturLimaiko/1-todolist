import './App.css';
import {Todolist} from "./Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type TaskType = { id: string, title: string, isDone: boolean }

export type TodoListType = { id: string, title: string, filter: FilterValuesType }

export type TasksStateType = { [todolistId: string]: TaskType[] }

export type FilterValuesType = 'all' | 'active' | 'completed'

export type ThemeModeType = 'dark' | 'light'

const todolistId_1 = v1()
const todolistId_2 = v1()

function AppWithReducers() {

    const [todolist, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'NextJs', isDone: false},
            {id: v1(), title: 'StoryBook', isDone: true},
            {id: v1(), title: 'TS', isDone: true},
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todolistId))
    }

    const changeTaskStatus = (taskId: string, todolistId: string, taskStatus: boolean) => {
        dispatchToTasks(changeTaskStatusAC(taskId, todolistId, taskStatus))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTodolistTitle = (todolistId: string, updatedTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, updatedTitle))
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
    }

    const todoListsComp: JSX.Element[] = todolist.map(t => {
        let tasksForTodolist = tasks[t.id]
        if (t.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
        }
        if (t.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
        }

        return (
            <Grid sx={{p: '30px'}}>
                <Paper elevation={5} sx={{p: '30px'}}>
                    <Todolist
                        key={t.id}
                        todolistId={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        filter={t.filter}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        updateTaskTitle={updateTaskTitle}
                        updateTodolistTitle={updateTodolistTitle}
                    />
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
