import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeThemeAC, ThemeMode} from "../../state/changeTheme-reducer";
import {getTheme} from "../theme/theme";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {AppRootStateType} from "../../state/state";
import {useAppDispatch} from "../hooks/useAppDispatch";


export const Header = () => {

    let changeTheme = useSelector<AppRootStateType, ThemeMode>(state => state.changeTheme.themeMode)

    const theme = getTheme(changeTheme);

    //присваиваем переменной метод useDispatch()-хук, прокинем его в каждую функцию
    //а он дальше сам разберется куда прокидывать
    const dispatch = useAppDispatch()

    const changeModeHandler = () => {
        dispatch(changeThemeAC(changeTheme === 'dark' ? 'light' : 'dark'))
    }

    return (
        <Container fixed>
            <Grid>
                <ButtonAppBar onChange={changeModeHandler}/>
            </Grid>
        </Container>
    );
};