import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string,
    title: string
    isDone: boolean
    className?:string
}

export type FilterValuesType = 'all' | 'active' | 'completed' | 'deleteAllTasks'

function App() {
    // BLL
    let [tasks, setTasks] = useState<TasksType[]>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ]
    )

    const removeTask = (taskID: string) => {
        let filteredTask = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTask);
    }

    //создаю функц внутри сетаю таски пустым массивом
    const removeAllTasks = () => {
        setTasks([])
    }

    const addTask = (taskTitle: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskID: string,isDone:boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t,isDone}: t))
    }

    return (
        <div className="App">
            <div>
                <Todolist tasks={tasks}
                          title={'Whats to learn?'}
                          removeTask={removeTask}
                          addTask={addTask}
                          changeStatus={changeStatus}
                          removeAllTasks={removeAllTasks}
                />
            </div>
        </div>
    );
}

export default App;