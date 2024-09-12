import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './component/GlobalStyles';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAhyRw3qy5j1gtpTmGgA6txMdDqGLz8nB8',
    authDomain: 'pbooks-1c947.firebaseapp.com',
    projectId: 'pbooks-1c947',
    storageBucket: 'pbooks-1c947.appspot.com',
    messagingSenderId: '851841749483',
    appId: '1:851841749483:web:29d21a13453693475a09ae',
    measurementId: 'G-SC81BW1GV2',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <App db={db} />
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
