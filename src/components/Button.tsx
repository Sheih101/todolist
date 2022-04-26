import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
    className?: string
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button className={props.className} onClick={props.callBack}>{props.name}</button>
    );
};
