import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import App from './components/App';
import {createStore} from "redux";
import { Provider } from "react-redux";

import RootReducer from "./reducers/reducers";

ReactDOM.render(
    <Provider store={createStore(RootReducer)}>
        <App/>
    </Provider>,
    document.getElementById('root')
);