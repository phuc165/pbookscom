import React from 'react';
import styles from './Modal.module.css'; // Make sure to create a CSS file for styling
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={cx('modal-overlay')}>
            <div className={cx('modal-box')}>
                <button className={cx('modal-close')} onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
