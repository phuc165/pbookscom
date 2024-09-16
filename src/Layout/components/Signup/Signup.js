import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './signup.module.css';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const cx = classNames.bind(styles);

const Signup = () => {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                const userDocRef = doc(db, 'user', user.uid);
                await setDoc(userDocRef, {
                    email,
                    password,
                    role: 'user', // Add the role field here
                });
                setEmail('');
                setPassword('');
                console.log('Document written with ID: ', user.uid);
                console.log(user);
                navigate('/signinup');
                alert('Đăng ký thành công');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    };

    return (
        <form className={cx('signupForm')} onSubmit={onSubmit}>
            <div className={cx('input')}>
                <label>Email:</label>
                <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className={cx('input')}>
                <label>Mật khẩu:</label>
                <input
                    type="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className={cx('input')}>
                <label>Nhập lại Mật khẩu:</label>
                <input type="password" name="password" required />
            </div>
            <hr />
            <button type="submit" className={cx('submitBtn')}>
                Đăng ký
            </button>
        </form>
    );
};

export default Signup;
