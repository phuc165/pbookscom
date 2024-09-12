import classNames from 'classnames/bind';
import styles from './Product.module.css';
import Slideshow from '~/Layout/components/Slideshow/Slideshow';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where, setDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const cx = classNames.bind(styles);

async function addToCart(uid, product, qty) {
    if (!uid) {
        console.error('User is not logged in. Cannot add product to cart.');
        return;
    }

    console.log('Product to add:', product); // Debugging line

    if (!product.id || !product.newPrice) {
        console.error('Product ID or price is not defined. Cannot add product to cart.');
        return;
    }

    try {
        const db = getFirestore();
        const cartCollectionName = `Cart_${uid}`;
        const cartRef = collection(db, cartCollectionName);

        // Create a query for the product document
        const productQuery = query(cartRef, where('id', '==', product.id));
        const productDocSnapshot = await getDocs(productQuery);

        if (productDocSnapshot.empty) {
            // Product doesn't exist in the cart, add it
            await setDoc(doc(cartRef, product.id), {
                ...product,
                qty: qty,
                totalProductPrice: qty * product.newPrice,
                img: product.img1,
            });
        } else {
            // Product already exists in the cart, update its quantity
            const productDoc = productDocSnapshot.docs[0];
            const productData = productDoc.data(); // Access data from the first document
            await updateDoc(productDoc.ref, {
                qty: productData.qty + qty,
                totalProductPrice: (productData.qty + qty) * product.newPrice,
            });
        }

        console.log('Product added to cart successfully');
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
}

function Product() {
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const db = getFirestore();
            const productsCollection = collection(db, 'product'); // Reference to the collection
            const querySnapshot = await getDocs(productsCollection); // Get all documents

            querySnapshot.forEach((doc) => {
                if (doc.id === productID) {
                    // Check for matching product ID
                    const productData = doc.data();
                    console.log('Fetched product data:', productData); // Debugging line
                    setProduct({ id: doc.id, ...productData });
                    return; // Exit loop after finding the product
                }
            });

            if (!product) {
                console.error('Product not found:', productID);
            }
        };

        fetchProduct();
    }, [productID]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleIncrement = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const handleDecrement = () => {
        if (qty > 1) {
            setQty((prevQty) => prevQty - 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(uid, product, qty);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={cx('productContainer')}>
                <div className={cx('productImage')}>
                    <Slideshow images={[product.img1, product.img2, product.img3, product.img4]} />
                </div>
                <div className={cx('productInfo')}>
                    <div className={cx('title')}>{product.title}</div>
                    <div className={cx('publicDetail')}>
                        <div className={cx('publisher')}>Nhà xuất bản: {product.nxb}</div>
                        <div className={cx('author')}>Tác giả: {product.author}</div>
                    </div>
                    <div className={cx('price')}>
                        <div className={cx('newPrice')}>{product.newPrice} VND</div>
                        <div className={cx('oldPrice')}>{product.oldPrice} VND</div>
                    </div>
                    <p className={cx('label')}>Số lượng: </p>
                    <div className={cx('qtyController')}>
                        <button onClick={handleDecrement}>-</button>
                        <div id="qty" className={cx('qty')}>
                            {qty}
                        </div>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <div className={cx('buy')}>
                        <button className={cx('addCart')} onClick={handleAddToCart}>
                            Thêm vào giỏ
                        </button>
                        <button className={cx('buyNow')}>Mua ngay</button>
                    </div>
                </div>
            </div>
            <div className={cx('description')}>
                <p className={cx('label')}>Mô Tả Sản Phẩm </p>
                <p className={cx('label')}>{product.description} </p>
            </div>
        </>
    );
}

export default Product;
