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
    }
    const onBlurHandler = () => {
        setEdit(!edit)
        props.callBack(title)
    }

    return (
        edit
            ? <input value={title}
                     onBlur={onBlurHandler}
                     onChange={onChangeHandler}
                     autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
})
