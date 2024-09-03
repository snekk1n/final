import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App/App.jsx';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';  // Импортируем Provider из react-redux
import {setupStore} from './App/Provider/state.js';

createRoot(document.getElementById('root')).render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
