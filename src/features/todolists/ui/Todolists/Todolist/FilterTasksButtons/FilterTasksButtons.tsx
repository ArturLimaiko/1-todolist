import React, {useCallback} from 'react';
import {FilterButtonContainerSx} from "../../../../../../Todolist.styles";
import {ButtonWithMemo} from "../../../../../../ButtonWithMemo";
import Box from "@mui/material/Box";
import {FilterValuesType, TodoListType} from "../../../../../../app/AppWithRedux";
import {changeTodolistFilterAC} from "../../../../../../state/todolist-reducer";
import {useDispatch} from "react-redux";

type Props = { todolist: TodoListType }

export const FilterTasksButtons = ({todolist}: Props) => {
    const {id, filter} = todolist

    const dispatch = useDispatch()
    //filter
    const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }, [dispatch])

    return (
        <>
            <Box sx={FilterButtonContainerSx}>
                <ButtonWithMemo variant={filter === 'all' ? 'contained' : 'outlined'}
                                onClick={() => changeFilterTasksHandler('all')}
                                color='success'> all
                </ButtonWithMemo>
                <ButtonWithMemo variant={filter === 'active' ? 'contained' : 'outlined'}
                                onClick={() => changeFilterTasksHandler('active')}
                                color='secondary'> active
                </ButtonWithMemo>
                <ButtonWithMemo variant={filter === 'completed' ? 'contained' : 'outlined'}
                                onClick={() => changeFilterTasksHandler('completed')}
                                color='error'> completed
                </ButtonWithMemo>
            </Box>
        </>
    )
        ;
};