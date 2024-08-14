import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TasksType = {
    id: number,
    title: string
    isDone: boolean
}

//Hi guys!
//1. Let's create a 'DELETE ALL TASKS' button, and place it above the filter buttons
//Clicking the button removes all tasks
//2. Let's create a fourth filter button-if you click it, the first three tasks will be displayed
//3. Relocate everything associated with  filters to the Todolist.tsx component. Make it work
//
// let [filter, setFilter] = useState<FilterValuesType>("all");
//
// let tasksForTodolist = tasks;
//
// if (filter === "active") {
//     tasksForTodolist = tasks.filter(t => t.isDone === false);
// }
// if (filter === "completed") {
//     tasksForTodolist = tasks.filter(t => t.isDone === true);
// }
//
// function changeFilter(value: FilterValuesType) {
//     setFilter(value);
// }

export type FilterValuesType = 'all' | 'active' | 'completed' | 'deleteAllTasks'

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

    const removeTask = (taskId: number) => {
        let filteredTask = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTask);
    }

    return (
        <div className="App">
            <div>
                <Todolist tasks={tasks}
                          title={'Whats to learn?'}
                          removeTask={removeTask}
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