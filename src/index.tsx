import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AppWithRedux} from "./components/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/state";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
);

//Provider связывает реакт и редакс обязательный параметр просит - объект типа стор