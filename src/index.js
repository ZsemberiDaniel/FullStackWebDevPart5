import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Container>
                <App />
            </Container>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
