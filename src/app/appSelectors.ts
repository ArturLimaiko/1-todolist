import { RootState } from './state'

//вынесли selector в отдальную компоненту в функцию селектор
export const selectThemeMode = (state: RootState) => state.changeTheme.themeMode

//1. Вопрос: Нужно ли типизировать возвращаемое значение селектора ?

// 1. Без типизации возвращаемого значения
// export const selectThemeMode = (state: RootState) => state.app.themeMode

// 2. С типизацией возвращаемого значения
// export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode

// 🙋‍♂️ Ответ: Чтобы точно быть уверенным, что вернешь нужный результат, то типизировать надо.
//Но как правило никто это не делает, т.к. при использовании useAppSelector ts поинмает возвращаемое значение.
// В документации нет примеров на этот счет.
//
// P.S. В RTK 2.0 вы будете использовать селекторы иначе, поэтому на данном этапе обучения пишите как вам понятнее.
