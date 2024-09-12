import styles from './Header.module.css';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon, UserIcon, LogoutIcon } from '~/component/Icons';
import { LogoIcon } from '~/component/Images';

import { getAuth, signOut } from 'firebase/auth';

const cx = classNames.bind(styles);

const Header = () => {
    const auth = getAuth();
    const navigate = useNavigate();
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
                <form action="#" className={cx('searchForm')}>
                    <input type="text" placeholder="Tìm sách" className={cx('searchBar')} />
                </form>
                <div className={cx('iconContainer')}>
                    <Link className={cx('iconButton')} to={'/cart'}>
                        <button>
                            <CartIcon />
                        </button>
                    </Link>
                    <Link className={cx('iconButton')} to={'/signinup'}>
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
