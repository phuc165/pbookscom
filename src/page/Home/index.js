import React, { useState, useEffect } from 'react';

import AutoSlide from '~/Layout/components/AutoSlider/AutoSlide';
import classNames from 'classnames/bind';
import styles from './home.module.css';
import ProductFilter from '~/Layout/components/ProductFilter/ProductFilter';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const images = [
    { url: 'images/banner/banner_1.png' },
    { url: 'images/banner/banner_2.png' },
    { url: 'images/banner/banner_3.png' },
];

const cx = classNames.bind(styles);

const Home = () => {
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log('uid', uid);
            } else {
                // User is signed out
                // ...
                console.log('user is logged out');
            }
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <AutoSlide images={images} />
            <ProductFilter />
        </div>
    );
};

export default Home;
