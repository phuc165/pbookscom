import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './signup.module.css';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

const cx = classNames.bind(styles);

const Signup = () => {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        // Clear form fields

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const docRef = addDoc(collection(db, 'user'), {
                    email,
                    password,
                });
                setEmail('');
                setPassword('');
                console.log('Document written with ID: ', docRef.id);
                console.log(user);
                navigate('/signinup');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    };
    return (
        <form className={cx('signupForm')}>
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
            <button type="submit" className={cx('submitBtn')} onClick={onSubmit}>
                Đăng ký
            </button>
        </form>
    );
};
export default Signup;
