import React from 'react';

type ButtonPropsType = {
    callBack: () => void
    name: string
}

export const Button = (props: ButtonPropsType) => {
    return (
            <button onClick={props.callBack}>{props.name}</button>
    );
};
