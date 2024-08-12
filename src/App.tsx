import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TasksType = {
    id: number,
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    // BLL
    // const tasks2: TasksType[] = [
    //     {id: 1, title: 'Hello world', isDone: true},
    //     {id: 2, title: 'I am Happy', isDone: false},
    //     {id: 3, title: 'Yo', isDone: false},
    // ]
    // const tasks3: TasksType[] = []

    let [tasks, setTasks] = useState<TasksType[]>(
        [
            {id: 1, title: 'HTML&CSS', isDone: false},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'React', isDone: true},
            {id: 4, title: 'Redux', isDone: false},
            {id: 5, title: 'Typescript', isDone: false},
            {id: 6, title: 'RTK query', isDone: false},
        ]
    )

    let tasksForTodoList = tasks
    let [filter, setFilter] = useState<FilterValuesType>('all')
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskId: number) => {
        let filteredTask = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTask);
    }

    return (
        <div className="App">
            <div>
                <Todolist tasks={tasksForTodoList}
                          title={'Whats to learn?'}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                />
            </div>
            {/*<div>*/}
            {/*    <Todolist tasks={tasks2} title={'Songs'}/>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <Todolist tasks={tasks3} title={'Any Tasks'}/>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;