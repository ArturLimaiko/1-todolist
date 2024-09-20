import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}:AddItemFormType) => {

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
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const ButtonStyle =  {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth:'30px',
        minHeight:'30px',
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <Button variant="contained" onClick={addItemHandler}
                    style ={ButtonStyle}>+</Button>
            {error && <div className={'error-message'}>{error}</div> }
        </div>
    );
};