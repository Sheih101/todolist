import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
}

export const Button = (props: ButtonPropsType) => {
    return (
        <div>
            <button onClick={props.callBack}>{props.name}</button>
        </div>
    );
};

