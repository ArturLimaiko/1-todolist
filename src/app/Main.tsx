import React, {useCallback} from "react";
import Grid from "@mui/material/Grid2";
import {AddItemForm} from "../common/components/AddItemForm";
import {addTodolistAC} from "../state/todolist-reducer";
import {useDispatch} from "react-redux";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";

export const Main = () => {

    //присваиваем переменной метод useDispatch()-хук, прокинем его в каждую функцию
    //а он дальше сам разберется куда прокидывать
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])


    return (
        <div>
            <Grid container>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={2}>
            <Todolists/>
            </Grid>
        </div>
    );
};