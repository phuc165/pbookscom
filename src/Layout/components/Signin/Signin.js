import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './signin.module.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const cx = classNames.bind(styles);
const db = getFirestore();
const Signin = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user document from Firestore
            const userDocRef = doc(db, 'user', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();

                if (userData.role === 'admin') {
                    navigate('/admin');
                    alert('Đăng nhập thành công');
                } else {
                    navigate('/');
                    alert('Đăng nhập thành công');
                }
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
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
            <Link to={'/reset-password'}>Quên mật khẩu?</Link>
            <hr />
            <button type="submit" className={cx('submitBtn')} onClick={onLogin}>
                Đăng nhập
            </button>
        </form>
    );
};
export default Signin;
