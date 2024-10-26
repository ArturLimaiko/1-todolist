// Определяем тип для режима темы: 'dark' или 'light'.
// Используется для ограничения значений переменной themeMode.
export type ThemeMode = 'dark' | 'light'

// Определяем тип для начального состояния редьюсера.
// Используем typeof initialState, чтобы автоматически задать тип по структуре initialState.
type InitialState = typeof initialState

// Начальное состояние для редьюсера.
// Устанавливаем начальное значение themeMode в 'dark'.
const initialState = {
    themeMode: 'dark' as ThemeMode,
}

// Определяем тип для экшена ToggleThemeAction, используя ReturnType для вывода типа возвращаемого значения функции themeModeAC.
// Это позволяет нам автоматически выводить тип экшена для TOGGLE-THEME.
export type ToggleThemeAction = ReturnType<typeof themeModeAC>;


// Определяем ActionsType как объединение всех возможных типов экшенов.
// Пока у нас один тип ToggleThemeAction, но в будущем сюда можно добавить другие типы экшенов.
export type ActionsType = ToggleThemeAction;

export const themeReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'TOGGLE-THEME':
            return {
                ...state,
                themeMode: state.themeMode === 'dark' ? 'dark' : 'light'
            }
        default:
            return state
    }
}

export const themeModeAC = () => {
    return {type: 'TOGGLE-THEME' } as const
}


// export type ThemeModeType = 'dark' | 'light'
//
// type themeModeACType = {
//     themeMode: ThemeModeType
// };
//
// type themeActionType = themeModeAction
//
// type themeModeAction = {
//     type: 'TOGGLE-THEME'
// };
//
// const initialState: themeModeACType = {
//     themeMode: 'dark',
// }
//
// export const themeReducer = (state: themeModeACType = initialState, action: themeActionType): themeModeACType => {
//     switch (action.type) {
//         case 'TOGGLE-THEME': {
//             return {
//                 ...state,
//                 themeMode: state.themeMode === 'dark' ? 'dark' : 'light'
//             }
//         }
//         default:
//             return state
//     }
// }
//
// //Экшен, который можно будет использовать для вызова переключения темы.
//     const themeModeAC = ():themeModeAction => {
//    return {type: 'TOGGLE-THEME'}
// }
