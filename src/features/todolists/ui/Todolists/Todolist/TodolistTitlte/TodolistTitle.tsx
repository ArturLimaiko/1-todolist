import React, {memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTodolistTitleAC, removeTodolistAC} from "../../../../../../state/todolist-reducer";
import {EditableSpan} from "../../../../../../common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodoListType} from "../../../../../../app/AppWithRedux";

type Props = { todolist: TodoListType }

export const TodolistTitle = memo(({todolist}: Props) => {

    const dispatch = useDispatch()

    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, updateTitle))
    }, [dispatch])

    const removeTodolistTitleHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id))
    }, [dispatch])

    return (
        <h3><EditableSpan oldTitle={todolist.title} onClick={updateTodolistTitleHandler}/>
            <IconButton aria-label="delete" size="small" onClick={removeTodolistTitleHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </h3>
    )
})