import classNames from 'classnames/bind';
import styles from './user.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
    signInWithEmailAndPassword,
} from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();
const cx = classNames.bind(styles);
function User() {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            const userCollection = collection(db, 'user');
            const userSnapshot = await getDocs(userCollection);
            const userList = userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
        };

        fetchUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, 'user', user.uid), {
                uid: user.uid,
                email,
                role,
                password,
            });
            setEmail('');
            setPassword('');
            setRole('user');
            alert('Thêm tài khoản thành công');
            navigate('/admin');
        } catch (error) {
            console.error('Error adding user: ', error);
        }
    };
    const handleUpdateRole = async (userId, newRole) => {
        try {
            const userDoc = doc(db, 'user', userId);
            await updateDoc(userDoc, { role: newRole });
            setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
        } catch (error) {
            console.error('Error updating user role: ', error);
        }
    };
    return (
        <>
            <h1>Quản lý tài khoản</h1>
            <div className={cx('container')}>
                <form onSubmit={handleAddUser} className={cx('add')}>
                    <h2>Thêm tài khoản</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Thêm tài khoản</button>
                </form>
                <div className={cx('accountList')}>
                    {users.map((user) => (
                        <div key={user.id} className={cx('account')}>
                            <div className={cx('col1')}>{user.email}</div>
                            <div className={cx('col2')}>{user.role}</div>
                            <div className={cx('col3')}>
                                <button
                                    onClick={() => handleUpdateRole(user.id, user.role === 'user' ? 'admin' : 'user')}
                                >
                                    Set as {user.role === 'user' ? 'Admin' : 'User'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default User;
