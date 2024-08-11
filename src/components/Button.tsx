import React from 'react';

type ButtonType = {
    title: string
    callBack: () => void
}

export const Button = ({title,callBack}:ButtonType) => {
    return  <button onClick={()=> callBack}>{title}</button>
};