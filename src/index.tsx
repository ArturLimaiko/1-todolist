import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./state/state";
import {AppHttpRequests} from "app/AppHttpRequests";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <AppHttpRequests/>
    </Provider>
);

//Provider связывает реакт и редакс обязательный параметр просит - объект типа стор