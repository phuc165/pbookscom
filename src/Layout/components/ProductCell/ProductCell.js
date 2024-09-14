import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductCell.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import BuyNow from '~/component/BuyNow/BuyNow';
import { getAuth } from 'firebase/auth';

const cx = classNames.bind(styles);

function ProductCell({ addToCart, ...product }) {
    const auth = getAuth();
    const user = auth.currentUser;

    const handleAddToCart = () => {
        addToCart(product);
    };
    return (
        <div className={cx('productContainer')}>
            <Link className={cx('imgHolder')} to={`/product/${product.id}`}>
                <img src={product.img} alt="" />
            </Link>
            <div className={cx('productBottom')}>
                <div className={cx('title')}>
                    <Link to={`/product/${product.id}`}></Link>
                    {product.title}
                </div>
                <div className={cx('price')}>
                    <p className={cx('newPrice')}>{product.newPrice} VND</p>
                    <p className={cx('oldPrice')}>{product.oldPrice} VND</p>
                </div>
                <div className={cx('buy')}>
                    <button className={cx('addCart')} onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    <button className={cx('buyNow')}>Buy</button>
                </div>
            </div>
        </div>
    );
}
export default ProductCell;
