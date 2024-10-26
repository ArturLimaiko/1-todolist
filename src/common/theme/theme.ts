//state и переключение темы
import {createTheme} from "@mui/material";
import {ThemeMode} from "../../state/changeTheme-reducer";

// const [themeMode, setThemeMode] = useState<ThemeModeType>('dark')

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            // mode: themeMode === 'light' ? 'light' : 'dark',
            mode: themeMode === 'dark' ? 'dark' : 'light',
            primary: {
                main: '#087EA4'
            }
        }
    });
}
