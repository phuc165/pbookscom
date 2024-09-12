import { TrashIcon } from '~/component/Icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import getCartItems from './getCartItems';
import styles from './Cart.module.css';

import { getAuth } from 'firebase/auth';
import { getFirestore, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

async function updateCartItemQuantity(uid, itemId, newQty, price) {
    const db = getFirestore();
    const cartCollectionName = `Cart_${uid}`;
    const itemRef = doc(db, cartCollectionName, itemId);

    await updateDoc(itemRef, {
        qty: newQty,
        totalProductPrice: newQty * price,
    });
}

async function deleteCartItem(uid, itemId) {
    const db = getFirestore();
    const cartCollectionName = `Cart_${uid}`;
    const itemRef = doc(db, cartCollectionName, itemId);

    await deleteDoc(itemRef);
}

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [uid, setUid] = useState(null);

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

    useEffect(() => {
        if (uid) {
            async function fetchCartItems() {
                const items = await getCartItems(uid);
                setCartItems(items);
            }

            fetchCartItems();
        }
    }, [uid]);

    const handleIncrement = async (item) => {
        const newQty = item.qty + 1;
        await updateCartItemQuantity(uid, item.id, newQty, item.newPrice);
        setCartItems((prevItems) =>
            prevItems.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, qty: newQty, totalProductPrice: newQty * item.newPrice }
                    : cartItem,
            ),
        );
    };

    const handleDecrement = async (item) => {
        if (item.qty > 1) {
            const newQty = item.qty - 1;
            await updateCartItemQuantity(uid, item.id, newQty, item.newPrice);
            setCartItems((prevItems) =>
                prevItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, qty: newQty, totalProductPrice: newQty * item.newPrice }
                        : cartItem,
                ),
            );
        }
    };

    const handleDelete = async (item) => {
        await deleteCartItem(uid, item.id);
        setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== item.id));
    };

    if (!uid) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 style={{ marginLeft: '30px' }}>Giỏ hàng</h1>
            <div className={cx('cartContainer')}>
                <div className={cx('colMain')}>
                    <div className={cx('rowFirst')}>
                        <div className={cx('col1')}>Giỏ hàng chứa {cartItems.length} sản phẩm</div>
                        <div className={cx('col2')}>Số lượng</div>
                        <div className={cx('col3')}>Đơn giá</div>
                    </div>
                    <div className={cx('order')}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={cx('rowProduct')}>
                                <div className={cx('col1')}>
                                    <button onClick={() => handleDelete(item)}>
                                        <TrashIcon />
                                    </button>
                                    <div className={cx('imageHolder')}>
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                    <div className={cx('title')}>{item.title}</div>
                                </div>
                                <div className={cx('col2')}>
                                    <button onClick={() => handleDecrement(item)}>-</button>
                                    <div id="qty" className={cx('qty')}>
                                        {item.qty}
                                    </div>
                                    <button onClick={() => handleIncrement(item)}>+</button>
                                </div>
                                <div className={cx('col3')}>
                                    <div className={cx('newPrice')}>{item.totalProductPrice} VND</div>
                                    <div className={cx('oldPrice')}>{item.oldPrice} VND</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('colSub')}>
                    <div className={cx('total')}>
                        Thành Tiền: {cartItems.reduce((total, item) => total + item.totalProductPrice, 0)} VND
                    </div>
                    <Link to={'/payment'} className={cx('pay')}>
                        Thanh toán
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Cart;
