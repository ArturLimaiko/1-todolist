import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo( ({addItem}: AddItemFormType) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }
    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(error)setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const ButtonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
    }

    return (
        <div>
            <TextField id="outlined-basic" label={error ? error : 'Type something...'} variant="outlined"
                // первый ! перебивает типизацию - то есть стрингу превращает в булево
                // второй ! делаем  противоположное значение от false - true
                       error={!!error}
                       size={'small'}
                       className={error ? 'error' : ''}
                       value={itemTitle}
                       onChange={changeItemTitleHandler}
                       onKeyUp={addItemOnKeyUpHandler}
            />
            <Button variant="contained" onClick={addItemHandler}
                    style={ButtonStyle}>+</Button>
        </div>
    );
});

