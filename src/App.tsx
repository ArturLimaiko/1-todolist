import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {Tasks} from "./components/TASKS";

export type DataTasksType = {
    taskId: number,
    title: string,
    isDone: boolean
}

export type DataType = {
    title:string,
    tasks:DataTasksType[],
    students:string[]
}

export type TasksType = {
    id: number,
    title: string
    isDone: boolean
}

function App() {
    // BLL

    const data1:DataType = {
        title: "What to do",
        tasks: [
            {taskId: 1, title: "HTML&CSS2", isDone: true},
            {taskId: 2, title: "JS2", isDone: false}
        ],
        students: [
            'Jago Wormald1',
            'Saul Milne2',
            'Aariz Hester3',
            'Dion Reeve4',
            'Anisa Ortega5',
            'Blade Cisneros6',
            'Malaikah Phelps7',
            'Zeeshan Gallagher8',
            'Isobella Vo9',
            'Rizwan Mathis10',
            'Menaal Leach11',
            'Kian Walton12',
            'Orion Lamb13',
            'Faizah Huynh14',
            'Crystal Vaughan15',
            'Vivien Hickman16',
            'Stuart Lu17',
            'Karol Davison18',
            'Dario Burns19',
            'Chloe Rich20',
            'Martyna Felix',
            'Nida Glass',
            'Maeve Miles',
            'Hasnain Puckett',
            'Ayman Cano',
            'Safwan Perry',
            'Fox Kelly',
            'Louise Barlow',
            'Malaki Mcgill',
            'Leanna Cline',
            'Willard Hodge',
            'Amelia Dorsey',
            'Kiah Porter',
            'Jeanne Daly',
            'Mohsin Armstrong',
            'Laurie Rangel',
            'Princess Tierney',
            'Kasim Kendall',
            'Darryl Cope',
            'Elysha Ray',
            'Liyana Harris',
            'Kashif Blackburn',
            'Atif Zimmerman',
            'Sila Hartley',
            'Ralphie Hebert',
        ]
    }
    const data2:DataType =   {
        title: "What to learn",
        tasks: [
            {taskId: 1, title: "HTML&CSS", isDone: false},
            {taskId: 2, title: "JS", isDone: false}
        ],
        students: [
            'Rick Kane',
            'Finnlay Bentley',
            'Samia North',
            'Isaac Morton',
            'Lily-Ann Clifford',
            'Thalia Park',
            'Sapphire Cruz',
            'Cieran Vazquez',
            'Anya Estes',
            'Dominika Field',
            'Rosanna Chung',
            'Safiyah Davey',
            'Ryley Beasley',
            'Kalvin Trejo',
            'Evie-Mae Farrell',
            'Juliet Valencia',
            'Astrid Austin',
            'Lyle Montgomery',
            'Nisha Mora',
            'Kylie Callaghan',
            'Star Wilks',
            'Marissa Colley',
            'Asa Fuller',
            'Leigh Kemp',
            'Avleen Dawson',
            'Sammy Bonilla',
            'Acacia Becker',
            'Coral Shepherd',
            'Melina Molina',
            'Kiran Bailey',
            'Clara Escobar',
            'Alexandru Horn',
            'Brandon-Lee Mercado',
            'Elouise Weston',
            'King Long',
            'Kerri Searle',
            'Kanye Hamer',
            'Elwood Benitez',
            'Mikail Whitaker',
            'Bobby Hardy',
            'Talha Ferry',
            'Priscilla Landry',
            'Olivia-Grace Cain',
            'Kiaan Wallace',
            'Wesley Padilla90',
            'Ella-Grace Wooten91',
            'Kaif Molloy92',
            'Kamal Broadhurst93',
            'Bianca Ferrell94',
            'Micheal Talbot95',
        ]
    }


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
                <Tasks data={data1}/>
                <Tasks data={data2}/>
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