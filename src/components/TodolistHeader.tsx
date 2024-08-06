import React from 'react';

export type TodolistHeaderType = {
    title: string
}

export const TodolistHeader = ({title}: TodolistHeaderType) => {
    return <h3>{title}</h3>
};