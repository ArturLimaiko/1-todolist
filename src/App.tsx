import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = { id: string, title: string, isDone: boolean }

export type TodoListType = { id: string, title: string, filter: FilterValuesType }

export type TasksStateType = { [todolistId: string]: TaskType[] }

export type FilterValuesType = 'all' | 'active' | 'completed'

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

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, filter:filter} : t))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }

    const todoListsComp: JSX.Element[] = todoLists.map(t => {

        let tasksForTodolist = tasks[t.id]
        if (t.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
        }

        if (t.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
        }

        return <Todolist
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
        />
    })

    return (
        <div className="App">
            {todoListsComp}
        </div>
    );
}

export default App;
