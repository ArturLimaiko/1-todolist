import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, legacy_createStore as createStore} from 'redux';

//объединяем reducer'ы с помощью combineReducers,
//мы задаем структуру нашего единственного объекта состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistReducer
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
// определить автоматически тип всего объекта состояния

// а это что бы можно было обращаться к стору из окна браузера
//@ts-ignore
window.store = store;