import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/Layout';
import { Fragment } from 'react';
import withAdminAuth from '~/page/Admin/withAdminAuth '; // Import the HOC

import './App.css';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.Component;

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Element = route.admin ? withAdminAuth(Page) : Page;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Element />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
