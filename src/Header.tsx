import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeThemeAC, ThemeMode} from "./state/changeTheme-reducer";
import {getTheme} from "./common/theme/theme";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {AppRootStateType} from "./state/state";


export const Header = () => {

    let changeTheme = useSelector<AppRootStateType, ThemeMode>(state => state.changeTheme.themeMode)

    const theme = getTheme(changeTheme);

    //присваиваем переменной метод useDispatch()-хук, прокинем его в каждую функцию
    //а он дальше сам разберется куда прокидывать
    const dispatch = useDispatch()

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