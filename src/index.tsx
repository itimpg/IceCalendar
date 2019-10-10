import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/Reducer';
import { Provider } from 'react-redux';
import App from './App';
import './stylesheets/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
    rootReducer,
    composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));