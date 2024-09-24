import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {createTheme,ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";


export type TaskType = { id: string, title: string, isDone: boolean }

export type TodoListType = { id: string, title: string, filter: FilterValuesType }

export type TasksStateType = { [todolistId: string]: TaskType[] }

export type FilterValuesType = 'all' | 'active' | 'completed'

export type ThemeModeType = 'dark' | 'light'

const todolistId_1 = v1()
const todolistId_2 = v1()

function App() {

    const [todoLists, setTodoLists] = useState<TodoListType[]>(
        [
            {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
            {id: todolistId_2, title: 'What to bye ?', filter: 'active'},
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }



    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const updateTaskTitle = (todolistId: string, taskId: string, updatedTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: updatedTitle} : t)
        })
    }

    const addTodoList = (title: string) => {
        const id = v1()
        const newTodoList: TodoListType = {id, title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [id]: []})
    }

    const updateTodolistTitle = (todolistId: string, updatedTitle: string) =>  {
        setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, title: updatedTitle} : t))
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, filter: filter} : t))
    }


    const todoListsComp: JSX.Element[] = todoLists.map(t => {
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
                <CssBaseline />
            </ThemeProvider>
        </div>
    );
}

export default App;
