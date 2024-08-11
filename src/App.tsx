import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TasksType = {
    id: number,
    title: string
    isDone: boolean
}

function App() {
    // BLL

    // const tasks2: TasksType[] = [
    //     {id: 1, title: 'Hello world', isDone: true},
    //     {id: 2, title: 'I am Happy', isDone: false},
    //     {id: 3, title: 'Yo', isDone: false},
    // ]
    // const tasks3: TasksType[] = []

    let [task, setTask] = useState<TasksType[]>([
            {id: 1, title: 'HTML&CSS', isDone: false},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'React', isDone: true},
            {id: 4, title: 'Redux', isDone: false},
            {id: 5, title: 'Typescript', isDone: false},
            {id: 6, title: 'RTK query', isDone: false},
        ]
    )
    const removeTask = (taskId: number) => {
        let filteredTask = task.filter(t => t.id !== taskId)
        setTask(filteredTask)
    }

    return (
        <div className="App">
            <div>
                <Todolist tasks={task} title={'Whats to learn?'} removeTask={removeTask}/>
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