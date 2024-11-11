import React from "react";
import {ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {getTheme} from "common/theme/theme";
import {Header} from "common/components/Header/Header";
import {Main} from "./Main";
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectThemeMode} from "./appSelectors";


export type TasksStateType = { [todolistId: string]: TaskType[] }
export type TaskType = { id: string, title: string, isDone: boolean }
export type TodoListType = { id: string, title: string, filter: FilterValuesType }
export type FilterValuesType = 'all' | 'active' | 'completed'

export function AppWithRedux() {

    let changeTheme = useAppSelector(selectThemeMode)

    return (
        <div className="App">
            <ThemeProvider theme={getTheme(changeTheme)}>
                <Header/>
                <Main/>
                <CssBaseline/>
            </ThemeProvider>
        </div>
    );
}
