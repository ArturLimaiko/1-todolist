import React from 'react';
import './App.css';
import {Button} from "./components/Button";
import {Task} from "./components/Task";
import {TodolistHeader} from "./components/TodolistHeader";
import {AddTaskForm} from "./components/AddTaskForm";
import {TasksList} from "./components/TasksList";
import {Todolist} from "./components/Todolist";

export type TasksType = {
    id: number,
    title: string
    isDone: boolean
}

function App() {
    // BLL
    const TodoListTitle = 'Whats to learn?'
    const tasks: TasksType[] = [
        {id: 1, title: 'HTML&CSS', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: true},
    ]

    return (
        <div className="App">
            <div>
                <Todolist tasks={tasks} title={TodoListTitle}/>
                {/*<TodolistHeader title={TodoListTitle}/>*/}
                {/*<AddTaskForm/>*/}
                {/*<TasksList tasks={tasks}/>*/}
            </div>
        </div>
    );
}

export default App;


// 1 создать компоненту button  прокинуть пропсы и компоненту заюзать в app + передать параметры через пропсы типа all active  и тд
// 2 создать компоненту Task.tsx  внутри кладем li  и все содержимое, далее создадим типы  и протипизируем
// 3 упакуем все в 3 компоненты - хедер, добавление таски и список тасок TodolistHeader, AddTaskForm, TasksList

// 4 внутри TasksList пройдемся мапом по нашим таскам
// 5 создадим компоненту Todolist и туда запихнем все компоненты + протипизировать( внутри тудулист получает tasks title)