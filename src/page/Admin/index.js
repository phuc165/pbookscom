import { useState } from 'react';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './admin.module.css';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import Home from '../../component/AdminComponent/Home';
import User from '../../component/AdminComponent/User';
import Order from '../../component/AdminComponent/Order';
import Product from '../../component/AdminComponent/Product';

const db = getFirestore();
const auth = getAuth();

const cx = classNames.bind(styles);
function Admin() {
    const [activeTab, setActiveTab] = useState('user');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('sidenav')}>
                <div className={cx('tabList')}>
                    <div className={cx('tab')} onClick={() => handleTabClick('user')}>
                        Quản lý người dùng
                    </div>
                    <div className={cx('tab')} onClick={() => handleTabClick('product')}>
                        Quản lý sản phẩm
                    </div>
                    <div className={cx('tab')} onClick={() => handleTabClick('order')}>
                        Quản lý đơn hàng
                    </div>
                    <div className={cx('backHome')}>
                        <Link to={'/'}>
                            <img src="/images/header/logo.png" className={cx('imgBackHome')} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cx('main')}>
                {activeTab === 'user' && <User />}
                {activeTab === 'product' && <Product />}
                {activeTab === 'order' && <Order />}
            </div>
        </div>
    );
}

export default Admin;
