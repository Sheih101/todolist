import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type PropsType = {
    callBack: (title: string) => void
}

export const UniversalInput = React.memo((props: PropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <>
            <TextField variant={'outlined'}
                       error={!!error}
                       id={'outlined-basic'}
                       label="Title"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       size={'small'}
                       helperText={error}
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
})