import React from 'react';

type ButtonType = {
    title: string
    onClick: ()=> void
}

export const Button = ({title}:ButtonType) => {
    return  <button onClick={()=>{} }>{title}</button>
};