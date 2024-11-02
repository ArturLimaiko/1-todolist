import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {changeThemeReducer} from "./changeTheme-reducer";

//*
const rootReducer = combineReducers({
    tasks: tasksReducer,// функцию мы не вызываем  потому что это все сработает когда запуститься наше приложение
    todolist: todolistReducer,
    changeTheme: changeThemeReducer
})

//явно используем тип
export type AppDispatch = typeof store.dispatch

//store**
export const store = createStore(rootReducer);

//типы ***
export type AppRootStateType = ReturnType<typeof rootReducer>;

// а это что бы можно было обращаться к стору из окна браузера
//@ts-ignore
window.store = store;


//* rootReducer
//объединяем reducer'ы с помощью combineReducers,
//мы задаем структуру нашего единственного объекта состояния
//главный редьюсер на основе наших редьюсеров - возвращается объект

//** store
// объект который хранит данные - имеет свойства state- где хранятся данные - методы -
//getState()- получать данные
//dispatch()- метод объекта который принимает в параметр экшн когда мы вызываем и отдаем ему экшн ---> запускаются все редьюсеры
//subscribe()-


//***
//определить автоматически тип всего объекта состояния
//тип возвращаемого значения из нашего combineReducers - вернется state:{ tasks:{} , todolists[] }