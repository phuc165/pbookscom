import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductCell.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import BuyNowWrapper from '../BuyNow/BuyNow';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

function ProductCell({ addToCart, ...product }) {
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
    async function buyNow(products) {
        if (uid === null) {
            console.error('User is not logged in. Cannot add product to cart.');
            return;
        }
        try {
            const db = getFirestore();
            const cartCollectionName = `Cart_${uid}`;
            const cartRef = collection(db, cartCollectionName);

            // Create a query for the product document
            const productQuery = query(cartRef, where('id', '==', products.id));
            const productDocSnapshot = await getDocs(productQuery);

            if (productDocSnapshot.empty) {
                // Product doesn't exist in the cart, add it
                await setDoc(doc(cartRef, products.id), {
                    ...products,
                    qty: 1,
                    totalProductPrice: products.newPrice,
                });
            } else {
                // Product already exists in the cart, update its quantity
                const productDoc = productDocSnapshot.docs[0];
                const productData = productDoc.data(); // Access data from the first document
                await updateDoc(productDoc.ref, {
                    qty: productData.qty + 1,
                    totalProductPrice: (productData.qty + 1) * products.newPrice,
                });
            }

            console.log('Product added to cart successfully');

            // Navigate to the cart page
            navigate('/cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            // Handle errors (e.g., display an error message to the user)
        }
    }

    const handleAddToCart = () => {
        addToCart(product);
    };
    return (
        <div className={cx('productContainer')}>
            <Link className={cx('imgHolder')} to={`/product/${product.id}`}>
                <img src={product.img1} alt="" />
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
                        Thêm vào giỏ
                    </button>
                    <BuyNowWrapper product={product} uid={uid} styles={styles} />
                </div>
            </div>
        </div>
    );
}
export default ProductCell;
