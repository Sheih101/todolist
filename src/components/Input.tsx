import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

type PropsType = {
    callBack: (title: string) => void
}

export const Input = (props: PropsType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            props.callBack(title.trim())
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <Button name={'+'} callBack={addItemHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};