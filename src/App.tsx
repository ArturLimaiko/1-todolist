import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string,
    title: string
    isDone: boolean
    changeStatus?:(taskID: string,isDone:boolean) => void
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
                />
            </div>
        </div>
    );
}

export default App;

// 3 неделя
// инсталим uuid библиотеку
// функция addTask  - туда сначала добавим переменную и присвоим ей новый объект newTask{} - затем сетаем новые таски и старые
// addTask() функцию прокинем в button который + , не забудем обернуть ее колбеком который вызовет ее
// в тудулисте создадим inputRef и протипизируем ( это будет HTMLInputElement) в параметрах укажем (null)
// прокинуть ref={inputRef} в  инпут
// далее вместо title: ''  передадим inputRef внутрь фукнции addTask и напишем условие если inputRef.current  то тогда
// вызывай addTask(inputRef.current.value) - это значит типа если инпут не пустой тогда передавай значение

//далее делаем что бы при нажатии на кнопку   enter у нас отправлялась таска
// в инпуте вызывает событие onkeydown - внутри вызываем колбек event и вызываем  event.key === 'Enter'
//далее нужно отправить в функцию наш локальный стейт - пропишем  запускаем addTaskTitle(newTitle) , после зачищаем поле

//зарефакторим код который написан внутри тегов - заметим компоненты button  просто тегами
// для каждой кнопки создали ссылку и вынесем наверх внутренность
// далее заменим 3 функции - одной назовем ее changeFilterHandler , внутрь передадим changeFilter и все 3 параметра all active completed
// далее протипизируем  в параметрах filterValuesType и в changeFilter передадим value
//далее зарефакторим  функцию removeTask в TasksList вынесем ее наверх
//далее зарефакторим  функцию addTask  вынесем ее наверх, создадим функцию addTaskHandler
//далее зарефакторим  onKeyDown,вынесем ее наверх в функцию, создадим функцию onKeyDownHandler
//далее зарефакторим  onChange ,вынесем ее наверх в функцию, создадим функцию onChangeHandler