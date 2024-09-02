import styles from './Header.module.css';
import classNames from 'classnames/bind';

import { CartIcon, UserIcon, LogoutIcon } from '~/component/Icons';
import { LogoIcon } from '~/component/Images';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <a href="#"></a>
                    <LogoIcon />
                </div>
                <form action="#" className={cx('searchForm')}>
                    <input
                        type="text"
                        placeholder="Tìm sách"
                        className={cx('searchBar')}
                    />
                </form>
                <div className={cx('iconContainer')}>
                    <button className={cx('iconButton')}>
                        <CartIcon />
                    </button>
                    <button className={cx('iconButton')}>
                        <UserIcon />
                    </button>
                    <button className={cx('iconButton')}>
                        <LogoutIcon />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
