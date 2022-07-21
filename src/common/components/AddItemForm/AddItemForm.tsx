import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

type PropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required!')
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
            addItem()
        }
    }

    return (
        <>
            <TextField error={!!error}
                       value={title}
                       disabled={props.disabled}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       variant={'outlined'}
                       label="Title"
                       size={'small'}
                       helperText={error}
            />
            <Button disabled={props.disabled}
                    onClick={addItem}
                    variant={'contained'}
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