import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

type PropsType = {
    addItem: (title: string) => void
}

export const Input = (props: PropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <Button name={'+'} callBack={addItem}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};