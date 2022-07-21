import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type PropsType = {
    value: string
    callback: (value: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    const [value, setValue] = useState<string>(props.value)
    const [edit, setEdit] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onDoubleClickHandler = () => {
        setEdit(true)
        setValue(props.value);
    }
    const onBlurHandler = () => {
        setEdit(false)
        props.callback(value)
    }

    return (
        edit
            ? <TextField autoFocus
                         onChange={onChangeHandler}
                         onBlur={onBlurHandler}
                         value={value}
                         variant={'outlined'}
                         id={'outlined-basic'}
                         size={'small'}
            />
            : <span onDoubleClick={onDoubleClickHandler}>{props.value}</span>
    )
})
