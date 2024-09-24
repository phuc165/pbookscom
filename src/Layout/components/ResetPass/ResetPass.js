import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './reset.module.css';

const cx = classNames.bind(styles);
async function resetPassword(email) {
    const auth = getAuth();
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset email sent!');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
}

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword(email);
    };

    return (
        <div>
            <h2>Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit} className={cx('container')}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                    required
                    className={cx('input')}
                />
                <button type="submit" className={cx('button')}>
                    Gửi email đặt lại mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
