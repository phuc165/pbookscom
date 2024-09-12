import styles from './Footer.module.css';
import classNames from 'classnames/bind';

import { LogoIcon } from '~/component/Images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>
                        <Link to={'/admin'}>
                            <LogoIcon />
                        </Link>
                    </div>
                    <div>9999 Nguyễn Hữu Cảnh Phường 22 Bình Thạnh TP HCM</div>
                    <div>Công Ty Cổ Phần Phát Hành Sách TP HCM - PBooks</div>
                    <div>PBooks.com nhận đặt hàng trực tuyến và giao hàng tận nơi.</div>
                    <div>
                        KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống PBooks trên
                        toàn quốc.
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('fcol')}>
                        <div className={cx('footer-static-title')}>
                            <h3>DỊCH VỤ</h3>
                        </div>
                        <div className={cx('footer-static-content')}>
                            <ul>
                                <li>
                                    <a href="#">Điều khoản sử dụng</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách bảo mật thông tin cá nhân</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách bảo mật thanh toán</a>
                                </li>
                                <li>
                                    <a href="#">Giới thiệu PBooks</a>
                                </li>
                                <li>
                                    <a href="#">Hệ thống trung tâm - nhà sách</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('fcol')}>
                        <div className={cx('footer-static-title')}>
                            <h3>HỖ TRỢ</h3>
                        </div>
                        <div className={cx('footer-static-content')}>
                            <ul>
                                <li>
                                    <a href="#">Chính sách đổi - trả - hoàn tiền</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách bảo hành - bồi hoàn</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách vận chuyển</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách khách sỉ</a>
                                </li>
                                <li>
                                    <a href="#">Phương thức thanh toán và xuất HĐ</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('fcol')}>
                        <div className={cx('footer-static-title')}>
                            <h3>TÀI KHOẢN CỦA TÔI</h3>
                        </div>
                        <div className={cx('footer-static-content')}>
                            <ul>
                                <li>
                                    <a href="#">Đăng nhập/Tạo mới tài khoản</a>
                                </li>
                                <li>
                                    <a href="#">Thay đổi địa chỉ khách hàng</a>
                                </li>
                                <li>
                                    <a href="#">Chi tiết tài khoản</a>
                                </li>
                                <li>
                                    <a href="#">Lịch sử mua hàng</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
