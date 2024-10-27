import React, {useCallback} from "react";
import Grid from "@mui/material/Grid2";
import {AddItemForm} from "./AddItemForm";
import {addTodolistAC} from "../state/todolist-reducer";
import {TodoListType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/state";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {Paper} from "@mui/material";

export const Main = () => {
    //в дженерике - 1 параметр тип стейта с которым работает , 2ой - тип то что мы хотим вернуть из нашего селектора - в нашем случае массив TodoListType
    //внутри в колбеке лежит наш стейт
    let todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolist)

    //присваиваем переменной метод useDispatch()-хук, прокинем его в каждую функцию
    //а он дальше сам разберется куда прокидывать
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    // //вынес отдельно .map тудулистов в переменную и использую ее  ниже
    // //маппинг создаёт массив JSX-элементов,
    const todoListsComp: JSX.Element[] = todolists.map(t => {
        return (
            <Grid sx={{p: '30px'}} key={t.id}>
                <Paper elevation={5} sx={{p: '30px'}}>
                    <TodolistWithRedux todolist={t}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <Grid container>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={2}>
                {todoListsComp}
            </Grid>
        </div>
    );
};