import React, {memo} from 'react';
import {ButtonProps} from "@mui/material";
import Button from "@mui/material/Button";

export type ButtonWithMemoType = ButtonProps & {}

//создал мемоизированную кнопку , отдаю в Todolist вместо кнопок из MATERIAL UI
export const ButtonWithMemo = memo(({variant, onClick, color, children, ...rest}: ButtonWithMemoType) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            color={color}
            {...rest}
        >{children}
        </Button>
    );
});