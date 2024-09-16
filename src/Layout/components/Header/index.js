import styles from './Header.module.css';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon, UserIcon, LogoutIcon } from '~/component/Icons';
import { LogoIcon } from '~/component/Images';
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import Search from '../Search/Search';

const cx = classNames.bind(styles);

const Header = () => {
    const auth = getAuth();
    const navigate = useNavigate();
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
    const handleLogin = () => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, navigate to account page
                navigate('/account');
            } else {
                // No user is signed in, navigate to sign-in page
                navigate('/signinup');
            }
        });
    };
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/');
                console.log('Signed out successfully');
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <LogoIcon />
                    </Link>
                </div>
                <Search />
                <div className={cx('iconContainer')}>
                    <Link className={cx('iconButton')} to={'/cart'}>
                        <button>
                            <CartIcon />
                        </button>
                    </Link>
                    <Link className={cx('iconButton')} onClick={handleLogin}>
                        <button>
                            <UserIcon />
                        </button>
                    </Link>
                    <Link className={cx('iconButton')} to={'/'} onClick={handleLogout}>
                        <button>
                            <LogoutIcon />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
