import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './signin.module.css';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const cx = classNames.bind(styles);

const Signin = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate('/');
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };
    return (
        <form className={cx('loginForm')}>
            <div className={cx('input')}>
                <label>Email:</label> <br />
                <input type="email" name="username" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={cx('input')}>
                <label>Mật khẩu:</label>
                <input
                    type="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={onLogin}
                />
            </div>
            <hr />
            <button type="submit" className={cx('submitBtn')} onClick={onLogin}>
                Đăng nhập
            </button>
        </form>
    );
};
export default Signin;
