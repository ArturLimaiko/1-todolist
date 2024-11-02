import React from 'react';
import Grid from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import {TodolistWithRedux} from "./Todolist/TodolistWithRedux";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";

export const Todolists = () => {
    let todolists = useAppSelector(state => state.todolist)

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