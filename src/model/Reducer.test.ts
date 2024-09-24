import {v1} from "uuid";
import {TodoListType} from "../App";
import {todolistReducer} from "./Reducer";

test('correct todolists should be remover', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()
    //стартовый стейт
    const startState: TodoListType[] = [
        {id: todolistId_1, title: 'Whats to learn ?', filter: 'all'},
        {id: todolistId_2, title: 'What to bye ?', filter: 'all'},
    ]
    //какое то действие
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId_1,
        }
    }
    //итоговый стейт
    const endState = todolistReducer(startState, action)

    // проверка  что наши действия в стейте соответствуют ожиданию -
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId_2)
})