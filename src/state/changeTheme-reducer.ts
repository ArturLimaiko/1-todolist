// Определяем тип для режима темы: 'dark' или 'light'.
// Используется для ограничения значений переменной themeMode.
export type ThemeMode = 'dark' | 'light'

// Определяем тип для начального состояния редьюсера.
// Используем typeof initialState, чтобы автоматически задать тип по структуре initialState.
export type InitialState = typeof initialState

// Начальное состояние для редьюсера.
// Устанавливаем начальное значение themeMode в 'dark'.
export const initialState = {
    themeMode: 'dark' as ThemeMode,
}

// Определяем тип для экшена ToggleThemeAction, используя ReturnType для вывода типа возвращаемого значения функции themeModeAC.
// Это позволяет нам автоматически выводить тип экшена для TOGGLE-THEME.
export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>;


// Определяем ActionsType как объединение всех возможных типов экшенов.
// Пока у нас один тип ToggleThemeAction, но в будущем сюда можно добавить другие типы экшенов.
export type ActionsType = ChangeThemeActionType;

export const changeThemeReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE-THEME':
            return {
                ...state,
                // themeMode: state.themeMode === 'dark' ? 'light' : 'dark' // можно так если не передавать ничего в Action Creator в диспатче
                themeMode: action.payload
            }
        default:
            return state
    }
}

// Action Creator (Создатель действия) для переключения темы
// themeModeAC — это функция, которая возвращает объект действия с типом 'CHANGE-THEME'.
// Этот объект можно отправить (dispatch) в редьюсер, чтобы изменить значение themeMode.
// Используем `as const`, чтобы TypeScript точно знал, что type всегда равен 'CHANGE-THEME'.
export const changeThemeAC = (themeMode: ThemeMode) => {
    return {type: 'CHANGE-THEME',payload: themeMode} as const
}