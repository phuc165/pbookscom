import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProductCell.module.css';

const cx = classNames.bind(styles);
function ProductCell({ title, img, newPrice, oldPrice }) {
    return (
        <div className={cx('productContainer')}>
            <a className={cx('imgHolder')} href="">
                <img src={img} alt="" />
            </a>
            <div className={cx('productBottom')}>
                <div className={cx('title')}>
                    <a href="#"></a>
                    {title}
                </div>
                <div className={cx('price')}>
                    <p className={cx('newPrice')}>{newPrice} VND</p>
                    <p className={cx('oldPrice')}>{oldPrice} VND</p>
                </div>
                <div className={cx('buy')}>
                    <button className={cx('addCart')}>Add to Cart</button>
                    <button className={cx('buyNow')}>Buy</button>
                </div>
            </div>
        </div>
    );
}
export default ProductCell;
