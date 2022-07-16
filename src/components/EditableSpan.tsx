import {TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {

    const [title, setTitle] = useState<string>(props.title)
    const [edit, setEdit] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onDoubleClickHandler = () => {
        setEdit(true)
        setTitle(props.title);
    }
    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(title)
    }

    return (
        edit
            ? <TextField autoFocus
                         onChange={onChangeHandler}
                         onBlur={onBlurHandler}
                         value={title}
                         variant={'outlined'}
                         id={'outlined-basic'}
                         size={'small'}
            />
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    )
})
