import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import classNames from 'classnames/bind';
import styles from './account.module.css';
import AddAddress from '~/Layout/components/AddressBook/AddressBook';
import ShowAddressBook from '~/Layout/components/AddressBook/ShowAddressBook';
import AllBills from './AllBills';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const AccountPage = () => {
    const GetUserUid = () => {
        const auth = getAuth();
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setUid(user.uid);
                }
            });
        }, []);
        return uid;
    };
    const uid = GetUserUid();
    return (
        <div className={cx('container')}>
            <h1>Tài khoản</h1>
            <div className={cx('inner')}>
                <div className={cx('linkContainer')}>
                    <Link to={'/reset-password'} className={cx('link')}>
                        Đặt lại mật khẩu
                    </Link>
                </div>

                <AddAddress />
                <ShowAddressBook />
                <AllBills userId={uid} />
            </div>
        </div>
    );
};

export default AccountPage;
