import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProductCell.module.css';

const cx = classNames.bind(styles);
function ProductCell() {
    return (
        <div className={cx('productContainer')}>
            <a href="">
                <img src="images/product/test2" />
            </a>
            <div className={cx('productBottom')}>
                <div className={cx('title')}>
                    <a href=""></a>
                    title
                </div>
                <div className={cx('price')}>
                    <p className={cx('newPrice')}>100000 d</p>
                    <p className={cx('oldPrice')}>200000 d</p>
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
