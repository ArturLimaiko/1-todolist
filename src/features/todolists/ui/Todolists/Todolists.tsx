import React from 'react';
import Grid from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import {TodolistWithRedux} from "./Todolist/TodolistWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../state/state";
import {TodoListType} from "../../../../app/AppWithRedux";

export const Todolists = () => {
    //в дженерике - 1 параметр тип стейта с которым работает , 2ой - тип то что мы хотим вернуть из нашего селектора - в нашем случае массив TodoListType
    //внутри в колбеке лежит наш стейт
    let todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolist)

    return (
        //по скольку возвращаю массив элементов а это не допустимо то оборачиваю в React.Fragment - будет восприниматься JSX как один целый компонент
        <React.Fragment>
            {
                todolists.map(t => {
                    return (
                        <Grid sx={{p: '30px'}} key={t.id}>
                            <Paper elevation={5} sx={{p: '30px'}}>
                                <TodolistWithRedux todolist={t}/>
                            </Paper>
                        </Grid>
                    )
                })}
        </React.Fragment>
    )
};