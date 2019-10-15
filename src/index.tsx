import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux';
import App from './App';
import './stylesheets/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));