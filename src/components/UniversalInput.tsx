import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type PropsType = {
    callBack: (title: string) => void
}

export const UniversalInput = (props: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <>
            <TextField id={'outlined-basic'}
                       label={error ? 'Title is required' : 'Enter the text'}
                       variant={'outlined'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       size={'small'}
                       error={error}
            />
            <Button variant={'contained'}
                    onClick={addItemHandler}
                    style={{
                        maxWidth: '38px',
                        maxHeight: '38px',
                        minWidth: '38px',
                        minHeight: '38px'
                    }}>+
            </Button>
        </>
    );
};