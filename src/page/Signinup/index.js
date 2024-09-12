import styles from './Signinup.module.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Signup from '~/Layout/components/Signup/Signup';
import Signin from '~/Layout/components/Signin/Signin';
const cx = classNames.bind(styles);

function Signinup() {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('tab')}>
                <div
                    className={cx('tab-button', { active: activeTab === 'login' })}
                    onClick={() => handleTabClick('login')}
                >
                    Đăng nhập
                </div>
                <div
                    className={cx('tab-button', { active: activeTab === 'signup' })}
                    onClick={() => handleTabClick('signup')}
                >
                    Đăng ký
                </div>
            </div>
            <div className={cx('tabContent')}>
                {activeTab === 'login' && <Signin />}
                {activeTab === 'signup' && <Signup />}
            </div>
        </div>
    );
}

export default Signinup;
